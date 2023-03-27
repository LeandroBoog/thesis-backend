import {
  ArrayNotEmpty,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTaintDto } from './create-taint.dto';
import { Type } from 'class-transformer';
import { CreateGhostwritingPartnerDto } from './create-ghostwriting-partner.dto';

export class CreateTaintReportDto {
  @IsString()
  domain: string;

  @IsString()
  script: string;

  @IsString()
  scriptDomain: string;

  @IsString()
  taintedString: string;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateGhostwritingPartnerDto)
  @ValidateNested({ each: true, message: 'ghostwriting partner dto failed' })
  ghostwritingPartners: CreateGhostwritingPartnerDto[];

  @IsString()
  sink: string;

  @IsNumber()
  numberOfTaints: number;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateTaintDto)
  @ValidateNested({ each: true, message: 'taint dto failed' })
  taints: CreateTaintDto[];
}
