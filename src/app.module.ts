import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from 'src/common/configs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerModule } from './crawler/crawler.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AppController } from './app.controller';
import { JwtAuthMiddleware } from './common/middleware/jwt-auth.middleware';
import { CrawlerController } from './crawler/crawler.controller';

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
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes(CrawlerController);
  }
}
