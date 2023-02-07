import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaintReportModel } from '../db/models/taint-report.model';
import { Repository } from 'typeorm';
import { WebsiteModel } from '../db/models/website.model';
import { CookieModel } from '../db/models/cookie.model';
import { MostUsedSinksEntity } from './entities/most-used-sinks.entity';
import { MostCommonScriptOriginsEntity } from './entities/most-common-script-origins.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TaintReportModel)
    private taintReportRepository: Repository<TaintReportModel>,
    @InjectRepository(WebsiteModel)
    private websiteRepository: Repository<WebsiteModel>,
    @InjectRepository(CookieModel)
    private cookieRepository: Repository<CookieModel>,
  ) {}

  async gatherStatistics(requestedStatistics) {
    const availableStatistics = [
      'mostUsedSinks',
      'mostCommonScriptOrigins',
      'totalGhostwriting',
    ];

    const statisticsToGather =
      requestedStatistics[0] === 'all'
        ? availableStatistics
        : availableStatistics.filter((stat) =>
            requestedStatistics.includes(stat),
          );

    return await Promise.all(statisticsToGather.map((type) => this[type]()));
  }

  // sinks listed from most used to least
  async mostUsedSinks() {
    const query = await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.sink) AS total, report.sink AS sink')
      .groupBy('report.sink')
      .orderBy('total', 'DESC')
      .getRawMany();
    return {
      type: 'mostUsedSinks',
      data: query.map((entry) => new MostUsedSinksEntity(entry)),
    };
  }

  // most common ghostwriting origins
  async mostCommonScriptOrigins() {
    const query = await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.script) AS total, report.script AS script')
      .groupBy('report.script')
      .orderBy('total', 'DESC')
      .getRawMany();
    return {
      type: 'mostCommonScriptOrigins',
      data: query.map((entry) => new MostCommonScriptOriginsEntity(entry)),
    };
  }

  async totalGhostwriting() {
    // count amount of taintreports
    // https://stackoverflow.com/questions/66307587/typeorm-how-to-add-count-field-when-using-getmany
    const a = await this.websiteRepository
      .createQueryBuilder('website')
      .loadRelationCountAndMap('website.reportCount', 'website.taintReports')
      .getMany();
    return {
      type: 'totalGhostwriting',
      data: a,
    };
  }
}

/*

sinks listed from most used to least

> Leandro Boog:
amount of ghostwriting in total from x sites in percent

> Leandro Boog:
how many scripts ghostwritten more than once!

> Leandro Boog:
and which were they

by how many subpages were visited
 */
