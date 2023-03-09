import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TaintReportModel } from './taint-report.model';
import { GhostwritingPartnerModel } from './ghostwriting-partner.model';

@Entity()
export class GhostwrittenCookieModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(
    () => GhostwritingPartnerModel,
    (ghostwritingPartner) => ghostwritingPartner.ghostwrittenCookies,
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
