import { Request } from 'express';

type CallbackSaveFile = (error: Error, filename: string) => void;

export const createFileName = (
  req: Request,
  file: Express.Multer.File,
  cb: CallbackSaveFile,
) => {
  const extension = file.originalname.split('.').pop();
  const imageRandomName = Date.now().toString();
  const fileName = `${imageRandomName}.${extension}`;
  cb(null, fileName);
};
