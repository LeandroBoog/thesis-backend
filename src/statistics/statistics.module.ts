import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieEntity } from '../taint-report/entities/cookie.entity';
import { FlowEntity } from '../taint-report/entities/flow.entity';
import { TaintEntity } from '../taint-report/entities/taint.entity';
import { TaintReportEntity } from '../taint-report/entities/taint-report.entity';
import { WebsiteEntity } from '../taint-report/entities/website.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CookieEntity,
      FlowEntity,
      TaintEntity,
      TaintReportEntity,
      WebsiteEntity,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
