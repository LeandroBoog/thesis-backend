import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlowEntity } from './flow.entity';
import { TaintReportEntity } from './taint-report.entity';

@Entity()
export class TaintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  begin: number;

  @Column()
  end: number;

  @OneToMany(() => FlowEntity, (flow) => flow.taint, {
    cascade: true,
  })
  flows: FlowEntity[];

  @ManyToOne(() => TaintReportEntity, (taintReport) => taintReport.taints)
  taintReport: TaintReportEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
