import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }

  @Post('create')
  async createUser(@Body() userData: UserDto) {
    return await this.userService.createUser(userData);
  }

  @Patch('update')
  async updateUser(@Body() userData: UserDto) {
    return await this.userService.updateUser(userData);
  }

  @Delete('delete')
  async deleteUser(@Body() { email }: { email: string }) {
    return await this.userService.deleteUser(email);
  }
}
