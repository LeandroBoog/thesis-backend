import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaintReportEntity } from './taint-report.entity';
import { CookieEntity } from './cookie.entity';

@Entity()
export class WebsiteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToMany(() => TaintReportEntity, (taintReport) => taintReport.website, {
    cascade: true,
  })
  taintReports: TaintReportEntity[];

  @OneToMany(() => CookieEntity, (cookie) => cookie.website, {
    cascade: true,
  })
  cookies: CookieEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
