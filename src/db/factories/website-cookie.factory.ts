import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { WebsiteCookieModel } from '../models/website-cookie.model';

export const WebsiteCookieFactory = setSeederFactory(
  WebsiteCookieModel,
  (faker: Faker) => {
    const entry = new WebsiteCookieModel();
    entry.name = faker.datatype.string(10);
    entry.value = faker.datatype.string(10);
    entry.origin = faker.internet.url();
    entry.type = faker.datatype.string(10);
    entry.isIdentifier = faker.datatype.boolean();
    entry.hash = faker.datatype.string(10);
    return entry;
  },
);
