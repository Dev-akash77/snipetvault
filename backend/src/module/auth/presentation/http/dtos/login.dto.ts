import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'email is required' })
  @MinLength(3, { message: 'email must be 3 or more character' })
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(3, { message: 'password must be 3 or more character' })
  @MaxLength(255)
  password: string;
}
