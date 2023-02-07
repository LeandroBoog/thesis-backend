import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieModel } from '../db/models/cookie.model';
import { FlowModel } from '../db/models/flow.model';
import { TaintModel } from '../db/models/taint.model';
import { TaintReportModel } from '../db/models/taint-report.model';
import { WebsiteModel } from '../db/models/website.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CookieModel,
      FlowModel,
      TaintModel,
      TaintReportModel,
      WebsiteModel,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
