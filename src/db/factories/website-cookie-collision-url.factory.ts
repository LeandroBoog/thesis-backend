import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { WebsiteCookieCollisionUrlModel } from '../models/website-cookie-collision-url.model';

export const WebsiteCookieCollisionUrlFactory = setSeederFactory(
  WebsiteCookieCollisionUrlModel,
  (faker: Faker) => {
    const entry = new WebsiteCookieCollisionUrlModel();
    entry.value = faker.internet.url();
    return entry;
  },
);
