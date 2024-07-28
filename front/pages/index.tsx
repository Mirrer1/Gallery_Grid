import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router from 'next/router';
import axios from 'axios';

import MenuContents from 'components/Landing/MenuContents';
import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { ContactIcon, HeaderWrapper, MenuButton } from 'styles/Landing/header';

const Landing = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const [selectMenu, setSelectMenu] = useState('home');

  const onClickMenu = useCallback((menu: string) => {
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
      <HeaderWrapper>
        <img src="/logo.jpg" alt="Logo Image" onClick={onClickLogo} />

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

        <button>
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
