const isProduction = process.env.NODE_ENV === 'production';

export const backURL = isProduction ? 'https://api.gallerygrd.com' : 'http://localhost:3065';
export const imgURL = (src: string) => (isProduction ? src : `${backURL}/${src}`);
