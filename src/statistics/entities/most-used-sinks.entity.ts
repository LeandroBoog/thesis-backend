import { Exclude } from 'class-transformer';

export class MostUsedSinksEntity {
  total: number;
  sink: string;

  @Exclude()
  report_id: number;
  @Exclude()
  report_script: string;
  @Exclude()
  report_taintedString: string;
  @Exclude()
  report_sink: string;
  @Exclude()
  report_createdAt: string;
  @Exclude()
  report_updatedAt: string;
  @Exclude()
  report_websiteId: number;

  constructor(partial: Partial<MostUsedSinksEntity>) {
    Object.assign(this, partial);
  }
}
