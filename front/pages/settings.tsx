import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import SettingForm from 'components/Settings/SettingForm';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Settings</title>
      </Head>

      <AppLayout>
        <section>
          <h1>Profile Settings</h1>

          <SettingForm />
        </section>
      </AppLayout>
    </>
  );
};

export default Settings;
