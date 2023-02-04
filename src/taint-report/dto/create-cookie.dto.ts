import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCookieDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  domain: string;

  @IsNumber()
  expires: number;

  @IsString()
  path: string;

  @IsBoolean()
  httpOnly: boolean;

  @IsBoolean()
  secure: boolean;

  @IsString()
  sameSite: string;
}
