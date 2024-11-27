import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import LandingCarousel from './LandingCarousel';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ContactForm from './ContactForm';
import RecoveryForm from './RecoveryForm';

import { slideInFromBottom } from 'styles/Common/animation';
import { ContentsText, ContentsWrapper, HeaderBreak } from 'styles/Landing/menuContents';

export type MenuProps = {
  selectMenu: 'home' | 'login' | 'signup' | 'contact' | 'recovery';
  onClickMenu: (menu: 'home' | 'login' | 'signup' | 'contact' | 'recovery') => void;
};

const MenuContents = ({ selectMenu, onClickMenu }: MenuProps) => {
  const onClickMore = useCallback(() => {
    toast.warning('로그인이 필요한 서비스입니다.');
    onClickMenu('login');
  }, [onClickMenu]);

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
        ) : selectMenu === 'contact' ? (
          <div>
            <p>Contact</p>
            <div />
            <p>4</p>
          </div>
        ) : selectMenu === 'recovery' ? (
          <div>
            <p>Password Recovery</p>
            <div />
            <p>5</p>
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
        ) : selectMenu === 'contact' ? (
          <h1>
            Get&nbsp;In&nbsp;
            <HeaderBreak $selected={selectMenu} />
            Touch
          </h1>
        ) : selectMenu === 'recovery' ? (
          <h1>
            Password&nbsp;
            <HeaderBreak $selected={selectMenu} />
            Recovery
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
        ) : selectMenu === 'contact' ? (
          <p>
            문의 사항이 있으신가요? 언제든지 연락주세요.
            <br />
            Gallery Grid 팀이 빠르게 답변을 드리겠습니다.
            <br />
            여러분의 소중한 의견을 기다립니다.
          </p>
        ) : selectMenu === 'recovery' ? (
          <p>
            비밀번호를 잊으셨나요? 걱정하지 마세요.
            <br />
            아래의 안내를 따라 비밀번호를 재설정하세요.
            <br />
            Gallery Grid에서 다시 창작의 세계로 돌아오세요.
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
      ) : selectMenu === 'contact' ? (
        <ContactForm selectMenu={selectMenu} onClickMenu={onClickMenu} />
      ) : selectMenu === 'recovery' ? (
        <RecoveryForm selectMenu={selectMenu} onClickMenu={onClickMenu} />
      ) : null}
    </ContentsWrapper>
  );
};

export default MenuContents;
