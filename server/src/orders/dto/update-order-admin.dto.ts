import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderAdminDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  buildingNumber?: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;
}
