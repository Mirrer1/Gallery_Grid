import React, { useCallback, useState } from 'react';

import Introduce from 'components/Landing/Introduce';
import LoginForm from 'components/Landing/LoginForm';
import SignUpForm from 'components/Landing/SignUpForm';
import { ContactIcon, HeaderWrapper, MenuButton } from 'styles/Landing/header';

const Landing = () => {
  const [selectMenu, setSelectMenu] = useState('home');

  const bestProduct = [
    { title: 'Product1', img: 'https://i.ibb.co/n70QqMG/drawing-series-by.jpg' },
    { title: 'Product2', img: 'https://i.ibb.co/BCsx9nZ/image.jpg' },
    { title: 'Product3', img: 'https://i.ibb.co/8bqzbyV/1.jpg' }
  ];

  const onClickMenu = useCallback((menu: string) => {
    setSelectMenu(menu);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <img src="/logo.jpg" alt="Logo Image" />

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

      {selectMenu === 'home' ? (
        <Introduce />
      ) : selectMenu === 'login' ? (
        <LoginForm />
      ) : selectMenu === 'signup' ? (
        <SignUpForm />
      ) : null}
    </>
  );
};

export default Landing;
