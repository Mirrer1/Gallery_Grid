import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import useInput from 'utils/useInput';
import { MenuProps } from './MenuContents';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import { checkCodeRequest, emailAuthRequest, initializeChangePassword } from 'store/actions/mailAction';
import { loginGoogleRequest, resetSignUpMessage, signUpRequest } from 'store/actions/userAction';
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

const SignUpForm = ({ selectMenu, onClickMenu }: MenuProps) => {
  const dispatch = useDispatch();
  const { signUpMessage, signUpLoading, signUpDone, loginGoogleLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { emailAuthLoading, emailAuthDone, checkCodeLoading, checkCodeDone } = useSelector(
    (state: RootState) => state.mail
  );

  const [email, onChangeEmail] = useInput('');
  const [code, onChangeCode] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [term, onChangeTerm] = useInput(false);

  const onMoveLogin = useCallback(() => {
    onClickMenu('login');
  }, [onClickMenu]);

  const onClickGoogleLogin = useCallback(() => {
    dispatch(loginGoogleRequest());
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nicknameRegex = /^[A-Za-z0-9가-힣]{2,16}$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^[A-Za-z\d]{8,16}$/;

      const isValid = useValidate(
        [
          { value: nickname, regex: nicknameRegex, fieldName: '닉네임' },
          { value: email, regex: emailRegex, fieldName: '이메일' },
          { value: password, regex: passwordRegex, fieldName: '비밀번호' },
          { value: passwordCheck, regex: passwordRegex, fieldName: '비밀번호' }
        ],
        [
          { isValid: password === passwordCheck, errorMessage: '비밀번호가 일치하지 않습니다.' },
          { isValid: term, errorMessage: '이용약관을 체크해주세요.' }
        ]
      );

      if (!isValid) return;

      dispatch(signUpRequest({ nickname, email, password }));
    },
    [nickname, email, password, passwordCheck, term]
  );

  const handleEmailVerification = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = useValidate([{ value: email, regex: emailRegex, fieldName: '이메일' }]);

    if (!isValid) return;

    dispatch(emailAuthRequest('signup', email));
  }, [email]);

  const handleVerifyCode = useCallback(() => {
    const codeRegex = /^[a-zA-Z0-9]{6}$/;
    const isValid = useValidate([{ value: code, regex: codeRegex, fieldName: '인증코드' }]);

    if (!isValid) return;

    dispatch(checkCodeRequest(email, code));
  }, [email, code]);

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

  useEffect(() => {
    dispatch(initializeChangePassword());
  }, [selectMenu, signUpDone]);

  return (
    <AccountWrapper {...slideInFromBottom(0.3)}>
      <AccountGoogle onClick={onClickGoogleLogin}>
        {!loginGoogleLoading && <GoogleOutlined />}
        <button type="button">{loginGoogleLoading ? <LoadingOutlined /> : <>Continue with Google</>}</button>
      </AccountGoogle>

      <AccountDivider>OR SIGNUP WITH EAMIL</AccountDivider>

      <AccountForm onSubmit={onSubmitForm}>
        <AccountInput $largemargin="true">
          <input
            type="text"
            value={email}
            onChange={onChangeEmail}
            maxLength={50}
            readOnly={emailAuthDone && checkCodeDone}
            required
          />
          <label>Email address</label>
          <span />
          <button type="button" onClick={handleEmailVerification} disabled={emailAuthDone && checkCodeDone}>
            {emailAuthLoading ? <LoadingOutlined /> : emailAuthDone ? <>재전송</> : <>인증메일 발송</>}
          </button>
        </AccountInput>

        {emailAuthDone && !checkCodeDone && (
          <AccountInput $largemargin="true" {...slideInFromBottom()}>
            <input type="text" value={code} onChange={onChangeCode} maxLength={6} required />
            <label>Verification Code</label>
            <span />
            <button type="button" onClick={handleVerifyCode} disabled={checkCodeDone}>
              {checkCodeLoading ? <LoadingOutlined /> : <>이메일 인증</>}
            </button>
          </AccountInput>
        )}

        {checkCodeDone && (
          <motion.div {...slideInFromBottom()}>
            <AccountInput $largemargin="false">
              <input type="text" value={nickname} onChange={onChangeNickname} required />
              <label>User name</label>
              <span />
            </AccountInput>
            <AccountAlert $login="false">2~16자 영문 대 소문자, 한글, 숫자를 사용하세요.</AccountAlert>

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
          </motion.div>
        )}
      </AccountForm>

      <AccountFooter>
        <hr />
        <p>
          이미 계정이 있으신가요? <span onClick={onMoveLogin}> Log in</span>
        </p>
      </AccountFooter>
    </AccountWrapper>
  );
};

export default SignUpForm;
