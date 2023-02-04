import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaintEntity } from './taint.entity';
import { WebsiteEntity } from './website.entity';

@Entity()
export class TaintReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  script: string;

  @Column()
  taintedString: string;

  @Column()
  sink: string;

  @OneToMany(() => TaintEntity, (taint) => taint.taintReport, {
    cascade: true,
  })
  taints: TaintEntity[];

  @ManyToOne(() => WebsiteEntity, (website) => website.taintReports)
  website: WebsiteEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
