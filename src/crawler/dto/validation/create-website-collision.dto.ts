import {
  ArrayNotEmpty,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWebsiteCollisionUrlModel } from './create-website-collision-url.model';

export class CreateWebsiteCollisionDto {
  @IsString()
  name: string;

  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => CreateWebsiteCollisionUrlModel)
  @ValidateNested({ each: true, message: 'website collision url dto failed' })
  urls: CreateWebsiteCollisionUrlModel[];
}
