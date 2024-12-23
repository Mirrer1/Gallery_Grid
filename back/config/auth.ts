import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_ID!,
  clientSecret: process.env.GOOGLE_SECRET!,
  callbackURL: isProduction
    ? 'https://api.gallerygrd.com/user/google/callback'
    : 'http://localhost:3065/user/google/callback'
};

export const REDIRECT_CONFIG = {
  successRedirect: isProduction ? 'https://gallerygrd.com/auth' : 'http://localhost:3000/auth',
  failureRedirect: isProduction ? 'https://gallerygrd.com' : 'http://localhost:3000'
};
