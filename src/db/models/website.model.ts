import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TaintReportModel } from './taint-report.model';
import { CookieModel } from './cookie.model';
import { CrawlSessionModel } from './crawl-session.model';
import { CookieCollisionModel } from './cookie-collision.model';

@Entity()
export class WebsiteModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => CrawlSessionModel, (crawlSession) => crawlSession.websites, {
    onDelete: 'CASCADE',
  })
  crawlSession: CrawlSessionModel;

  @OneToMany(() => TaintReportModel, (taintReport) => taintReport.website, {
    cascade: true,
  })
  taintReports: TaintReportModel[];

  @OneToMany(() => TaintReportModel, (taintReport) => taintReport.website, {
    cascade: true,
  })
  cookieCollisions: CookieCollisionModel[];

  @OneToMany(() => CookieModel, (cookie) => cookie.website, {
    cascade: true,
  })
  cookies: CookieModel[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
