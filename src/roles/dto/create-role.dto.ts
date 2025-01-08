import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role of user' })
  readonly value: string;
  @ApiProperty({
    example: 'Admin of app',
    description: 'description of user role',
  })
  readonly descr: string;
}
