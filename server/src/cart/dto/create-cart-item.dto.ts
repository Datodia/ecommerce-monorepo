import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  cartId!: string;

  @IsUUID()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
