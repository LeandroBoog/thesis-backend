import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { WebsiteCookieCollisionModel } from './website-cookie-collision.model';

@Entity()
export class WebsiteCookieCollisionUrlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(
    () => WebsiteCookieCollisionModel,
    (cookieCollision) => cookieCollision.urls,
    {
      onDelete: 'CASCADE',
    },
  )
  cookieCollision: WebsiteCookieCollisionModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
