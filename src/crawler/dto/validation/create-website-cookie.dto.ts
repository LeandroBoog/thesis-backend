import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateWebsiteCookieDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  origin: string;

  @IsString()
  type: string;

  @IsBoolean()
  isIdentifier: boolean;

  @IsString()
  hash: string;
}
