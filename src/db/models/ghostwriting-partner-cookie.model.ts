import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { GhostwritingPartnerModel } from './ghostwriting-partner.model';

@Entity()
export class GhostwritingPartnerCookieModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  origin: string;

  @Column()
  type: string;

  @Column()
  isIdentifier: boolean;

  @Column()
  hash: string;

  @ManyToOne(
    () => GhostwritingPartnerModel,
    (ghostwritingPartner) => ghostwritingPartner.cookie,
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
