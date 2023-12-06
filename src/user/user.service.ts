import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(user: UserDto) {
    const { firstName, lastName, email } = user;
    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        image: '',
        pdf: Buffer.from([]),
      },
    });
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser(userData: UserDto) {
    const { firstName, lastName, email } = userData;
    const user = this.prisma.user.upsert({
      where: {
        email,
      },
      update: {
        firstName,
        lastName,
      },
      create: {
        email,
        firstName,
        lastName,
        image: '',
        pdf: Buffer.from([]),
      },
    });
    return user;
  }

  async deleteUser(email: string) {
    return await this.prisma.user.delete({
      where: {
        email,
      },
    });
  }
}
