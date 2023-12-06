import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
