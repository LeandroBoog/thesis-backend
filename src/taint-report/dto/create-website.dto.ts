import {
  ArrayNotEmpty,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCookieDto } from './create-cookie.dto';
import { CreateTaintReportDto } from './create-taint-report.dto';
import { Type } from 'class-transformer';

export class CreateWebsiteDto {
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
