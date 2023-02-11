import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('Statistics')
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
