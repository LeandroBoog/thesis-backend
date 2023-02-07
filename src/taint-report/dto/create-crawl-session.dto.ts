import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCrawlSessionDto {
  @IsNumber()
  maxDepth: number;

  @IsNumber()
  maxLinks: number;

  @IsNumber()
  maxRetries: number;

  @IsBoolean()
  sameSite: boolean;

  @IsBoolean()
  depthFirst: boolean;

  @IsBoolean()
  manualQueue: boolean;

  @IsBoolean()
  randomizeLinks: boolean;

  @IsString()
  usedList: string;

  @IsNumber()
  pageLimit: number;
}
