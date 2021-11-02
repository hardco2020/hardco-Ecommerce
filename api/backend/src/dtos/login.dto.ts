import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginFormDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string;
}
