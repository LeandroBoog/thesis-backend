import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaintReportModel } from '../db/models/taint-report.model';
import { WebsiteModel } from '../db/models/website.model';
import { CookieModel } from '../db/models/cookie.model';

import { CreateWebsiteDto } from './dto/create-website.dto';
import { CreateCrawlSessionDto } from './dto/create-crawl-session.dto';
import { CrawlSessionModel } from '../db/models/crawl-session.model';

@Injectable()
export class TaintReportService {
  constructor(
    @InjectRepository(CrawlSessionModel)
    private crawlSessionRepository: Repository<CrawlSessionModel>,
    @InjectRepository(TaintReportModel)
    private taintReportRepository: Repository<TaintReportModel>,
    @InjectRepository(WebsiteModel)
    private websiteRepository: Repository<WebsiteModel>,
    @InjectRepository(CookieModel)
    private cookieRepository: Repository<CookieModel>,
  ) {}

  async getLatestCrawlSession() {
    const orderedByCreationDate = await this.crawlSessionRepository.find({
      order: { createdAt: 'desc' },
    });
    return orderedByCreationDate[0];
  }

  async createCrawlSession(createCrawlSession: CreateCrawlSessionDto) {
    const newCrawlSession =
      this.crawlSessionRepository.create(createCrawlSession);
    newCrawlSession.websites = [];
    return await this.crawlSessionRepository.save(newCrawlSession);
  }

  async createWebsiteEntry(createWebsiteDto: CreateWebsiteDto) {
    const crawlSession = await this.crawlSessionRepository.findOne({
      where: { id: createWebsiteDto.crawlSessionId },
    });

    if (!crawlSession)
      return {
        status: 400,
        error: `CrawlSession of id ${createWebsiteDto.crawlSessionId} does not exist!`,
      };

    const website = this.websiteRepository.findOne({
      relations: { crawlSession: true },
      where: {
        crawlSession: {
          id: createWebsiteDto.crawlSessionId,
        },
        url: createWebsiteDto.url,
      },
    });

    return website || 'fuck';

    /*


    try {
      const website = await this.findOneByUrl({ url: createWebsiteDto.url });
      const newTaintReports = await this.taintReportRepository.save(
        createWebsiteDto.taintReports,
      );
      website.taintReports.push(...newTaintReports);
      const newCookies = await this.cookieRepository.save(
        createWebsiteDto.cookies,
      );
      website.cookies.push(...newCookies);
      return await this.websiteRepository.save(website);
    } catch (_) {
      return await this.websiteRepository.save({
        url: createWebsiteDto.url,
        taintReports: createWebsiteDto.taintReports,
        cookies: createWebsiteDto.cookies,
      });
    }

     */
  }
}
