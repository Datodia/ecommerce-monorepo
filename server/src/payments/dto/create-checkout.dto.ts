import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateCheckoutItemDto } from './create-checkout-item.dto';

export class CreateCheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateCheckoutItemDto)
  items!: CreateCheckoutItemDto[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  buildingNumber!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  additionalInfo?: string;
}
