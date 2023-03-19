import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { GhostwritingPartnerUrlModel } from '../models/ghostwriting-partner-url.model';

export const GhostwritingPartnerUrlFactory = setSeederFactory(
  GhostwritingPartnerUrlModel,
  (faker: Faker) => {
    const entry = new GhostwritingPartnerUrlModel();
    entry.value = faker.datatype.string(10);
    return entry;
  },
);
