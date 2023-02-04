import { Test, TestingModule } from '@nestjs/testing';
import { TaintReportService } from './taint-report.service';

describe('TaintReportService', () => {
  let service: TaintReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaintReportService],
    }).compile();

    service = module.get<TaintReportService>(TaintReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
