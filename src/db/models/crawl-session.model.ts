import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WebsiteModel } from './website.model';

@Entity()
export class CrawlSessionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maxDepth: number;

  @Column()
  maxLinks: number;

  @Column()
  maxRetries: number;

  @Column()
  sameSite: boolean;

  @Column()
  depthFirst: boolean;

  @Column()
  manualQueue: boolean;

  @Column()
  randomizeLinks: boolean;

  @Column()
  trackingProtection: boolean;

  @Column()
  networkCookieBehaviour: number;

  @Column()
  cookieBlocker: boolean;

  @OneToMany(() => WebsiteModel, (website) => website.crawlSession, {
    cascade: true,
  })
  websites: WebsiteModel[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
