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

  @Column()
  function: string;

  @Column()
  scriptLine: number;

  @Column()
  scriptHash: string;

  @OneToMany(() => ArgumentModel, (argument) => argument.value, {
    cascade: true,
  })
  arguments: ArgumentModel[];

  @ManyToOne(() => TaintModel, (taint) => taint.flows, {
    onDelete: 'CASCADE',
  })
  taint: TaintModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
