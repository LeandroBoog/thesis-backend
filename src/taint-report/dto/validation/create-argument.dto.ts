import { IsString } from 'class-validator';

export class CreateArgumentDto {
  @IsString()
  value: string;
}
