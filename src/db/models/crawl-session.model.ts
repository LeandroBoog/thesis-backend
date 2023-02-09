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

  @Column({ default: 0 })
  maxDepth: number;

  @Column({ default: 0 })
  maxLinks: number;

  @Column({ default: 0 })
  maxRetries: number;

  @Column({ default: true })
  sameSite: boolean;

  @Column({ default: false })
  depthFirst: boolean;

  @Column({ default: false })
  manualQueue: boolean;

  @Column({ default: false })
  randomizeLinks: boolean;

  @OneToMany(() => WebsiteModel, (website) => website.crawlSession, {
    cascade: true,
  })
  websites: WebsiteModel[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
