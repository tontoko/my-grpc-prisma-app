import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  GetUserByIdRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from 'src/proto/user';

@UserServiceControllerMethods()
@Controller('users')
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  async getUserById(request: GetUserByIdRequest): Promise<User> {
    const user = await this.usersService.findOne(+request.id);
    if (!user) {
      throw new NotFoundException(`User with id ${request.id} not found`);
    }
    return user;
  }

  async createUser(request: CreateUserRequest): Promise<User> {
    const createUserDto = { email: request.email, name: request.name };
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: { email?: string; name?: string },
  ): Promise<User> {
    const user = await this.usersService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.remove(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
