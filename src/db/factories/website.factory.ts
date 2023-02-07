import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { WebsiteModel } from '../models/website.model';

export const WebsiteFactory = setSeederFactory(WebsiteModel, (faker: Faker) => {
  const entry = new WebsiteModel();
  entry.url = faker.datatype.string(10);
  return entry;
});
