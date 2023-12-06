import { User } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/User.dto';
import { JwtPayload } from './types/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userEmail: string) {
    const user = await this.userService.getUserByEmail(userEmail);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return this.createAccessToken(user);
  }

  async signUp(userData: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userData.email);
    if (user) {
      throw new BadRequestException('User already exist');
    }
    const newUser = await this.userService.createUser(userData);

    return this.createAccessToken(newUser);
  }

  private createAccessToken(user: User) {
    const { id, email } = user;
    const payload: JwtPayload = { id, sub: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
