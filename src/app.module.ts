import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import config from 'src/common/configs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TaintReportModule } from './taint-report/taint-report.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'src/db/database',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaintReportModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// entities: [__dirname + '/**/*.entity{.ts,.js}'],
