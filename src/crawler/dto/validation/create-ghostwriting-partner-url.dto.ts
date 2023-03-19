import { IsString } from 'class-validator';

export class CreateGhostwritingPartnerUrlDto {
  @IsString()
  value: string;
}
