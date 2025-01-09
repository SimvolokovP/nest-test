import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

import { Roles } from 'src/auth/roles.auth.decorator';
import { RoleAuthGuard } from 'src/auth/role-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidatePipe } from 'src/pipes/validation.pipe';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({summary: "Creating User"})
  @ApiResponse({status: 200, type: User})
  // @UsePipes(ValidatePipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: "Get all users list"})
  @ApiResponse({status: 200, type: [User]})
  @Roles("ADMIN")
  @UseGuards(RoleAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: "Add role to user"})
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RoleAuthGuard)
  @Post("/role")
  addRole(@Body() userDto: AddRoleDto) {
    return this.usersService.addRole(userDto)
  }

  @ApiOperation({summary: "Ban user"})
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RoleAuthGuard)
  @Post("/ban")
  banUser(@Body() userDto: BanUserDto) {
    return this.usersService.banUser(userDto)
  }
}
