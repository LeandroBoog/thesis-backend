import { Module } from '@nestjs/common';
import { TaintReportService } from './taint-report.service';
import { TaintReportController } from './taint-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowModel } from '../db/models/flow.model';
import { CookieModel } from '../db/models/cookie.model';
import { TaintModel } from '../db/models/taint.model';
import { TaintReportModel } from '../db/models/taint-report.model';
import { WebsiteModel } from '../db/models/website.model';
import { CrawlSessionModel } from '../db/models/crawl-session.model';
import { ArgumentModel } from '../db/models/argument.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CookieModel,
      ArgumentModel,
      FlowModel,
      TaintModel,
      TaintReportModel,
      WebsiteModel,
      CrawlSessionModel,
    ]),
  ],
  controllers: [TaintReportController],
  providers: [TaintReportService],
})
export class TaintReportModule {}
