import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { CrawlSessionModel } from '../models/crawl-session.model';

export const CrawlSessionFactory = setSeederFactory(
  CrawlSessionModel,
  (faker: Faker) => {
    const entry = new CrawlSessionModel();
    entry.maxDepth = faker.datatype.number(10);
    entry.maxLinks = faker.datatype.number(10);
    entry.maxRetries = faker.datatype.number(10);
    entry.sameSite = faker.datatype.boolean();
    entry.depthFirst = faker.datatype.boolean();
    entry.manualQueue = faker.datatype.boolean();
    entry.randomizeLinks = faker.datatype.boolean();
    entry.trackingProtection = faker.datatype.boolean();
    entry.networkCookieBehaviour = faker.datatype.number();
    entry.cookieBlocker = faker.datatype.boolean();
    return entry;
  },
);
