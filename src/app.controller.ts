import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const urls = Array(10)
      .fill('')
      .map((_) => faker.datatype.string(10));
    return urls;
  }
}
