import {
  ArrayNotEmpty,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCookieDto } from './create-cookie.dto';
import { CreateTaintReportDto } from './create-taint-report.dto';
import { Type } from 'class-transformer';

export class CreateWebsiteDto {
  @IsNumber()
  crawlSessionId: number;

  @IsString()
  url: string;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateTaintReportDto)
  @ValidateNested({ each: true, message: 'taintReports dto failed' })
  taintReports: CreateTaintReportDto[];

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateCookieDto)
  @ValidateNested({ each: true, message: 'cookies dto failed' })
  cookies: CreateCookieDto[];
}
