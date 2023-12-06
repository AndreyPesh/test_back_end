import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/User.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FORM_FIELD_NAME, STORAGE_SETTINGS } from './constants/uploadFile';
import { UploadFileType } from './types/types';
import { Response } from 'express';
import { setHeadersForPdf } from './utils/setHeadersForPdf';
import { EmailUserDto } from './dto/EmailUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('pdf')
  async getPdf(@Body() { email }: EmailUserDto, @Res() res: Response) {
    const buffer = await this.userService.getPdfFromDatabase(email);
    res.set(setHeadersForPdf(buffer.length));
    res.end(buffer);
  }

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
    @Body() userData: CreateUserDto,
    @UploadedFile() file: UploadFileType,
  ) {
    const image = file && file.filename;
    return await this.userService.createUser({ ...userData, image });
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor(FORM_FIELD_NAME, STORAGE_SETTINGS))
  async updateUser(
    @Body() userData: CreateUserDto,
    @UploadedFile() file: UploadFileType,
  ) {
    const image = file && file.filename;
    return await this.userService.updateUser({ ...userData, image });
  }

  @Delete('delete')
  async deleteUser(@Body() { email }: EmailUserDto) {
    return await this.userService.deleteUser(email);
  }

  @Post('create-pdf')
  async createPdf(@Body() { email }: EmailUserDto) {
    const isPdfAdded = await this.userService.createPdf(email);
    return isPdfAdded;
  }
}
