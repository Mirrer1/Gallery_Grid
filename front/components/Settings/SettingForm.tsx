import React from 'react';

const SettingForm = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="profileImage">
            <img
              src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              alt="유저 프로필 이미지"
            />
            <input type="file" id="profileImage" />
          </label>

          <h2>User Nickname</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti beatae, numquam repudiandae molestiae
            eveniet maiores exercitationem odit, illum quae omnis iste pariatur explicabo aspernatur perferendis ipsam
            itaque doloremque veritatis, quod unde odio quis similique iusto. Ratione rem consequuntur, repudiandae
            tempore asperiores id, corporis blanditiis laboriosam, quod consequatur reiciendis praesentium voluptate
            dolor sunt. Aspernatur qui molestiae molestias quae itaque harum explicabo!
          </p>

          <label htmlFor="profileImage">사진 변경</label>
          <input type="file" id="profileImage" />
        </div>

        <div>
          <label htmlFor="nickname">닉네임 변경</label>
          <input type="text" id="nickname" placeholder="변경될 닉네임을 입력해주세요." />
        </div>

        <div>
          <label htmlFor="introText">소개</label>
          <textarea id="introText" rows={6} placeholder="본인을 나타낼 수 있는 소개말을 작성해보세요." />
        </div>

        <div>
          <h3>프로필에 계정 추천 표시</h3>
          <p>회원님의 계정이 다른 프로필에서 추천될 수 있는지를 선택하세요.</p>
          <input role="switch" type="checkbox" />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingForm;
