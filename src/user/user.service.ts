import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/User.dto';
import * as PDFDocument from 'pdfkit';
import { DESTINATION_FILE } from './constants/uploadFile';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(user: UserDto) {
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

  async updateUser(userData: UserDto) {
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
    const { firstName, lastName, image } = user;

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      //todo
      doc.text(`FirstName: ${firstName}`);
      doc.moveDown();
      doc.text(`LastName: ${lastName}`);

      doc.image(`${DESTINATION_FILE}/${image}`);

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    await this.addPdfToDatabase({ email, pdf: pdfBuffer });

    return pdfBuffer;
  }

  async addPdfToDatabase({ email, pdf }: { email: string; pdf: Buffer }) {
    const isAddedPdf = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        pdf,
      },
    });
    return isAddedPdf;
  }
}
