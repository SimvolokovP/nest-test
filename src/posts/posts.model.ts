import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
  title: string;
  text: string;
  userId: number;
  image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id of post' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'TITLE', description: 'title of post' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: '123123131wfwfwwe', description: 'text of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: '231.jpg', description: 'link to image of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ApiProperty({ example: '1', description: 'id of user' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  author: User
}
