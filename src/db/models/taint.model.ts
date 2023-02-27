import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlowModel } from './flow.model';
import { TaintReportModel } from './taint-report.model';

@Entity()
export class TaintModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  begin: number;

  @Column()
  end: number;

  @OneToMany(() => FlowModel, (flow) => flow.taint, {
    cascade: true,
  })
  flows: FlowModel[];

  @ManyToOne(() => TaintReportModel, (taintReport) => taintReport.taints, {
    onDelete: 'CASCADE',
  })
  taintReport: TaintReportModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
