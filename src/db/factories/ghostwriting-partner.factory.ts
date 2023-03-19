import { setSeederFactory } from 'typeorm-extension';
import { GhostwritingPartnerModel } from '../models/ghostwriting-partner.model';

export const GhostwritingPartnerFactory = setSeederFactory(
  GhostwritingPartnerModel,
  () => {
    return new GhostwritingPartnerModel();
  },
);
