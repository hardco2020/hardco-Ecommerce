import { IsArray, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public title: string;

  @IsString()
  public desc: string;

  @IsString()
  public img: string;

  @IsArray()
  public categories: string[];

  @IsArray()
  public size: string[];

  @IsArray()
  public color: string[];

  @IsBoolean()
  public inStock: boolean;

  @IsNumber()
  public price: number;
}
