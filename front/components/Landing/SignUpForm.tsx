import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined } from '@ant-design/icons';
import Router from 'next/router';

import useInput from 'utils/useInput';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  AccountBtn,
  AccountDivider,
  AccountFooter,
  AccountForm,
  AccountGoogle,
  AccountInput,
  AccountWrapper,
  AccountAlert,
  AuthOptionsWrapper
} from 'styles/Landing/accountForm';

type IMenuProps = {
  selectMenu: string;
  onClickMenu: (menu: string) => void;
};

const SignUpForm = ({ selectMenu, onClickMenu }: IMenuProps) => {
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [termsAccepted, onChangeTermsAccepted] = useInput(false);

  const onMoveLogin = useCallback(() => {
    onClickMenu('login');
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nicknameRegex = /^[A-Za-z0-9가-힣]{2,16}$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^[A-Za-z\d]{8,16}$/;

      if (
        !useValidate(nickname, nicknameRegex, '닉네임 형식이 올바르지 않습니다.') ||
        !useValidate(email, emailRegex, '이메일 형식이 올바르지 않습니다.') ||
        !useValidate(password, passwordRegex, '비밀번호 형식이 올바르지 않습니다.')
      ) {
        return;
      }

      if (password !== passwordCheck) {
        toast.warning('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!termsAccepted) {
        toast.warning('이용약관을 체크해주세요.');
        return;
      }

      console.log({ nickname, email, password });
      Router.push('/timeline');
    },
    [nickname, email, password, passwordCheck, termsAccepted]
  );

  return (
    <AccountWrapper {...slideInFromBottom()}>
      <AccountGoogle>
        <GoogleOutlined />
        <button type="button">Continue with Google</button>
      </AccountGoogle>

      <AccountDivider>OR SIGNUP WITH EAMIL</AccountDivider>

      <AccountForm onSubmit={onSubmitForm}>
        <AccountInput $largemargin="false">
          <input type="text" value={nickname} onChange={onChangeNickname} required />
          <label>User name</label>
          <span></span>
        </AccountInput>
        <AccountAlert $login="false">2~16자 영문 대 소문자, 한글, 숫자를 사용하세요.</AccountAlert>

        <AccountInput $largemargin="true">
          <input type="text" value={email} onChange={onChangeEmail} required />
          <label>Email address</label>
          <span></span>
        </AccountInput>

        <AccountInput $largemargin="false">
          <input type="password" value={password} onChange={onChangePassword} required />
          <label>Password</label>
          <span></span>
        </AccountInput>
        <AccountAlert $login="false">8~16자 영문 대 소문자, 숫자를 사용하세요.</AccountAlert>

        <AccountInput $largemargin="true">
          <input type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
          <label>Confirm password</label>
          <span></span>
        </AccountInput>

        <AuthOptionsWrapper $menu={selectMenu}>
          <div>
            <input type="checkbox" id="terms-accepted" checked={termsAccepted} onChange={onChangeTermsAccepted} />
            <label htmlFor="terms-accepted">개인정보 수집, 이용약관에 동의하십니까?</label>
          </div>
        </AuthOptionsWrapper>

        <AccountBtn>
          <button type="submit">Create my account&nbsp;&nbsp;&nbsp;&nbsp;→</button>
        </AccountBtn>
      </AccountForm>

      <AccountFooter>
        <hr />
        <p>
          이미 계정이 있으신가요? <span onClick={onMoveLogin}>Log in</span>
        </p>
      </AccountFooter>
    </AccountWrapper>
  );
};

export default SignUpForm;
