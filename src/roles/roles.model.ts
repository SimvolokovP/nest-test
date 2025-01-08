import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from 'src/user-roles/user-roles.model';
import { User } from 'src/users/users.model';

interface RoleCreationAttrs {
  value: string;
  descr: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id of role' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'role of user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Admin of app',
    description: 'description of user role',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  descr: string;

  @BelongsToMany( () => User, () => UserRoles )
  users: User[]
}
