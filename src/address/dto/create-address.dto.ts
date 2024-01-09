import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  /* @IsString()
  @IsNotEmpty()
  userId: string; */

  @Length(8, 8)
  @IsString()
  @IsNotEmpty()
  cep: string;

  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  state: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  city: string;

  @MaxLength(80)
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @MaxLength(80)
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsNotEmpty()
  number: number;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  complement?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  referencePoint?: string;
}
