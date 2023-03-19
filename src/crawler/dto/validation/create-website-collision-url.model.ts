import { IsString } from 'class-validator';

export class CreateWebsiteCollisionUrlModel {
  @IsString()
  value: string;
}
