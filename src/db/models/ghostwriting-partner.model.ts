import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TaintReportModel } from './taint-report.model';
import { GhostwritingPartnerCookieModel } from './ghostwriting-partner-cookie.model';
import { GhostwritingPartnerUrlModel } from './ghostwriting-partner-url.model';

@Entity()
export class GhostwritingPartnerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => GhostwritingPartnerCookieModel,
    (ghostwrittenCookie) => ghostwrittenCookie.ghostwritingPartner,
    {
      cascade: true,
    },
  )
  cookie: GhostwritingPartnerCookieModel[];

  @OneToMany(
    () => GhostwritingPartnerUrlModel,
    (ghostwritingPartnerUrl) => ghostwritingPartnerUrl.ghostwritingPartner,
    {
      cascade: true,
    },
  )
  partners: GhostwritingPartnerUrlModel[];

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
