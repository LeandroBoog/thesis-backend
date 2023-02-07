import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { TaintModel } from '../models/taint.model';

export const TaintFactory = setSeederFactory(TaintModel, (faker: Faker) => {
  const entry = new TaintModel();
  entry.begin = faker.datatype.number(100);
  entry.end = faker.datatype.number(100);
  return entry;
});
