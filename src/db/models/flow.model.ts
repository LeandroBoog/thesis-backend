import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TaintModel } from './taint.model';
import { ArgumentModel } from './argument.model';

@Entity()
export class FlowModel {
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

  @OneToMany(() => ArgumentModel, (argument) => argument.value, {
    cascade: true,
  })
  arguments: ArgumentModel[];

  @ManyToOne(() => TaintModel, (taint) => taint.flows)
  taint: TaintModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
