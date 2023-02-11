import { Exclude } from 'class-transformer';

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
  createdAt: string;
  @Exclude()
  updatedAt: string;

  constructor(partial: Partial<SessionEntity>) {
    Object.assign(this, partial);
  }
}
