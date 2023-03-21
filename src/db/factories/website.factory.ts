import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { WebsiteModel } from '../models/website.model';

export const WebsiteFactory = setSeederFactory(WebsiteModel, (faker: Faker) => {
  const entry = new WebsiteModel();
  entry.url = faker.helpers.arrayElement([
    'https://charming-pheasant.net',
    'https://babyish-chicken.net',
    'http://thoughtful-worry.biz',
    'https://rash-marmalade.com',
  ]);
  return entry;
});
