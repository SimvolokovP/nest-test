import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'email of user' })
  @IsString({ message: 'String value' })
  @IsEmail({}, { message: 'Email error' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'password of user' })
  @IsString({ message: 'String value' })
  @Length(4, 16, { message: '4 > x > 16' })
  readonly password: string;
}
