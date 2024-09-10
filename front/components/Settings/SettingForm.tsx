import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import useInput from 'utils/useInput';
import { RootState } from 'store/reducers';
import { useValidate } from 'utils/useValidate';
import { editMyInfoRequest } from 'store/actions/userAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  SettingBtn,
  SettingFormWrapper,
  SettingIntro,
  SettingNickname,
  SettingRecommendation
} from 'styles/Settings/settingForm';

const SettingForm = () => {
  const dispatch = useDispatch();
  const { me, userImagePath, editMyInfoDone, editMyInfoLoading } = useSelector((state: RootState) => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [desc, onChangeDesc, setDesc] = useInput('');
  const [isRecommended, onChangeIsRecommended, setIsRecommended] = useInput(false);
  const [isChanged, setIsChanged] = useState(false);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isChanged) {
        toast.info('변경된 사항이 없습니다.');
        return;
      }

      if (!nickname.trim()) {
        toast.warning('닉네임을 입력해주세요.');
        return;
      }

      const nicknameRegex = /^[A-Za-z0-9가-힣]{2,16}$/;
      if (!nickname || !useValidate(nickname, nicknameRegex, '닉네임 형식이 올바르지 않습니다.')) {
        return;
      }

      const formData = new FormData();
      if (userImagePath.length > 0) {
        userImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('nickname', nickname);
      if (desc) formData.append('desc', desc);
      formData.append('isRecommended', isRecommended.toString());

      dispatch(editMyInfoRequest(formData));
    },
    [nickname, desc, isRecommended, userImagePath, isChanged]
  );

  useEffect(() => {
    const isUnchanged =
      nickname === me.nickname &&
      desc === me.desc &&
      isRecommended === me.isRecommended &&
      userImagePath.length > 0 &&
      userImagePath[0] === me?.ProfileImage?.src;

    setIsChanged(!isUnchanged);
  }, [nickname, desc, isRecommended, userImagePath, me]);

  useEffect(() => {
    setNickname(me.nickname);
    setDesc(me.desc);
    setIsRecommended(me.isRecommended);
  }, [editMyInfoDone]);

  return (
    <SettingFormWrapper onSubmit={onSubmitForm} {...slideInFromBottom(0.3)}>
      <h2>Profile Settings</h2>

      <SettingNickname>
        <label htmlFor="nickname">닉네임 변경</label>
        <input
          type="text"
          id="nickname"
          placeholder="변경될 닉네임을 입력해주세요."
          value={nickname}
          onChange={onChangeNickname}
        />
        <div>2~16자 영문 대 소문자, 한글, 숫자를 사용하세요.</div>
      </SettingNickname>

      <SettingIntro>
        <label htmlFor="introText">소개</label>
        <textarea
          id="introText"
          rows={3}
          maxLength={200}
          placeholder="더 많은 사람들이 당신을 알 수 있도록, 소개글을 작성해보세요."
          value={desc}
          onChange={onChangeDesc}
        />
        <div>{desc.length} / 200</div>
      </SettingIntro>

      <SettingRecommendation>
        <h3>프로필에 계정 추천 표시</h3>

        <div>
          <p>
            회원님의 계정이
            <br /> 다른 프로필에서 추천될 수 있는지를 선택하세요.
          </p>
          <input role="switch" type="checkbox" checked={isRecommended} onChange={onChangeIsRecommended} />
        </div>
      </SettingRecommendation>

      <SettingBtn $isChanged={isChanged}>
        <button type="submit">{editMyInfoLoading ? <LoadingOutlined /> : <>Save Changes</>}</button>
      </SettingBtn>
    </SettingFormWrapper>
  );
};

export default SettingForm;
