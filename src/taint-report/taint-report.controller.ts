import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaintReportService } from './taint-report.service';
import { CreateWebsiteDto } from './dto/create-website.dto';

@Controller('taint-report')
export class TaintReportController {
  constructor(private readonly taintReportService: TaintReportService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.taintReportService.create(createWebsiteDto);
  }

  @Get()
  findAll() {
    return this.taintReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taintReportService.findOne(+id);
  }
}
