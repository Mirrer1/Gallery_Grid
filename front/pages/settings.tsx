import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/Landing/AppLayout';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Settings</title>
      </Head>

      <AppLayout>
        <div>This is</div>
        <div>Settings Page!</div>
      </AppLayout>
    </>
  );
};

export default Settings;
