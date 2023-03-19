import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { FlowArgumentModel } from '../models/flow-argument.model';

export const FlowArgumentFactory = setSeederFactory(
  FlowArgumentModel,
  (faker: Faker) => {
    const entry = new FlowArgumentModel();
    entry.value = faker.datatype.string(10);
    return entry;
  },
);
