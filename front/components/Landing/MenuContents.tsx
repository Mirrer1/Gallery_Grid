import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import LandingCarousel from './LandingCarousel';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { slideInFromBottom } from 'styles/Common/animation';
import { ContentsText, ContentsWrapper, HeaderBreak } from 'styles/Landing/menuContents';

export type IMenuProps = {
  selectMenu: string;
  onClickMenu: (menu: string) => void;
};

const MenuContents = ({ selectMenu, onClickMenu }: IMenuProps) => {
  const onClickMore = useCallback(() => {
    toast.warning('로그인이 필요한 서비스입니다.');
    onClickMenu('login');
  }, []);

  return (
    <ContentsWrapper $selected={selectMenu}>
      <ContentsText key={selectMenu} {...slideInFromBottom()} $selected={selectMenu}>
        {selectMenu === 'home' ? (
          <div>
            <p>Work</p>
            <div />
            <p>1</p>
          </div>
        ) : selectMenu === 'login' ? (
          <div>
            <p>Login</p>
            <div />
            <p>2</p>
          </div>
        ) : selectMenu === 'signup' ? (
          <div>
            <p>Sign Up</p>
            <div />
            <p>3</p>
          </div>
        ) : null}

        {selectMenu === 'home' ? (
          <h1>
            Gallery&nbsp;
            <HeaderBreak $selected={selectMenu} />
            Grid
          </h1>
        ) : selectMenu === 'login' ? (
          <h1>
            Welcome&nbsp;
            <HeaderBreak $selected={selectMenu} />
            Back
          </h1>
        ) : selectMenu === 'signup' ? (
          <h1>
            Create&nbsp;Your&nbsp;
            <HeaderBreak $selected={selectMenu} />
            Future
          </h1>
        ) : null}

        {selectMenu === 'home' ? (
          <p>
            당신의 창의력을 펼쳐보세요. 여기가 바로 시작입니다.
            <br />
            예술가들의 커뮤니티에서 영감을 얻고, 당신의 작품을 세상과 공유하세요.
            <br />
            새로운 미술 세계를 경험하고, 무한한 가능성을 탐험해보세요.
          </p>
        ) : selectMenu === 'login' ? (
          <p>
            당신의 예술 여정을 다시 시작하세요.
            <br />
            Gallery Grid에서 영감을 공유하고 새로운 아이디어를 발견하세요.
          </p>
        ) : selectMenu === 'signup' ? (
          <p>
            창작의 세계에 오신 것을 환영합니다.
            <br />
            Gallery Grid에서 당신만의 예술을 선보이고, 무한한 영감을 얻으세요.
          </p>
        ) : null}

        {selectMenu === 'home' && (
          <button type="button" onClick={onClickMore}>
            MORE +
          </button>
        )}
      </ContentsText>

      {selectMenu === 'home' ? (
        <LandingCarousel />
      ) : selectMenu === 'login' ? (
        <LoginForm selectMenu={selectMenu} onClickMenu={onClickMenu} />
      ) : selectMenu === 'signup' ? (
        <SignUpForm selectMenu={selectMenu} onClickMenu={onClickMenu} />
      ) : null}
    </ContentsWrapper>
  );
};

export default MenuContents;
