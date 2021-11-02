import { CartProduct } from '@/interfaces/cart.interface';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  public userId: string;

  @IsArray()
  public products: CartProduct[];

  @IsNumber()
  public amount: number;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public status: string;
}
