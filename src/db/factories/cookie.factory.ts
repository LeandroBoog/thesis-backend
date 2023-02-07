import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { CookieModel } from '../models/cookie.model';

export const CookieFactory = setSeederFactory(CookieModel, (faker: Faker) => {
  const entry = new CookieModel();
  entry.name = faker.datatype.string(10);
  entry.value = faker.datatype.string(10);
  entry.domain = faker.datatype.string(10);
  entry.expires = faker.datatype.number(10);
  entry.path = faker.datatype.string(10);
  entry.httpOnly = faker.datatype.boolean();
  entry.secure = faker.datatype.boolean();
  entry.sameSite = faker.datatype.string(10);
  return entry;
});
