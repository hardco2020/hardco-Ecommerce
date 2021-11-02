import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string | null;

  @IsString()
  public username: string;

  @IsBoolean()
  public isAdmin: boolean;
}
