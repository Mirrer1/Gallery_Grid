import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router from 'next/router';
import axios from 'axios';

import PageHead from 'components/PageHead';
import wrapper from 'store/configureStore';
import useToastStatus from 'utils/useToast';
import MenuContents from 'components/Landing/MenuContents';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { loadBestPostsRequest } from 'store/actions/postAction';
import { ContactIcon, HeaderWrapper, MenuButton } from 'styles/Landing/header';

const Landing = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { timelinePosts } = useSelector((state: RootState) => state.post);
  const [selectMenu, setSelectMenu] = useState<'home' | 'login' | 'signup' | 'contact' | 'recovery'>('home');
  useToastStatus();

  const onClickMenu = useCallback((menu: 'home' | 'login' | 'signup' | 'contact' | 'recovery') => {
    setSelectMenu(menu);
  }, []);

  const onClickLogo = useCallback(() => {
    setSelectMenu('home');
  }, []);

  useEffect(() => {
    if (me) Router.replace('/timeline');
  }, [me]);

  return (
    <>
      <PageHead
        title="Gallery Grid"
        description="로그인, 회원가입, 비밀번호 복구 등 다양한 서비스를 이용하고 Gallery Grid에서 인기 게시글을 확인하세요."
        imageUrl={timelinePosts?.[0]?.Images?.[0]?.src}
        url="https://gallerygrd.com/"
      />

      <HeaderWrapper>
        <img src="/logo.jpg" alt="사이트 메인 로고 이미지" onClick={onClickLogo} />

        <nav>
          <MenuButton type="button" onClick={() => onClickMenu('home')} $selected={selectMenu === 'home'}>
            Home
          </MenuButton>
          <MenuButton type="button" onClick={() => onClickMenu('login')} $selected={selectMenu === 'login'}>
            Login
          </MenuButton>
          <MenuButton type="button" onClick={() => onClickMenu('signup')} $selected={selectMenu === 'signup'}>
            Signup
          </MenuButton>
        </nav>

        <button type="button" onClick={() => onClickMenu('contact')}>
          <ContactIcon />
        </button>
      </HeaderWrapper>

      <MenuContents selectMenu={selectMenu} onClickMenu={onClickMenu} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadBestPostsRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (me) {
    return {
      redirect: {
        destination: '/timeline',
        permanent: false
      }
    };
  }
});

export default Landing;
