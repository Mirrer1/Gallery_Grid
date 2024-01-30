import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined } from '@ant-design/icons';
import Router from 'next/router';

import useInput from 'utils/useInput';
import { BaseMenuProps } from 'types/MenuProps';
import { useValidate } from 'utils/useValidate';
import {
  AccountBtn,
  AccountDivider,
  AccountFooter,
  AccountForm,
  AccountGoogle,
  AccountInput,
  AccountWrapper,
  AccountAlert
} from 'styles/Landing/accountForm';

const SignUpForm = ({ onClickMenu }: BaseMenuProps) => {
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');

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

      console.log({ nickname, email, password });
      Router.push('/home');
    },
    [nickname, email, password, passwordCheck]
  );

  return (
    <AccountWrapper>
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
          <label>Confirm Password</label>
          <span></span>
        </AccountInput>

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
