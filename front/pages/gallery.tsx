import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/Landing/AppLayout';

const Gallery = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Gallery</title>
      </Head>

      <AppLayout>
        <div>This is</div>
        <div>Gallery Page!</div>
      </AppLayout>
    </>
  );
};

export default Gallery;
