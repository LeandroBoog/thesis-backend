import { IsBoolean, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  arguments: string;
}
