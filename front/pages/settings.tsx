import React from 'react';
import { CameraOutlined } from '@ant-design/icons';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import SettingForm from 'components/Settings/SettingForm';
import { slideInFromBottom } from 'styles/Common/animation';
import { SettingProfile, SettingWrapper } from 'styles/Settings';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Settings</title>
      </Head>

      <AppLayout>
        <SettingWrapper>
          <SettingProfile {...slideInFromBottom()}>
            <img
              src="https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg"
              alt="유저 프로필 이미지"
            />

            <div>
              <h1>Lorem ipsum dolor</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur onsectetur onsectetur onsectetur onrem ipsum dolor sit amet
                consectetur onsectetur onsectetur onsectetur onrem ipsum dolor sit amet consectetur onsectetur
                onsectetur onsectetur onrem ipsum dolor sit amet consectetur onsectetur onsectetur onsectetur onrem
                ipsum dolor sit amet consectetur onsectetur onsectetur onsectetur onrem ipsum dolor sit amet consectetur
                onsectetur onsectetur onsectetur onsectetur{' '}
              </p>
            </div>

            <label htmlFor="setting-image">
              <CameraOutlined />
            </label>
            <input type="file" id="setting-image" />
          </SettingProfile>

          <SettingForm />
        </SettingWrapper>
      </AppLayout>
    </>
  );
};

export default Settings;
