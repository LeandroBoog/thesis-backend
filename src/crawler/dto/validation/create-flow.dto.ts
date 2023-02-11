import {
  ArrayNotEmpty,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateArgumentDto } from './create-argument.dto';

export class CreateFlowDto {
  @IsString()
  operation: string;

  @IsBoolean()
  builtin: boolean;

  @IsBoolean()
  source: boolean;

  @IsString()
  filename: string;

  @IsString()
  function: string;

  @IsNumber()
  scriptLine: number;

  @IsString()
  scriptHash: string;

  @IsDefined()
  @Type(() => CreateArgumentDto)
  @ValidateNested({ each: true, message: 'arguments dto failed' })
  arguments: CreateArgumentDto[];
}
