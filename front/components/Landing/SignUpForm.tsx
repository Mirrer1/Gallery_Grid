import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import useInput from 'utils/useInput';
import { IMenuProps } from './MenuContents';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import { resetSignUpMessage, signUpRequest } from 'store/actions/userAction';
import { RootState } from 'store/reducers';

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

const SignUpForm = ({ selectMenu, onClickMenu }: IMenuProps) => {
  const dispatch = useDispatch();
  const { signUpMessage, signUpLoading } = useSelector((state: RootState) => state.user);

  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [term, onChangeTerm] = useInput(false);

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

      if (!term) {
        toast.warning('이용약관을 체크해주세요.');
        return;
      }

      dispatch(signUpRequest({ nickname, email, password }));
    },
    [nickname, email, password, passwordCheck, term]
  );

  useEffect(() => {
    const { message, type } = signUpMessage;

    if (message) {
      if (type === 'success') {
        toast.success(message);
        onMoveLogin();
      } else if (type === 'error') {
        toast.warning(message);
      }

      dispatch(resetSignUpMessage());
    }
  }, [signUpMessage]);

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
          <span />
        </AccountInput>
        <AccountAlert $login="false">2~16자 영문 대 소문자, 한글, 숫자를 사용하세요.</AccountAlert>

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
        <AccountAlert $login="false">8~16자 영문 대 소문자, 숫자를 사용하세요.</AccountAlert>

        <AccountInput $largemargin="true">
          <input type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
          <label>Confirm password</label>
          <span />
        </AccountInput>

        <AuthOptionsWrapper $menu={selectMenu}>
          <div>
            <input type="checkbox" id="terms-accepted" checked={term} onChange={onChangeTerm} />
            <label htmlFor="terms-accepted">개인정보 수집, 이용약관에 동의하십니까?</label>
          </div>
        </AuthOptionsWrapper>

        <AccountBtn $menu={selectMenu}>
          <button type="submit">
            {signUpLoading ? <LoadingOutlined /> : <>Create my account&nbsp;&nbsp;&nbsp;&nbsp;→</>}
          </button>
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
