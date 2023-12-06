import { diskStorage } from 'multer';
import { createFileName } from '../utils/createFileName';

export const DESTINATION_FILE = 'public/img';

export const FORM_FIELD_NAME = 'file';

export const STORAGE_SETTINGS = {
  storage: diskStorage({
    destination: DESTINATION_FILE,
    filename: createFileName,
  }),
};
