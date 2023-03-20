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

  async getLatestInsert() {
    const { timestamp } = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('websites.updatedAt AS timestamp')
      .innerJoin('crawl.websites', 'websites')
      .orderBy('websites.updatedAt')
      .getRawOne();

    const now = Number(new Date());
    const difference = now - Number(new Date(timestamp));
    return {
      timestamp,
      lastInsert: Math.round(difference / 1000 / 60) + 'm ago',
    };
  }

  async gatherStatistics(requestedStatistics) {
    const availableStatistics = [
      'mostUsedSinks',
      'mostCommonScriptOrigins',
      'websiteWithMostGhostwriting',
      'totalGhostwritingReports',
      'totalFlowsWithRelevantSource',
    ];

    const statisticsToGather =
      requestedStatistics[0] === 'all'
        ? availableStatistics
        : availableStatistics.filter((stat) =>
            requestedStatistics.includes(stat),
          );

    return {
      sessions: await this.findAllSessions(),
      data: await Promise.all(statisticsToGather.map((type) => this[type]())),
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
      .groupBy('crawl.id')
      .orderBy('crawl.id');
  }

  async mostUsedSinks() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('COUNT(taintReports.sink) AS total, taintReports.sink AS sink')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .groupBy('crawl.id')
      .addGroupBy('sink')
      .orderBy('crawl.id')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'mostUsedSinks',
      data: QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
        ['sink', 'total'],
        query,
      ),
    };
  }

  async mostCommonScriptOrigins() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect(
        'COUNT(taintReports.script) AS total, taintReports.script AS script',
      )
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .groupBy('crawl.id')
      .addGroupBy('script')
      .orderBy('crawl.id')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'mostCommonScriptOrigins',
      data: QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
        ['script', 'total'],
        query,
      ),
    };
  }

  async websiteWithMostGhostwriting() {
    // https://github.com/typeorm/typeorm/issues/6561
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('websites.url AS url')
      .addSelect('COUNT(taintReports.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .groupBy('crawl.id')
      .addGroupBy('url')
      .orderBy('crawl.id')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'websiteWithMostGhostwriting',
      data: QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
        ['url', 'total'],
        query,
      ),
    };
  }

  async totalGhostwritingReports() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('COUNT(taintReports.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .groupBy('crawl.id')
      .orderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'totalGhostwritingReports',
      data: QueryDataTransformer.transformSingleCountData(query),
    };
  }

  async totalFlowsWithRelevantSource() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('COUNT(flows.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .innerJoin('taints.flows', 'flows')
      .where('flows.source = :source AND flows.operation = :operation', {
        source: true,
        operation: 'document.cookie',
      })
      .groupBy('crawl.id')
      .orderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'totalFlowsWithRelevantSource',
      data: QueryDataTransformer.transformSingleCountData(query),
    };
  }

  async mostUsedOperations() {
    const query = await this.crawlSessionRepository
      .createQueryBuilder('crawl')
      .select('crawl')
      .addSelect('flows.operation AS operation')
      .addSelect('COUNT(flows.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.taintReports', 'taintReports')
      .innerJoin('taintReports.taints', 'taints')
      .innerJoin('taints.flows', 'flows')
      .groupBy('crawl.id')
      .addGroupBy('operation')
      .orderBy('crawl.id')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'mostUsedOperations',
      data: QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
        ['operation', 'total'],
        query,
      ),
    };
  }

  async amountOfCookiesSet() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(cookie.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.cookies', 'cookies')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'amountOfCookiesSet',
      data: QueryDataTransformer.transformSingleCountData(query),
    };
  }

  async amountOfIdentifierCookies() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(cookie.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.cookies', 'cookies')
      .where('cookie.isIdentifier = :isIdentifier', {
        isIdentifier: true,
      })
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'amountOfIdentifierCookies',
      data: QueryDataTransformer.transformSingleCountData(query),
    };
  }

  async amountOfCookieCollisions() {
    const query = await this.baseQueryBuilder()
      .addSelect('COUNT(collisions.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.cookieCollisions', 'collisions')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'amountOfCookieCollisions',
      data: QueryDataTransformer.transformSingleCountData(query),
    };
  }

  async websiteWithMostCollisions() {
    const query = await this.baseQueryBuilder()
      .addSelect('website.url AS url')
      .addSelect('COUNT(collisions.id) AS total')
      .innerJoin('crawl.websites', 'websites')
      .innerJoin('websites.cookieCollisions', 'collisions')
      .addGroupBy('url')
      .addOrderBy('total', 'DESC')
      .getRawMany();

    return {
      type: 'websiteWithMostCollisions',
      data: QueryDataTransformer.transformQueryWithDoubleGroupByKeys(
        ['url', 'total'],
        query,
      ),
    };
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

await this.websiteRepository
      .createQueryBuilder('website')
      .loadRelationCountAndMap('website.total', 'website.taintReports')
      .getMany();

  async totalFlowsWithRelevantSource() {
    const [, flowCount] = await this.flowRepository.findAndCountBy({
      source: true,
      operation: 'document.cookie',
    });
    return {
      type: 'totalFlowsWithRelevantSource',
      data: flowCount,
    };
  }


    const mostUsedSinks = await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.sink) AS total, report.sink AS sink')
      .groupBy('report.sink')
      .orderBy('total', 'DESC')
      .getRawMany();


          const mostCommonScripts= await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.script) AS total, report.script AS script')
      .groupBy('report.script')
      .orderBy('total', 'DESC')
      .getRawMany();

          const websitesWithMostGhostwriting = await this.websiteRepository
      .createQueryBuilder('website')
      .select('website.url AS url')
      .addSelect('COUNT(taintReports.id) AS total')
      .leftJoin('website.taintReports', 'taintReports')
      .groupBy('website.url')
      .orderBy('total', 'DESC')
      .execute();
 */
