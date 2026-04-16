import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateCheckoutItemDto {
  @IsUUID()
  productId!: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}
