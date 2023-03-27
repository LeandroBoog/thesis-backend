import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrawlSessionModel } from '../db/models/crawl-session.model';
import { QueryDataTransformer } from '../common/helpers/QueryDataTransformer';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(CrawlSessionModel)
    private crawlSessionRepository: Repository<CrawlSessionModel>,
  ) {}

  async getCrawlingStatusInformation() {
    const newestInsert = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('websites.createdAt AS timestamp')
      .innerJoin('crawl.websites', 'websites')
      .orderBy('websites.createdAt', 'ASC')
      .getRawOne();

    const latestInsert = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('websites.updatedAt AS timestamp')
      .innerJoin('crawl.websites', 'websites')
      .orderBy('websites.updatedAt', 'DESC')
      .getRawOne();

    if (!newestInsert || !latestInsert)
      return {
        message: 'No insertions found!',
      };

    const latest = latestInsert.timestamp;
    const newest = newestInsert.timestamp;

    const crawlDurationInMilliSec =
      Number(new Date(latest)) - Number(new Date(newest));
    const crawlDuration =
      Math.round(crawlDurationInMilliSec / 1000 / 60 / 60) + 'h';

    const difference = Number(new Date()) - Number(new Date(latest));
    const lastInsert = Math.round(difference / 1000 / 60) + 'm ago';

    return {
      newest,
      latest,
      crawlDuration,
      lastInsert,
    };
  }

  async gatherStatistics(requestedStatistics) {
    const availableStatistics = [
      'mostUsedSinks',
      'mostCommonScriptOrigins',
      'websiteWithMostGhostwriting',
      'totalGhostwritingReports',
      'totalFlowsWithRelevantSource',
      'mostUsedOperations',
      'amountOfCookiesSet',
      'amountOfIdentifierCookies',
      'amountOfCookieCollisions',
      'websiteWithMostCollisions',
      'amountOfWebsitesWithGhostwriting',
      'amountOfWebsitesWithCollisions',
      'amountOfSelfGhostwriting',
      'amountOfOtherGhostwriting',
    ];

    const statisticsToGather =
      requestedStatistics[0] === 'all'
        ? availableStatistics
        : availableStatistics.filter((stat) =>
            requestedStatistics.includes(stat),
          );
    return {
      sessions: await this.findAllSessions(),
      data: await Promise.all(
        statisticsToGather.map(async (type) => ({
          type,
          data: await this[type](),
        })),
      ),
    };
  }

  async findAllSessions() {
    const query = await this.crawlSessionRepository.find({});
    return query.map((session) => new SessionEntity(session));
  }

  baseQueryBuilder() {
    return this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .innerJoin('crawl.websites', 'websites')
      .groupBy('crawl.id')
      .orderBy('crawl.id');
  }

  async mostUsedSinks() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(taintReports.sink) AS total, taintReports.sink AS sink')
      .innerJoin('websites.taintReports', 'taintReports')
      .addGroupBy('sink')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
      ['sink', 'total'],
      query,
    );
  }

  async mostCommonScriptOrigins() {
    const query = await this.baseQueryBuilder()
      .addSelect(
        'COUNT(taintReports.script) AS total, taintReports.script AS script',
      )
      .innerJoin('websites.taintReports', 'taintReports')
      .addGroupBy('script')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
      ['script', 'total'],
      query,
    );
  }

  async websiteWithMostGhostwriting() {
    // https://github.com/typeorm/typeorm/issues/6561
    const query = await this.baseQueryBuilder()
      .addSelect('websites.url AS url')
      .addSelect('COUNT(taintReports.id) AS total')
      .innerJoin('websites.taintReports', 'taintReports')
      .addGroupBy('url')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
      ['url', 'total'],
      query,
    );
  }

  async totalGhostwritingReports() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(taintReports.id) AS total')
      .innerJoin('websites.taintReports', 'taintReports')
      .orderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async totalFlowsWithRelevantSource() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(flows.id) AS total')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .innerJoin('taints.flows', 'flows')
      .where('flows.source = :source AND flows.operation = :operation', {
        source: true,
        operation: 'document.cookie',
      })
      .orderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async mostUsedOperations() {
    const query = await this.baseQueryBuilder()
      .addSelect('flows.operation AS operation')
      .addSelect('COUNT(flows.id) AS total')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .innerJoin('taints.flows', 'flows')
      .where('operation != :operation', {
        operation: 'function',
      })
      .addGroupBy('operation')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
      ['operation', 'total'],
      query,
    );
  }

  async amountOfCookiesSet() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(cookies.id) AS total')
      .innerJoin('websites.cookies', 'cookies')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async amountOfIdentifierCookies() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(cookies.id) AS total')
      .innerJoin('websites.cookies', 'cookies')
      .where('cookies.isIdentifier = :isIdentifier', {
        isIdentifier: true,
      })
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async amountOfCookieCollisions() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(collisions.id) AS total')
      .innerJoin('websites.cookieCollisions', 'collisions')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async websiteWithMostCollisions() {
    const query = await this.baseQueryBuilder()
      .addSelect('websites.url AS url')
      .addSelect('COUNT(collisions.id) AS total')
      .innerJoin('websites.cookieCollisions', 'collisions')
      .addGroupBy('url')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
      ['url', 'total'],
      query,
    );
  }

  async amountOfWebsitesWithGhostwriting() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(websites.id) AS total')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async amountOfWebsitesWithCollisions() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(collisions.id) AS total')
      .innerJoin('websites.cookieCollisions', 'collisions')
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async amountOfGhostwritingType(type) {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(taintReports.id) AS total')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .where('taints.type = :type', {
        type,
      })
      .getRawMany();

    return QueryDataTransformer.transformSingleCountData(query);
  }

  async amountOfSelfGhostwriting() {
    return await this.amountOfGhostwritingType('self');
  }

  async amountOfOtherGhostwriting() {
    return await this.amountOfGhostwritingType('other');
  }
}

/*

  async bySession() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl.id AS session')
      .addSelect('COUNT(taints.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .groupBy('session')
      .orderBy('total', 'DESC')
      .getRawMany();

    //const _ = await this.taintReportRepository.count({});
    return {
      type: 'bySession',
      size: query.length,
      data: query,
    };
  }

sinks listed from most used to least ✔️

> Leandro Boog:
amount of ghostwriting in total from x sites in percent ✔️

> Leandro Boog:
how many scripts ghostwritten more than once!

> Leandro Boog:
and which were they

by how many subpages were visited

// https://stackoverflow.com/questions/66307587/typeorm-how-to-add-count-field-when-using-getmany
 */
