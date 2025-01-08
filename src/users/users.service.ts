import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const targetRoles = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [targetRoles.id]);
    user.roles = [targetRoles];
    return user;
  }

  async getAllUsers() {
    const usersList = await this.userRepository.findAll({
      include: { all: true },
    });
    return usersList;
  }

  async getUserByEmail(email: string) {
    const targetUser = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return targetUser;
  }
}
