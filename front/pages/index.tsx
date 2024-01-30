import React, { useCallback, useState } from 'react';

import MenuContents from 'components/Landing/MenuContents';
import { ContactIcon, HeaderWrapper, MenuButton } from 'styles/Landing/header';

const Landing = () => {
  const [selectMenu, setSelectMenu] = useState('home');

  const onClickMenu = useCallback((menu: string) => {
    setSelectMenu(menu);
  }, []);

  const onClickLogo = useCallback(() => {
    setSelectMenu('home');
  }, []);

  return (
    <>
      <HeaderWrapper>
        <img src="/logo.jpg" alt="Logo Image" onClick={onClickLogo} />

        <nav>
          <MenuButton type="button" onClick={() => onClickMenu('home')} selected={selectMenu === 'home'}>
            Home
          </MenuButton>
          <MenuButton type="button" onClick={() => onClickMenu('login')} selected={selectMenu === 'login'}>
            Login
          </MenuButton>
          <MenuButton type="button" onClick={() => onClickMenu('signup')} selected={selectMenu === 'signup'}>
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
