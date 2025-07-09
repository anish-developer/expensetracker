import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(body);
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'User creation failed',
        error: error?.message,
      };
    }
  }

  @Put(':userId')
  async updateUser(
    @Body() body: CreateUserDto,
    @Param('userId') userId: string,
  ) {
    try {
      const user = await this.usersService.updateUser(userId, body);
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'User update failed',
        error: error?.message,
      };
    }
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    try {
      const user = await this.usersService.getUser(userId);
      return {
        statusCode: 200,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 404,
        message: 'User not found',
        error: error?.message,
      };
    }
  }

  @Get()
  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUsers();
      return {
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve users',
        error: error?.message,
      };
    }
  }
}
