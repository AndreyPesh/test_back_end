import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/User.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FORM_FIELD_NAME,
  STORAGE_SETTINGS,
} from 'src/user/constants/uploadFile';
import { UploadFileType } from 'src/user/types/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() { email }: { email: string }) {
    return this.authService.signIn(email);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor(FORM_FIELD_NAME, STORAGE_SETTINGS))
  async signUp(
    @Body() userData: CreateUserDto,
    @UploadedFile() file: UploadFileType,
  ) {
    const image = file && file.filename;
    return await this.authService.signUp({ ...userData, image });
  }
}
