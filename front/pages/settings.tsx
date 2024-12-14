import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CameraOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import SettingForm from 'components/Settings/SettingForm';
import { PageHead, SeoProps } from 'components/PageHead';
import useFileUpload from 'utils/useFileUpload';
import useToastStatus from 'utils/useToast';
import { imgURL } from 'config';

import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import {
  executeUserEdit,
  loadMyInfoRequest,
  userRemoveUploadedImage,
  userUploadImageRequest
} from 'store/actions/userAction';

import { slideInFromBottom } from 'styles/Common/animation';
import { MobileImageBtn, MobileRemoveImageBtn, SettingProfile, SettingWrapper } from 'styles/Settings';

const Settings = ({ seo }: { seo: SeoProps }) => {
  const dispatch = useDispatch();
  const { me, userImagePath, userUploadImageLoading } = useSelector((state: RootState) => state.user);
  const { fileInputRef, onFileChange } = useFileUpload(userUploadImageRequest, { showWarning: false });
  useToastStatus();

  const handleRemoveImage = useCallback(() => {
    dispatch(userRemoveUploadedImage());
  }, []);

  return (
    <>
      <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />

      <AppLayout>
        <SettingWrapper>
          <SettingProfile {...slideInFromBottom()} $loading={userUploadImageLoading}>
            <label htmlFor="setting-image">
              <img src={userImagePath.length > 0 ? imgURL(userImagePath) : '/user.jpg'} alt="유저 프로필 이미지" />
            </label>

            <div>
              <h1>{me?.nickname}</h1>
              {me?.desc ? <p>{me.desc}</p> : <p>더 많은 사람들이 당신을 알 수 있도록, 소개글을 작성해보세요.</p>}

              <MobileImageBtn htmlFor="setting-image">
                {userUploadImageLoading ? <LoadingOutlined /> : <>사진 변경</>}
              </MobileImageBtn>
              <MobileRemoveImageBtn onClick={handleRemoveImage}>사진 삭제</MobileRemoveImageBtn>
            </div>

            <div>
              <label htmlFor="setting-image">{userUploadImageLoading ? <LoadingOutlined /> : <CameraOutlined />}</label>
              <DeleteOutlined onClick={handleRemoveImage} />
            </div>

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
  axios.defaults.headers.Cookie = cookie || '';

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();
  context.store.dispatch(executeUserEdit());

  const state = context.store.getState();
  const { me } = state.user;

  const seo = {
    title: `Gallery Grid | ${me?.nickname || '사용자'}'s Settings`,
    description: `${me?.nickname || '사용자'}님의 프로필을 수정하고 정보를 업데이트하세요. Gallery Grid에서 나만의 프로필을 완성해보세요.`,
    imageUrl: me?.ProfileImage?.src || 'https://gallerygrd.com/favicon.ico',
    url: 'https://gallerygrd.com/settings'
  };

  return {
    props: {
      seo
    }
  };
});

export default Settings;
