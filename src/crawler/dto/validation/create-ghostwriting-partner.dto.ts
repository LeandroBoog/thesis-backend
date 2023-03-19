import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGhostwritingPartnerCookieDto } from './create-ghostwriting-partner-cookie.dto';
import { CreateGhostwritingPartnerUrlDto } from './create-ghostwriting-partner-url.dto';

export class CreateGhostwritingPartnerDto {
  @IsDefined()
  @Type(() => CreateGhostwritingPartnerCookieDto)
  @ValidateNested({
    each: true,
    message: 'ghostwriting partner cookie dto failed',
  })
  cookie: CreateGhostwritingPartnerCookieDto[];

  @IsDefined()
  @Type(() => CreateGhostwritingPartnerUrlDto)
  @ValidateNested({
    each: true,
    message: 'ghostwriting partner url dto failed',
  })
  partners: CreateGhostwritingPartnerUrlDto[];
}
