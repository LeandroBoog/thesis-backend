import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaintEntity } from './taint.entity';

@Entity()
export class FlowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation: string;

  @Column()
  builtin: boolean;

  @Column()
  source: boolean;

  @Column()
  filename: string;

  @Column({ default: '' })
  function: string;

  @Column()
  scriptLine: number;

  @Column({ default: false })
  scriptHash: string;

  @Column({ default: false })
  arguments: string;

  @ManyToOne(() => TaintEntity, (taint) => taint.flows)
  taint: TaintEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
