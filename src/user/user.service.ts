import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/User.dto';
import { createPdfBuffer } from './utils/createPdfBuffer';
import { EMPTY_LENGTH } from './constants/uploadFile';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(user: CreateUserDto) {
    const { firstName, lastName, email, image } = user;
    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        image,
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

  async updateUser(userData: CreateUserDto) {
    const { firstName, lastName, email, image } = userData;
    const user = this.prisma.user.upsert({
      where: {
        email,
      },
      update: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        image: image || undefined,
      },
      create: {
        email,
        firstName,
        lastName,
        image,
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

  async createPdf(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return false;
    }

    const pdfBuffer: Buffer = await createPdfBuffer(user);

    const userData = await this.addPdfToDatabase({ email, pdf: pdfBuffer });

    const isPdfAdded = userData.pdf.length > EMPTY_LENGTH;

    return isPdfAdded;
  }

  async addPdfToDatabase({ email, pdf }: { email: string; pdf: Buffer }) {
    const userData = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        pdf,
      },
    });
    return userData;
  }

  async getPdfFromDatabase(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user.pdf;
  }
}
