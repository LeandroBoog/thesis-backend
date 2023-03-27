import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { TaintReportModel } from '../models/taint-report.model';

export const TaintReportFactory = setSeederFactory(
  TaintReportModel,
  (faker: Faker) => {
    const entry = new TaintReportModel();
    entry.domain = faker.internet.url();
    entry.script = faker.helpers.arrayElement([
      'http://squeaky-chess.biz',
      'http://brisk-army.info',
      'https://agonizing-flint.biz',
      'https://phony-percent.net',
      'http://disguised-folder.info',
      'https://loud-inverse.info',
    ]);
    entry.scriptDomain = faker.internet.url();
    entry.taintedString = faker.datatype.string(10);
    entry.sink = faker.helpers.arrayElement([
      'document.cookie',
      'document.write',
      'localStorage.getItem',
      'localStorage.setItem(key)',
      'sessionStorage.getItem',
      'sessionStorage.setItem(key)',
      'setInterval',
      'setTimeout',
    ]);
    entry.numberOfTaints = faker.datatype.number(2);
    return entry;
  },
);
