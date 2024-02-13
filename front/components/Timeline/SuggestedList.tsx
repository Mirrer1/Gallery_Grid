import React from 'react';
import { UserAddOutlined } from '@ant-design/icons';

import { SuggestedHeader, SuggestedInfo, SuggestedWrapper } from 'styles/Timeline/suggestedList';

const SuggestedList = () => {
  const SuggestedUsers = [
    {
      nickname: 'user1',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      desc: '가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사'
    },
    {
      nickname: 'user2',
      profile: 'https://i.pinimg.com/564x/b1/bc/32/b1bc32636df7757cc51cf52a71a2a78f.jpg',
      desc: '가나다라마바사 amet consectetur adipisicing elit. Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.'
    },
    {
      nickname: 'user3',
      profile: 'https://i.pinimg.com/564x/e7/5b/41/e75b41ec9be4ff5303804a35466544e3.jpg',
      desc: 'Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.'
    }
  ];

  return (
    <SuggestedWrapper>
      <SuggestedHeader>
        <h1>Suggested people</h1>
      </SuggestedHeader>

      {SuggestedUsers.map((user, i) => (
        <SuggestedInfo key={i} $islast={i === SuggestedUsers.length - 1}>
          <img src={user.profile} alt={`${user.nickname}의 프로필 이미지`} />

          <div>
            <div>
              <h2>{user.nickname}</h2>
              <UserAddOutlined />
            </div>

            <p>{user.desc}</p>
          </div>
        </SuggestedInfo>
      ))}
    </SuggestedWrapper>
  );
};

export default SuggestedList;
