import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/User.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FORM_FIELD_NAME, STORAGE_SETTINGS } from './constants/uploadFile';
import { UploadFileType } from './types/types';

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
  @UseInterceptors(FileInterceptor(FORM_FIELD_NAME, STORAGE_SETTINGS))
  async createUser(
    @Body() userData: UserDto,
    @UploadedFile() file: UploadFileType,
  ) {
    const image = file && file.filename;
    return await this.userService.createUser({ ...userData, image });
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
