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
export class CookieModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  isIdentifierCookie: boolean;

  @Column()
  domain: string;

  @Column()
  expires: number;

  @Column()
  path: string;

  @Column()
  httpOnly: boolean;

  @Column()
  secure: boolean;

  @Column()
  sameSite: string;

  @Column()
  hash: string;

  @ManyToOne(() => WebsiteModel, (website) => website.cookies, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
