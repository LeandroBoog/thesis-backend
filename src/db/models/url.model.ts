import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CookieCollisionModel } from './cookie-collision.model';

@Entity()
export class UrlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(
    () => CookieCollisionModel,
    (cookieCollision) => cookieCollision.urls,
    {
      onDelete: 'CASCADE',
    },
  )
  cookieCollision: CookieCollisionModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
