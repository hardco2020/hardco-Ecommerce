import { CartProduct } from '@/interfaces/cart.interface';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  public userId: string;

  @IsArray()
  public products: CartProduct[];

  @IsNumber()
  public total: number;

  @IsNumber()
  public quantity: number;
}
