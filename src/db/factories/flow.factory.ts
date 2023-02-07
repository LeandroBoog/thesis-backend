import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { FlowModel } from '../models/flow.model';

export const FlowFactory = setSeederFactory(FlowModel, (faker: Faker) => {
  const entry = new FlowModel();
  entry.operation = faker.datatype.string(10);
  entry.builtin = faker.datatype.boolean();
  entry.source = faker.datatype.boolean();
  entry.function = faker.datatype.string(10);
  entry.filename = faker.datatype.string(10);
  entry.scriptLine = faker.datatype.number(1);
  entry.scriptHash = faker.datatype.string(10);
  return entry;
});
