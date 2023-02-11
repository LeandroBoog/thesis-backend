import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
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
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
