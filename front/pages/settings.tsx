import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CameraOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import SettingForm from 'components/Settings/SettingForm';
import wrapper from 'store/configureStore';
import useFileUpload from 'utils/useFileUpload';
import useToastStatus from 'utils/useToast';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest, userRemoveUploadedImage, userUploadImageRequest } from 'store/actions/userAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { MobileImageBtn, MobileRemoveImageBtn, SettingProfile, SettingWrapper } from 'styles/Settings';

const Settings = () => {
  const dispatch = useDispatch();
  const { me, userImagePath, userUploadImageLoading } = useSelector((state: RootState) => state.user);
  const { fileInputRef, onFileChange } = useFileUpload(userUploadImageRequest, { showWarning: false });
  useToastStatus();

  const handleRemoveImage = useCallback(() => {
    dispatch(userRemoveUploadedImage());
  }, []);

  return (
    <>
      <Head>
        <title>Gallery Grid | Settings</title>
      </Head>

      <AppLayout>
        <SettingWrapper>
          <SettingProfile {...slideInFromBottom()} $upload={userUploadImageLoading}>
            <label htmlFor="setting-image">
              {userImagePath.length > 0 ? (
                <img src={`http://localhost:3065/${userImagePath}`} alt="유저 프로필 이미지" />
              ) : (
                <img
                  src={me?.ProfileImage ? `http://localhost:3065/${me.ProfileImage.src}` : '/user.jpg'}
                  alt="유저 프로필 이미지"
                />
              )}
            </label>

            <div>
              <h1>{me?.nickname}</h1>
              {me?.desc ? <p>{me.desc}</p> : <p>더 많은 사람들이 당신을 알 수 있도록, 소개글을 작성해보세요.</p>}

              {userUploadImageLoading ? (
                <MobileRemoveImageBtn>
                  <LoadingOutlined />
                </MobileRemoveImageBtn>
              ) : userImagePath.length > 0 ? (
                <MobileRemoveImageBtn onClick={handleRemoveImage}>사진 삭제</MobileRemoveImageBtn>
              ) : (
                <MobileImageBtn htmlFor="setting-image">사진 변경</MobileImageBtn>
              )}
            </div>

            {userUploadImageLoading ? (
              <LoadingOutlined />
            ) : userImagePath.length > 0 ? (
              <DeleteOutlined onClick={handleRemoveImage} />
            ) : (
              <label htmlFor="setting-image">
                <CameraOutlined />
              </label>
            )}

            <input type="file" id="setting-image" ref={fileInputRef} onChange={e => onFileChange(e, userImagePath)} />
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
