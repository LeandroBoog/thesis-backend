import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { GhostwritingPartnerModel } from './ghostwriting-partner.model';

@Entity()
export class GhostwritingPartnerUrlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(
    () => GhostwritingPartnerModel,
    (ghostwritingPartner) => ghostwritingPartner.partners,
    {
      onDelete: 'CASCADE',
    },
  )
  ghostwritingPartner: GhostwritingPartnerModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
