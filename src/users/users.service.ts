import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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

  async addRole(userDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(userDto.userId);
    const role = await this.roleService.getRoleByValue(userDto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return userDto;
    }
    throw new HttpException('user or role not defind', HttpStatus.NOT_FOUND);
  }

  async banUser(userDto: BanUserDto) {
    const user = await this.userRepository.findByPk(userDto.userId);

    if (user) {
      user.banned = true;
      user.banReason = userDto.reason;
      user.save();
      return user;
    }
    
    throw new HttpException('user not defind', HttpStatus.NOT_FOUND);
  }
}
