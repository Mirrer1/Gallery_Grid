import React, { useCallback } from 'react';

import useInput from 'utils/useInput';
import { useValidate } from 'utils/useValidate';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  SettingBtn,
  SettingFormWrapper,
  SettingIntro,
  SettingNickname,
  SettingRecommendation
} from 'styles/Settings/settingForm';

const SettingForm = () => {
  const [nickname, onChangeNickname] = useInput('');
  const [introText, onChangeIntroText] = useInput('');
  const [recommend, onChangeRecommend] = useInput(false);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nicknameRegex = /^[A-Za-z0-9가-힣]{2,16}$/;
      if (nickname && !useValidate(nickname, nicknameRegex, '닉네임 형식이 올바르지 않습니다.')) {
        return;
      }

      console.log(nickname, introText, recommend);
    },
    [nickname, introText, recommend]
  );

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
          maxLength={300}
          placeholder="본인을 나타낼 수 있는 소개말을 작성해보세요."
          value={introText}
          onChange={onChangeIntroText}
        />
        <div>{introText.length} / 300</div>
      </SettingIntro>

      <SettingRecommendation>
        <h3>프로필에 계정 추천 표시</h3>

        <div>
          <p>
            회원님의 계정이
            <br /> 다른 프로필에서 추천될 수 있는지를 선택하세요.
          </p>
          <input role="switch" type="checkbox" checked={recommend} onChange={onChangeRecommend} />
        </div>
      </SettingRecommendation>

      <SettingBtn>
        <button type="submit">Save Changes</button>
      </SettingBtn>
    </SettingFormWrapper>
  );
};

export default SettingForm;
