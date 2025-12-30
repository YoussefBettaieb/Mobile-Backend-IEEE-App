import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;
}
