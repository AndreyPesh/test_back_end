import * as PDFDocument from 'pdfkit';
import { User } from '@prisma/client';
import { DESTINATION_FILE } from '../constants/uploadFile';

export const createPdfBuffer = (user: User): Promise<Buffer> => {
  const { firstName, lastName, image } = user;

  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      bufferPages: true,
    });

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
};
