import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'storage/');
    },
    filename: (req, file, cb) => {
      cb(null, crypto.randomBytes(32).toString('base64url') + '-' + file.originalname);
    }
});
  
export const upload = multer({ storage: storage });

export const storageBaseUrl = process.env.APP_URL