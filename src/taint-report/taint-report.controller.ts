import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { TaintReportService } from './taint-report.service';
import { CreateWebsiteDto } from './dto/validation/create-website.dto';
import { CreateCrawlSessionDto } from './dto/validation/create-crawl-session.dto';
import { NotFoundInterceptor } from '../interceptor/not-found.interceptor';

@Controller('taint-report')
export class TaintReportController {
  constructor(private readonly taintReportService: TaintReportService) {}

  @Get('session/latest')
  @UseInterceptors(NotFoundInterceptor)
  findOne() {
    return this.taintReportService.getLatestCrawlSession();
  }

  @Post('session')
  createSession(@Body() createCrawlSessionDto: CreateCrawlSessionDto) {
    return this.taintReportService.createCrawlSession(createCrawlSessionDto);
  }

  @Post('website')
  @UseInterceptors(NotFoundInterceptor)
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.taintReportService.createWebsiteEntry(createWebsiteDto);
  }
}
