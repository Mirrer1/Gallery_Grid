import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import MenuContents from 'components/Landing/MenuContents';
import { RootState } from 'store/reducers';
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

  // if (me) return null;

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

export default Landing;
