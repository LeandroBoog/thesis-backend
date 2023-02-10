import { Exclude } from 'class-transformer';
import { WebsiteModel } from '../../db/models/website.model';

export class SessionEntity {
  id: number;
  maxDepth: number;
  maxLinks: number;
  maxRetries: number;
  sameSite: boolean;
  depthFirst: boolean;
  manualQueue: boolean;
  randomizeLinks: boolean;

  @Exclude()
  websites: WebsiteModel[];
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;

  constructor(partial: Partial<SessionEntity>) {
    Object.assign(this, partial);
  }
}
