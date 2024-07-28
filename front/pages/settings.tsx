import React from 'react';
import { CameraOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import SettingForm from 'components/Settings/SettingForm';
import wrapper from 'store/configureStore';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { MobileImageBtn, SettingProfile, SettingWrapper } from 'styles/Settings';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Settings</title>
      </Head>

      <AppLayout>
        <SettingWrapper>
          <SettingProfile {...slideInFromBottom()}>
            <label htmlFor="setting-image">
              <img
                src="https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg"
                alt="유저 프로필 이미지"
              />
            </label>

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

            <MobileImageBtn htmlFor="setting-image">사진 변경</MobileImageBtn>

            <input type="file" id="setting-image" />
          </SettingProfile>

          <SettingForm />
        </SettingWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  context.store.dispatch(loadMyInfoRequest());
  // context.store.dispatch(loadPostsRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (!me) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
});

export default Settings;
