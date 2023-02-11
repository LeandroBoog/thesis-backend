import {
  ArrayNotEmpty,
  IsDefined,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFlowDto } from './create-flow.dto';

export class CreateTaintDto {
  @IsNumber()
  begin: number;

  @IsNumber()
  end: number;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateFlowDto)
  @ValidateNested({ each: true, message: 'flow dto failed' })
  flows: CreateFlowDto[];
}
