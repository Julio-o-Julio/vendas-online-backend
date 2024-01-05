import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  userType?: string;

  @Length(13, 13)
  @IsString()
  @IsOptional()
  phone?: string;

  @MaxLength(11)
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
