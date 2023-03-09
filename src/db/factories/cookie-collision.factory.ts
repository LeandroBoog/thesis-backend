import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { CookieCollisionModel } from '../models/cookie-collision.model';

export const CookieCollisionFactory = setSeederFactory(
  CookieCollisionModel,
  (faker: Faker) => {
    const entry = new CookieCollisionModel();
    entry.name = faker.datatype.string(10);
    entry.value = faker.datatype.string(10);
    return entry;
  },
);
