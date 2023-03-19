import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFlowArgumentDto } from './create-flow-argument.dto';

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
  @Type(() => CreateFlowArgumentDto)
  @ValidateNested({ each: true, message: 'arguments dto failed' })
  arguments: CreateFlowArgumentDto[];
}
