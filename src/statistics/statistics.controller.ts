import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // statistics?types=
  @Get()
  findAll(@Query('types') types: string[]) {
    return this.statisticsService.gatherStatistics(types);
  }
}
