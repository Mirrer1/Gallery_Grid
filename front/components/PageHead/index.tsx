import Head from 'next/head';

type PageHeadProps = {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
};

const PageHead = ({ title, description, imageUrl, url }: PageHeadProps) => {
  const defaultImageUrl = 'https://gallerygrd.com/favicon.ico';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl || defaultImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImageUrl} />
    </Head>
  );
};

export default PageHead;
