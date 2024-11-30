const isProduction = process.env.NODE_ENV === 'production';
const backURL = isProduction ? 'http://api.gallerygrd.com' : 'http://localhost:3065';

export default backURL;
