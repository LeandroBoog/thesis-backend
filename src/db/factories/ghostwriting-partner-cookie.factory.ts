import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { GhostwritingPartnerCookieModel } from '../models/ghostwriting-partner-cookie.model';

export const GhostwritingPartnerCookieFactory = setSeederFactory(
  GhostwritingPartnerCookieModel,
  (faker: Faker) => {
    const entry = new GhostwritingPartnerCookieModel();
    entry.name = faker.datatype.string(5);
    entry.value = faker.datatype.string(10);
    entry.origin = faker.datatype.string(5);
    entry.type = faker.datatype.string(10);
    entry.isIdentifier = faker.datatype.boolean();
    entry.hash = faker.datatype.string(5);
    return entry;
  },
);
