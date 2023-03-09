import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { GhostwrittenCookieModel } from '../models/ghostwritten-cookie.model';

export const GhostwrittenCookieFactory = setSeederFactory(
  GhostwrittenCookieModel,
  (faker: Faker) => {
    const entry = new GhostwrittenCookieModel();
    entry.name = faker.datatype.string(5);
    entry.value = faker.datatype.string(10);
    return entry;
  },
);
