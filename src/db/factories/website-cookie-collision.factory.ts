import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { WebsiteCookieCollisionModel } from '../models/website-cookie-collision.model';

export const WebsiteCookieCollisionFactory = setSeederFactory(
  WebsiteCookieCollisionModel,
  (faker: Faker) => {
    const entry = new WebsiteCookieCollisionModel();
    entry.name = faker.datatype.string(10);
    return entry;
  },
);
