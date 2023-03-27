import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaintModel } from './taint.model';
import { WebsiteModel } from './website.model';
import { GhostwritingPartnerModel } from './ghostwriting-partner.model';

@Entity()
export class TaintReportModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column()
  script: string;

  @Column()
  scriptDomain: string;

  @Column()
  taintedString: string;

  @Column()
  sink: string;

  @Column()
  numberOfTaints: number;

  @OneToMany(() => TaintModel, (taint) => taint.taintReport, {
    cascade: true,
  })
  taints: TaintModel[];

  @OneToMany(
    () => GhostwritingPartnerModel,
    (ghostwritingPartner) => ghostwritingPartner.taintReport,
    {
      cascade: true,
    },
  )
  ghostwritingPartner: GhostwritingPartnerModel[];

  @ManyToOne(() => WebsiteModel, (website) => website.taintReports, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
