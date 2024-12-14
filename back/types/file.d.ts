import { Express } from 'express';

export interface S3File extends Express.Multer.File {
  location: string;
}

declare global {
  namespace Express {
    interface Request {
      files?: S3File[];
    }
  }
}
