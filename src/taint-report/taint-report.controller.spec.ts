import { Test, TestingModule } from '@nestjs/testing';
import { TaintReportController } from './taint-report.controller';
import { TaintReportService } from './taint-report.service';

describe('TaintReportController', () => {
  let controller: TaintReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaintReportController],
      providers: [TaintReportService],
    }).compile();

    controller = module.get<TaintReportController>(TaintReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
