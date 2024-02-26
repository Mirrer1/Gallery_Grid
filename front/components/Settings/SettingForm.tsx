import React from 'react';

import useInput from 'utils/useInput';
import {
  SettingBtn,
  SettingFormWrapper,
  SettingIntro,
  SettingNickname,
  SettingRecommendation
} from 'styles/Settings/settingForm';

const SettingForm = () => {
  const [introText, onChangeIntroText] = useInput('');

  return (
    <SettingFormWrapper>
      <h2>Profile Settings</h2>

      <SettingNickname>
        <label htmlFor="nickname">닉네임 변경</label>
        <input type="text" id="nickname" placeholder="변경될 닉네임을 입력해주세요." />
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
          <input role="switch" type="checkbox" />
        </div>
      </SettingRecommendation>

      <SettingBtn>
        <button type="submit">Save Changes</button>
      </SettingBtn>
    </SettingFormWrapper>
  );
};

export default SettingForm;
