import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @MinLength(3, { message: 'name must be 3 or more character' })
  @MaxLength(255)
  name: string;

  @IsBoolean()
  @IsOptional()
  check?:boolean


}
