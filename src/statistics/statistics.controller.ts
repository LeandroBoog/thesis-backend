import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('')
  findAll(@Query('types', ParseArrayPipe) types: string[]) {
    return this.statisticsService.gatherStatistics(types);
  }

  @Get('test')
  find() {
    return this.statisticsService.mostUsedSinks();
  }
}
