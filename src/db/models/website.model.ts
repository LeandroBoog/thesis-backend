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
import { WebsiteCookieModel } from './website-cookie.model';
import { CrawlSessionModel } from './crawl-session.model';
import { WebsiteCookieCollisionModel } from './website-cookie-collision.model';

@Entity()
export class WebsiteModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  cookieCount: number;

  @Column()
  identifierCount: number;

  @ManyToOne(() => CrawlSessionModel, (crawlSession) => crawlSession.websites, {
    onDelete: 'CASCADE',
  })
  crawlSession: CrawlSessionModel;

  @OneToMany(() => TaintReportModel, (taintReport) => taintReport.website, {
    cascade: true,
  })
  taintReports: TaintReportModel[];

  @OneToMany(() => WebsiteCookieModel, (cookie) => cookie.website, {
    cascade: true,
  })
  cookies: WebsiteCookieModel[];

  @OneToMany(
    () => WebsiteCookieCollisionModel,
    (collision) => collision.website,
    {
      cascade: true,
    },
  )
  cookieCollisions: WebsiteCookieCollisionModel[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
