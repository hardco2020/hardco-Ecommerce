import { CartProduct } from '@/interfaces/cart.interface';
import { IsArray, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  public userId: string;

  @IsArray()
  public products: CartProduct[];
}
