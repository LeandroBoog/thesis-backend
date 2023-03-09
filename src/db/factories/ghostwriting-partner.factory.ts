import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { GhostwritingPartnerModel } from '../models/ghostwriting-partner.model';

export const GhostwritingPartnerFactory = setSeederFactory(
  GhostwritingPartnerModel,
  (faker: Faker) => {
    const entry = new GhostwritingPartnerModel();
    entry.origin = faker.internet.url();
    return entry;
  },
);
