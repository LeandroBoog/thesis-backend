import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaintReportService } from './taint-report.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { CreateCrawlSessionDto } from './dto/create-crawl-session.dto';

@Controller('taint-report')
export class TaintReportController {
  constructor(private readonly taintReportService: TaintReportService) {}

  @Get('session/latest')
  findOne() {
    return this.taintReportService.getLatestCrawlSession();
  }

  @Post('session')
  createSession(@Body() createCrawlSessionDto: CreateCrawlSessionDto) {
    return this.taintReportService.createCrawlSession(createCrawlSessionDto);
  }

  @Post('website')
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.taintReportService.createWebsiteEntry(createWebsiteDto);
  }
}
