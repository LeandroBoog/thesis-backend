import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { UrlModel } from '../models/url.model';

export const UrlFactory = setSeederFactory(UrlModel, (faker: Faker) => {
  const entry = new UrlModel();
  entry.value = faker.internet.url();
  return entry;
});
