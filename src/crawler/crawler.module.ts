import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

import { CrawlerController } from './crawler.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowModel } from '../db/models/flow.model';
import { WebsiteCookieModel } from '../db/models/website-cookie.model';
import { TaintModel } from '../db/models/taint.model';
import { TaintReportModel } from '../db/models/taint-report.model';
import { WebsiteModel } from '../db/models/website.model';
import { CrawlSessionModel } from '../db/models/crawl-session.model';
import { FlowArgumentModel } from '../db/models/flow-argument.model';
import { WebsiteCookieCollisionModel } from '../db/models/website-cookie-collision.model';
import { GhostwritingPartnerModel } from '../db/models/ghostwriting-partner.model';
import { GhostwritingPartnerCookieModel } from '../db/models/ghostwriting-partner-cookie.model';
import { GhostwritingPartnerUrlModel } from '../db/models/ghostwriting-partner-url.model';
import { WebsiteCookieCollisionUrlModel } from '../db/models/website-cookie-collision-url.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CrawlSessionModel,
      FlowModel,
      FlowArgumentModel,
      GhostwritingPartnerModel,
      GhostwritingPartnerCookieModel,
      GhostwritingPartnerUrlModel,
      TaintModel,
      TaintReportModel,
      WebsiteModel,
      WebsiteCookieModel,
      WebsiteCookieCollisionModel,
      WebsiteCookieCollisionUrlModel,
    ]),
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
