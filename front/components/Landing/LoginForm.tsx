import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import useInput from 'utils/useInput';
import { IMenuProps } from './MenuContents';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import { loginGoogleRequest, loginRequest, resetLoginMessage } from 'store/actions/userAction';
import { RootState } from 'store/reducers';
import {
  AccountBtn,
  AccountDivider,
  AccountFooter,
  AccountForm,
  AccountGoogle,
  AccountInput,
  AccountWrapper,
  AuthOptionsWrapper,
  AccountAlert
} from 'styles/Landing/accountForm';

const LoginForm = ({ selectMenu, onClickMenu }: IMenuProps) => {
  const dispatch = useDispatch();
  const { loginLoading, loginError, loginGoogleLoading } = useSelector((state: RootState) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onMoveSignup = useCallback(() => {
    onClickMenu('signup');
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^[A-Za-z\d]{8,16}$/;

      if (
        !useValidate(email, emailRegex, '이메일 형식이 올바르지 않습니다.') ||
        !useValidate(password, passwordRegex, '비밀번호 형식이 올바르지 않습니다.')
      ) {
        return;
      }

      dispatch(loginRequest({ email, password }));
    },
    [email, password]
  );

  const onClickGoogleLogin = useCallback(() => {
    dispatch(loginGoogleRequest());
  }, []);

  useEffect(() => {
    if (loginError) {
      toast.warning(loginError);
      dispatch(resetLoginMessage());
    }
  }, [loginError]);

  return (
    <AccountWrapper {...slideInFromBottom(0.3)}>
      <AccountGoogle onClick={onClickGoogleLogin}>
        {!loginGoogleLoading && <GoogleOutlined />}
        <button type="button">{loginGoogleLoading ? <LoadingOutlined /> : <>Continue with Google</>}</button>
      </AccountGoogle>

      <AccountDivider>OR LOGIN WITH EAMIL</AccountDivider>

      <AccountForm onSubmit={onSubmitForm}>
        <AccountInput $largemargin="true">
          <input type="text" value={email} onChange={onChangeEmail} required />
          <label>Email address</label>
          <span />
        </AccountInput>

        <AccountInput $largemargin="false">
          <input type="password" value={password} onChange={onChangePassword} required />
          <label>Password</label>
          <span />
        </AccountInput>
        <AccountAlert $login="true">8~16자 영문 대 소문자, 숫자를 사용하세요.</AccountAlert>

        <AuthOptionsWrapper $menu={selectMenu}>
          <button type="button">Forget your password?</button>
        </AuthOptionsWrapper>

        <AccountBtn $menu={selectMenu}>
          <button type="submit">{loginLoading ? <LoadingOutlined /> : <>Log in&nbsp;&nbsp;&nbsp;&nbsp;→</>}</button>
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
