import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WebsiteEntity } from './website.entity';

@Entity()
export class CookieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

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

  @ManyToOne(() => WebsiteEntity, (website) => website.cookies)
  website: WebsiteEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
