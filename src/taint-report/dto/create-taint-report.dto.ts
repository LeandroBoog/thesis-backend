import {
  ArrayNotEmpty,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTaintDto } from './create-taint.dto';
import { Type } from 'class-transformer';

export class CreateTaintReportDto {
  @IsString()
  script: string;

  @IsString()
  taintedString: string;

  @IsString()
  sink: string;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateTaintDto)
  @ValidateNested({ each: true, message: 'taint dto failed' })
  taints: CreateTaintDto[];
}
