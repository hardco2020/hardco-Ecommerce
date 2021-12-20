import { IsArray, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

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

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public desc: string;

  @IsString()
  @IsOptional()
  public img: string;

  @IsArray()
  @IsOptional()
  public categories: string[];

  @IsArray()
  @IsOptional()
  public size: string[];

  @IsArray()
  @IsOptional()
  public color: string[];

  @IsBoolean()
  @IsOptional()
  public inStock: boolean;

  @IsNumber()
  @IsOptional()
  public price: number;
}
