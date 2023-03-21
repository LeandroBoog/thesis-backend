import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WebsiteModel } from './website.model';

@Entity()
export class WebsiteCookieModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  type: string;

  @Column()
  origin: string;

  @Column()
  isIdentifier: boolean;

  @ManyToOne(() => WebsiteModel, (website) => website.cookies, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
