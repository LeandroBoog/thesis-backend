import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrawlerService } from './crawler.service';
import { CreateWebsiteDto } from './dto/validation/create-website.dto';
import { CreateCrawlSessionDto } from './dto/validation/create-crawl-session.dto';
import { NotFoundInterceptor } from '../common/interceptors/not-found.interceptor';

@Controller('crawler')
@ApiTags('Crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('session')
  findOrCreateSession(@Body() createCrawlSessionDto: CreateCrawlSessionDto) {
    return this.crawlerService.findOrCreateSession(createCrawlSessionDto);
  }

  @Post('report')
  @UseInterceptors(NotFoundInterceptor)
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.crawlerService.createWebsiteEntry(createWebsiteDto);
  }

  @Delete('session/:id')
  resetSession(@Param() params) {
    return this.crawlerService.resetSession(params.id);
  }
}
