import {
  ArrayNotEmpty,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateWebsiteCookieDto } from './create-website-cookie.dto';
import { CreateTaintReportDto } from './create-taint-report.dto';
import { CreateWebsiteCollisionDto } from './create-website-collision.dto';
import { Type } from 'class-transformer';

export class CreateWebsiteDto {
  @IsNumber()
  crawlSessionId: number;

  @IsString()
  url: string;

  @IsDefined()
  @Type(() => CreateWebsiteCollisionDto)
  @ValidateNested({ each: true, message: 'website collision dto failed' })
  cookieCollisions: CreateWebsiteCollisionDto[];

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateWebsiteCookieDto)
  @ValidateNested({ each: true, message: 'cookies dto failed' })
  cookies: CreateWebsiteCookieDto[];

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateTaintReportDto)
  @ValidateNested({ each: true, message: 'taintReports dto failed' })
  taintReports: CreateTaintReportDto[];
}
