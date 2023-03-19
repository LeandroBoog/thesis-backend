import { IsString } from 'class-validator';

export class CreateFlowArgumentDto {
  @IsString()
  value: string;
}
