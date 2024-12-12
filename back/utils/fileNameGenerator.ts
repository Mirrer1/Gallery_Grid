import path from 'path';

const fileNameGenerator = (originalName: string, isDev: boolean): string => {
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const sanitizedName = nameWithoutExt
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9.-]/gi, '')
    .toLowerCase()
    .slice(0, 50);

  const prefix = isDev ? 'dev_' : '';
  return `${prefix}${timestamp}_${randomString}_${sanitizedName}${ext}`;
};

export default fileNameGenerator;
