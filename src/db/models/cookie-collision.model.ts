import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UrlModel } from './url.model';
import { WebsiteModel } from './website.model';

@Entity()
export class CookieCollisionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @OneToMany(() => UrlModel, (url) => url.value, {
    cascade: true,
  })
  urls: UrlModel[];

  @ManyToOne(() => WebsiteModel, (website) => website.cookieCollisions, {
    onDelete: 'CASCADE',
  })
  website: WebsiteModel;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
