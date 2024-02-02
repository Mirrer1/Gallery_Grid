import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/Landing/AppLayout';

const Message = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Message</title>
      </Head>

      <AppLayout>
        <div>This is</div>
        <div>Message Page!</div>
      </AppLayout>
    </>
  );
};

export default Message;
