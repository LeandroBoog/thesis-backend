import { Exclude } from 'class-transformer';

export class MostCommonScriptOriginsEntity {
  total: number;
  script: string;

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

  constructor(partial: Partial<MostCommonScriptOriginsEntity>) {
    Object.assign(this, partial);
  }
}
