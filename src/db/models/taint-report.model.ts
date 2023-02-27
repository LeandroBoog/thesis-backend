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

@Entity()
export class TaintReportModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  script: string;

  @Column()
  taintedString: string;

  @Column()
  isIdentifierCookie: boolean;

  @Column()
  sink: string;

  @OneToMany(() => TaintModel, (taint) => taint.taintReport, {
    cascade: true,
  })
  taints: TaintModel[];

  @ManyToOne(() => WebsiteModel, (website) => website.taintReports, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
