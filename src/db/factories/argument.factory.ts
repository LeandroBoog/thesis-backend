import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { ArgumentModel } from '../models/argument.model';

export const ArgumentFactory = setSeederFactory(
  ArgumentModel,
  (faker: Faker) => {
    const entry = new ArgumentModel();
    entry.value = faker.datatype.string(10);
    return entry;
  },
);
