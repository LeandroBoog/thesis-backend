import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WebsiteCookieCollisionUrlModel } from './website-cookie-collision-url.model';
import { WebsiteModel } from './website.model';

@Entity()
export class WebsiteCookieCollisionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => WebsiteCookieCollisionUrlModel,
    (url) => url.cookieCollision,
    {
      cascade: true,
    },
  )
  urls: WebsiteCookieCollisionUrlModel[];

  @ManyToOne(() => WebsiteModel, (website) => website.cookieCollisions, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
