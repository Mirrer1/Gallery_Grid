import React, { useCallback, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import useInput from 'utils/useInput';
import { MenuProps } from './MenuContents';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import { RootState } from 'store/reducers';

import { AccountBtn, AccountForm, AccountInput, AccountWrapper, AccountAlert } from 'styles/Landing/accountForm';
import {
  changePasswordRequest,
  checkCodeRequest,
  emailAuthRequest,
  initializeChangePassword
} from 'store/actions/mailAction';

const RecoveryForm = ({ selectMenu, onClickMenu }: MenuProps) => {
  const dispatch = useDispatch();
  const {
    emailAuthLoading,
    emailAuthDone,
    checkCodeLoading,
    checkCodeDone,
    changePasswordLoading,
    changePasswordDone
  } = useSelector((state: RootState) => state.mail);

  const [email, onChangeEmail] = useInput('');
  const [code, onChangeCode] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');

  const onSubmitChangePasswordForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^[A-Za-z\d]{8,16}$/;

      const isValid = useValidate(
        [
          { value: email, regex: emailRegex, fieldName: '이메일' },
          { value: password, regex: passwordRegex, fieldName: '비밀번호' },
          { value: passwordCheck, regex: passwordRegex, fieldName: '비밀번호' }
        ],
        [{ isValid: password === passwordCheck, errorMessage: '비밀번호가 일치하지 않습니다.' }]
      );

      if (!isValid) return;

      dispatch(changePasswordRequest(email, password));
    },
    [email, password, passwordCheck]
  );

  const handleEmailVerification = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = useValidate([{ value: email, regex: emailRegex, fieldName: '이메일' }]);

    if (!isValid) return;

    dispatch(emailAuthRequest(email));
  }, [email]);

  const handleVerifyCode = useCallback(() => {
    const codeRegex = /^[a-zA-Z0-9]{6}$/;
    const isValid = useValidate([{ value: code, regex: codeRegex, fieldName: '인증코드' }]);

    if (!isValid) return;

    dispatch(checkCodeRequest(email, code));
  }, [email, code]);

  useEffect(() => {
    dispatch(initializeChangePassword());
    if (changePasswordDone) onClickMenu('login');
  }, [selectMenu, changePasswordDone]);

  return (
    <AccountWrapper {...slideInFromBottom(0.3)}>
      <AccountForm onSubmit={onSubmitChangePasswordForm}>
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

            <AccountBtn $menu={selectMenu}>
              <button type="submit">
                {changePasswordLoading ? <LoadingOutlined /> : <>Recovery my password&nbsp;&nbsp;&nbsp;&nbsp;→</>}
              </button>
            </AccountBtn>
          </motion.div>
        )}
      </AccountForm>
    </AccountWrapper>
  );
};

export default RecoveryForm;
