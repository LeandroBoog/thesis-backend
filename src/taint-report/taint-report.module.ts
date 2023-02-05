import { Module } from '@nestjs/common';
import { TaintReportService } from './taint-report.service';
import { TaintReportController } from './taint-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowEntity } from './entities/flow.entity';
import { CookieEntity } from './entities/cookie.entity';
import { TaintEntity } from './entities/taint.entity';
import { TaintReportEntity } from './entities/taint-report.entity';
import { WebsiteEntity } from './entities/website.entity';

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
  controllers: [TaintReportController],
  providers: [TaintReportService],
})
export class TaintReportModule {}
