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
import { GhostwrittenCookieModel } from './ghostwritten-cookie.model';

@Entity()
export class GhostwritingPartnerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @OneToMany(
    () => GhostwrittenCookieModel,
    (ghostwrittenCookie) => ghostwrittenCookie.ghostwritingPartner,
    {
      cascade: true,
    },
  )
  ghostwrittenCookies: GhostwrittenCookieModel[];

  @ManyToOne(
    () => TaintReportModel,
    (taintReport) => taintReport.ghostwritingPartner,
    {
      onDelete: 'CASCADE',
    },
  )
  taintReport: TaintReportModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
