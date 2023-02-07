import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { TaintReportModel } from '../models/taint-report.model';

export const TaintReportFactory = setSeederFactory(
  TaintReportModel,
  (faker: Faker) => {
    const entry = new TaintReportModel();
    entry.script = faker.datatype.string(10);
    entry.taintedString = faker.datatype.string(10);
    entry.sink = faker.datatype.string(10);
    return entry;
  },
);
