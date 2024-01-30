import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined } from '@ant-design/icons';

import useInput from 'hooks/useInput';
import { BaseMenuProps } from 'types/MenuProps';
import {
  AccountBtn,
  AccountDivider,
  AccountFooter,
  AccountForm,
  AccountGoogle,
  AccountInput,
  AccountWrapper,
  AuthOptionsWrapper,
  PasswordAlert
} from 'styles/Landing/accountForm';

const LoginForm = ({ onClickMenu }: BaseMenuProps) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [rememberMe, onChangeRememberMe] = useInput(false);

  const onMoveSignup = useCallback(() => {
    onClickMenu('signup');
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^[A-Za-z\d]{8,16}$/;

      if (!emailRegex.test(email)) {
        toast.warning('이메일 형식이 올바르지 않습니다.');
        return;
      }

      if (!passwordRegex.test(password)) {
        toast.warning('비밀번호 형식이 올바르지 않습니다.');
        return;
      }

      console.log({ email, password, rememberMe });
    },
    [email, password, rememberMe]
  );

  return (
    <AccountWrapper>
      <AccountGoogle>
        <GoogleOutlined />
        <button type="button">Continue with Google</button>
      </AccountGoogle>

      <AccountDivider>OR LOGIN WITH EAMIL</AccountDivider>

      <AccountForm onSubmit={onSubmitForm}>
        <AccountInput $lastinput="false">
          <input type="text" value={email} onChange={onChangeEmail} required />
          <label>Email address</label>
          <span></span>
        </AccountInput>

        <AccountInput $lastinput="true">
          <input type="password" value={password} onChange={onChangePassword} required />
          <label>Password</label>
          <span></span>
        </AccountInput>

        <PasswordAlert>8~16자 영문 대 소문자, 숫자를 사용하세요.</PasswordAlert>

        <AuthOptionsWrapper>
          <div>
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={onChangeRememberMe} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="button">Forget your password?</button>
        </AuthOptionsWrapper>

        <AccountBtn>
          <button type="submit">Log in&nbsp;&nbsp;&nbsp;&nbsp;→</button>
        </AccountBtn>
      </AccountForm>

      <AccountFooter>
        <hr />
        <p>
          새로운 계정이 필요하신가요? <span onClick={onMoveSignup}>Sign up</span>
        </p>
      </AccountFooter>
    </AccountWrapper>
  );
};

export default LoginForm;
