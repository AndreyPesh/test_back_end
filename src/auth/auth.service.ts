import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userEmail: string) {
    const user = await this.userService.getUserByEmail(userEmail);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const { id, email } = user;
    const payload: JwtPayload = { id, sub: email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
