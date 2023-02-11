import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { FlowModel } from '../models/flow.model';

export const FlowFactory = setSeederFactory(FlowModel, (faker: Faker) => {
  const entry = new FlowModel();
  entry.operation = faker.helpers.arrayElement([
    'document.cookie',
    'D&W4TO5!;z',
    'A}HK>uiX|4',
    'xSb07BQn)`',
    'iu/K&%VSkd5',
    "oD+5SE9jgq'",
    'TRT4xI"s_a',
    'aDiZEgM@P2',
    '}hnTvgye]e',
    'Plgx85poyyj',
  ]);
  entry.builtin = faker.datatype.boolean();
  entry.source =
    entry.operation === 'document.cookie' ? true : faker.datatype.boolean();
  entry.function = faker.datatype.string(10);
  entry.filename = faker.datatype.string(10);
  entry.scriptLine = faker.datatype.number(1);
  entry.scriptHash = faker.datatype.string(10);
  return entry;
});
