const isProduction = process.env.NODE_ENV === 'production';

export const backURL = isProduction ? 'http://api.gallerygrd.com' : 'http://localhost:3065';

export const imageURL = 'https://your-s3-bucket-name.s3.amazonaws.com';
