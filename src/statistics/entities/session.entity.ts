import { Exclude, Expose, Transform } from 'class-transformer';

export class SessionEntity {
  @Expose({ name: 'id' })
  crawl_id: number;
  @Expose({ name: 'maxDepth' })
  crawl_maxDepth: string;
  @Expose({ name: 'maxLinks' })
  crawl_maxLinks: string;
  @Expose({ name: 'maxRetries' })
  crawl_maxRetries: string;
  @Expose({ name: 'sameSite' })
  crawl_sameSite: string;
  @Expose({ name: 'depthFirst' })
  crawl_depthFirst: string;
  @Expose({ name: 'manualQueue' })
  crawl_manualQueue: number;
  @Expose({ name: 'randomizeLinks' })
  crawl_randomizeLinks: number;

  @Exclude()
  url: string;
  @Exclude()
  sink: string;
  @Exclude()
  script: string;
  @Exclude()
  total: number;
  @Exclude()
  crawl_createdAt: string;
  @Exclude()
  crawl_updatedAt: string;

  constructor(partial: Partial<SessionEntity>) {
    Object.assign(this, partial);
  }
}
