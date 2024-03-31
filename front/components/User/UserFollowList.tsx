import { SearchOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import useInput from 'utils/useInput';

type UserFollowProps = {
  type: 'follower' | 'following';
};

const UserFollowList = ({ type }: UserFollowProps) => {
  const list = [
    {
      id: 1,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user1',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 250,
      followerImg: [
        '	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
        '	https://i.pinimg.com/564x/b1/bc/32/b1bc32636df7757cc51cf52a71a2a78f.jpg'
      ]
    },
    {
      id: 2,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user2',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 120,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 3,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 22,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    }
  ];

  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(keyword);
      }
    },
    [keyword]
  );

  return (
    <section>
      <div>
        <label htmlFor="user-search">
          <SearchOutlined />
        </label>

        <input
          type="text"
          id="user-search"
          placeholder="Search"
          value={keyword}
          onChange={onChangeKeyword}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div>
        {list.map(user => (
          <div key={user.id}>
            <img src={user.profile} alt="유저 프로필 이미지" />

            <div>
              <h1>{user.nickname}</h1>
              <p>{user.desc}</p>

              <div>
                <img src={user.followerImg[0]} alt="유저 팔로워 이미지1" />
                <img src={user.followerImg[1]} alt="유저 팔로워 이미지2" />
                <p>{user.follower} followers</p>
              </div>
            </div>

            <button type="button">Follow</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserFollowList;
