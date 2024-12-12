import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';

import fileNameGenerator from './fileNameGenerator';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

export const configureStorage = () => {
  if (isProduction) {
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: 'ap-northeast-2'
    });
    return multerS3({
      s3: new AWS.S3() as any,
      bucket: 'gallery-grid',
      key: (req, file, done) => {
        done(null, `original/${fileNameGenerator(file.originalname, false)}`);
      }
    });
  } else {
    if (!fs.existsSync('uploads')) {
      console.log('uploads 폴더가 없으므로 생성합니다.');
      fs.mkdirSync('uploads');
    }
    return multer.diskStorage({
      destination: (req, file, done) => {
        done(null, 'uploads');
      },
      filename: (req, file, done) => {
        done(null, fileNameGenerator(file.originalname, true));
      }
    });
  }
};
