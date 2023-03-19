import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrawlSessionModel } from '../db/models/crawl-session.model';
import { WebsiteModel } from '../db/models/website.model';
import { WebsiteCookieModel } from '../db/models/website-cookie.model';
import { WebsiteCookieCollisionModel } from '../db/models/website-cookie-collision.model';
import { TaintReportModel } from '../db/models/taint-report.model';

import { CreateWebsiteDto } from './dto/validation/create-website.dto';
import { CreateCrawlSessionDto } from './dto/validation/create-crawl-session.dto';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(CrawlSessionModel)
    private crawlSessionRepository: Repository<CrawlSessionModel>,
    @InjectRepository(TaintReportModel)
    private taintReportRepository: Repository<TaintReportModel>,
    @InjectRepository(WebsiteModel)
    private websiteRepository: Repository<WebsiteModel>,
    @InjectRepository(WebsiteCookieModel)
    private cookieRepository: Repository<WebsiteCookieModel>,
    @InjectRepository(WebsiteCookieCollisionModel)
    private cookieCollisionRepository: Repository<WebsiteCookieCollisionModel>,
  ) {}

  async findOrCreateSession(createCrawlSession: CreateCrawlSessionDto) {
    const session = await this.findSessionByConfiguration(createCrawlSession);
    return session
      ? new SessionEntity(session)
      : new SessionEntity(await this.createCrawlSession(createCrawlSession));
  }

  async findSessionByConfiguration(configuration: CreateCrawlSessionDto) {
    return await this.crawlSessionRepository.findOne({
      where: configuration,
    });
  }

  async createCrawlSession(createCrawlSession: CreateCrawlSessionDto) {
    const newCrawlSession =
      this.crawlSessionRepository.create(createCrawlSession);
    newCrawlSession.websites = [];
    return await this.crawlSessionRepository.save(newCrawlSession);
  }

  async createWebsiteEntry(createWebsiteDto: CreateWebsiteDto) {
    const doesSessionExist = await this.doesSessionExist(createWebsiteDto);
    if (!doesSessionExist) return undefined;

    const doesWebsiteAlreadyExist = await this.websiteExistsInSession(
      createWebsiteDto,
    );

    if (!doesWebsiteAlreadyExist) {
      return await this.addNewWebsiteToSession(createWebsiteDto);
    } else {
      return await this.addDataToWebsiteOfSession(createWebsiteDto);
    }
  }

  async doesSessionExist({ crawlSessionId }) {
    return !!(await this.crawlSessionRepository.findOne({
      where: { id: crawlSessionId },
    }));
  }

  async websiteExistsInSession({ crawlSessionId, url }) {
    return !!(await this.websiteRepository
      .createQueryBuilder('website')
      .leftJoinAndSelect('website.crawlSession', 'crawlSession')
      .where('website.crawlSession = :crawlSessionId', {
        crawlSessionId,
      })
      .andWhere('website.url = :url', {
        url,
      })
      .getOne());
  }

  async addNewWebsiteToSession({ crawlSessionId, ...createWebsite }) {
    const newWebsite = this.websiteRepository.create(createWebsite);
    const crawlSession = await this.crawlSessionRepository.findOne({
      relations: ['websites'],
      where: { id: crawlSessionId },
    });
    crawlSession.websites.push(newWebsite);
    await this.crawlSessionRepository.save(crawlSession);

    return {
      id: newWebsite.id,
      url: createWebsite.url,
    };
  }

  async addDataToWebsiteOfSession({
    url,
    cookieCount,
    identifierCount,
    crawlSessionId,
    taintReports,
    cookies,
    cookieCollisions,
  }) {
    const website = await this.websiteRepository.findOne({
      relations: {
        crawlSession: true,
        taintReports: true,
        cookies: true,
        cookieCollisions: true,
      },
      where: {
        crawlSession: {
          id: crawlSessionId,
        },
        url,
      },
    });

    const newTaintReports = this.taintReportRepository.create(taintReports);
    website.taintReports.push(...newTaintReports);
    const newCookies = this.cookieRepository.create(cookies);
    website.cookies.push(...newCookies);
    const newCollisions =
      this.cookieCollisionRepository.create(cookieCollisions);
    website.cookieCollisions.push(...newCollisions);

    website.identifierCount += identifierCount;
    website.cookieCount += cookieCount;

    await this.websiteRepository.save(website);

    return {
      id: website.id,
      url,
    };
  }

  async resetSession(crawlSessionId) {
    const doesSessionExist = await this.doesSessionExist({ crawlSessionId });
    if (!doesSessionExist) return undefined;

    return await this.crawlSessionRepository
      .createQueryBuilder('session')
      .delete()
      .where('id = :id', { id: crawlSessionId })
      .execute();
  }
}
