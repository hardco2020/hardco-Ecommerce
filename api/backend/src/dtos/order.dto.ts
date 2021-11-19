import { CartProduct } from '@/interfaces/cart.interface';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  public userId: string;

  @IsArray()
  public products: CartProduct[];

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public total: number;

  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public status: string;
}
