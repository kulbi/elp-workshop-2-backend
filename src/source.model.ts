import { Transform, Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class ConvertBoolean {
  @IsBoolean()
  @Type(() => Boolean)
  test: boolean;
}
