import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/Landing/AppLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Home</title>
      </Head>

      <AppLayout>
        <div>This is</div>
        <div>Home Page!</div>
      </AppLayout>
    </>
  );
};

export default Home;
