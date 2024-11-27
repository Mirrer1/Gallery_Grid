import React, { useCallback, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useInput from 'utils/useInput';
import { RootState } from 'store/reducers';
import { MenuProps } from './MenuContents';
import { useValidate } from 'utils/useValidate';
import { contactRequest, initializeContact } from 'store/actions/mailAction';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  AccountBtn,
  AccountForm,
  AccountInput,
  AccountWrapper,
  AccountAlert,
  AccountTextarea,
  TextAlert
} from 'styles/Landing/accountForm';

const ContactForm = ({ selectMenu, onClickMenu }: MenuProps) => {
  const dispatch = useDispatch();
  const { contactDone, contactLoading } = useSelector((state: RootState) => state.mail);

  const [sender, onChangeSender] = useInput('');
  const [content, onChangeContent] = useInput('');

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isValid = useValidate([{ value: sender, regex: emailRegex, fieldName: '이메일' }]);

      if (!isValid) return;

      dispatch(contactRequest(sender, content));
    },
    [sender, content]
  );

  useEffect(() => {
    if (content.length === 1000) toast.warning('메일의 내용은 1000자 이하로 작성해주세요.');
  }, [content]);

  useEffect(() => {
    if (contactDone) {
      onClickMenu('home');
      dispatch(initializeContact());
    }
  }, [contactDone]);

  return (
    <AccountWrapper {...slideInFromBottom(0.3)}>
      <AccountForm onSubmit={onSubmitForm}>
        <AccountInput $largemargin="false">
          <input type="text" value={sender} onChange={onChangeSender} required />
          <label>Sender Email</label>
          <span />
        </AccountInput>
        <AccountAlert $login="false">보내는 사람의 이메일 주소를 입력하세요.</AccountAlert>

        <AccountTextarea>
          <textarea value={content} onChange={onChangeContent} maxLength={1000} required />
          <label>Mail Content</label>
          <span />
        </AccountTextarea>
        <TextAlert>{content.length} / 1000</TextAlert>

        <AccountBtn $menu={selectMenu}>
          <button type="submit">
            {contactLoading ? <LoadingOutlined /> : <>Send mail&nbsp;&nbsp;&nbsp;&nbsp;→</>}
          </button>
        </AccountBtn>
      </AccountForm>
    </AccountWrapper>
  );
};

export default ContactForm;
