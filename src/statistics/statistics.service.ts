import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaintReportEntity } from '../taint-report/entities/taint-report.entity';
import { Repository } from 'typeorm';
import { WebsiteEntity } from '../taint-report/entities/website.entity';
import { CookieEntity } from '../taint-report/entities/cookie.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TaintReportEntity)
    private taintReportRepository: Repository<TaintReportEntity>,
    @InjectRepository(WebsiteEntity)
    private websiteRepository: Repository<WebsiteEntity>,
    @InjectRepository(CookieEntity)
    private cookieRepository: Repository<CookieEntity>,
  ) {}

  async gatherStatistics(requestedStatistics) {
    const availableStatistics = [
      'mostUsedSinks',
      'mostCommonScriptOrigins',
      'totalGhostwriting',
    ];

    const statisticsToGather =
      requestedStatistics.length === 0
        ? availableStatistics
        : availableStatistics.filter((stat) =>
            requestedStatistics.includes(stat),
          );

    return await Promise.all(
      statisticsToGather.map((type) => ({ type, data: this[type]() })),
    );
  }

  // sinks listed from most used to least
  async mostUsedSinks() {
    const [count, sinks] = await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.sink) AS sink_total, report.sink')
      .groupBy('report.sink')
      .orderBy('sink_total', 'DESC')
      .getRawMany();
    return [count, sinks];
  }

  // most common ghostwriting origins
  async mostCommonScriptOrigins() {
    const [count, scripts] = await this.taintReportRepository
      .createQueryBuilder('report')
      .addSelect('COUNT(report.script) AS script_total, report.script')
      .groupBy('report.script')
      .orderBy('script_total', 'DESC')
      .getRawMany();
    return [count, scripts];
  }

  async totalGhostwriting() {
    // count amount of taintreports
    // https://stackoverflow.com/questions/66307587/typeorm-how-to-add-count-field-when-using-getmany
    return await this.websiteRepository
      .createQueryBuilder('website')
      .loadRelationCountAndMap('website.reportCount', 'website.taintReports')
      .getMany();
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
