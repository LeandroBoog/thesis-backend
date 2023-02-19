import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from 'src/common/configs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerModule } from './crawler/crawler.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database/database.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    CrawlerModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
