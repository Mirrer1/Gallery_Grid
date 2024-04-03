import React, { useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  UserFollowListItem,
  UserFollowListItemWrapper,
  UserFollowListWrapper,
  UserSearchWrapper
} from 'styles/User/userFollowList';

type UserFollowProps = {
  type: 'follower' | 'following';
};

const UserFollowList = ({ type }: UserFollowProps) => {
  const list = [
    {
      id: 1,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user1',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipi ipsum dolor sit amet consectetur, adip ipsum dolor sit amet consectetur, adip ipsum dolor sit amet consectetur, adipsicing elit. Blanditiis, placeat.',
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
      follower: 124342320,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 3,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 22342342,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 4,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 22342342,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 5,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 23,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 6,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 234637,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 7,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 423144123,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 8,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 123412431243124,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 9,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 12341234423,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 10,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 34,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 11,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 123,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 12,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 1252367237237,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 13,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 212342341234132,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 14,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 2345,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 15,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 5345,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 16,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 33,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 17,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 2123345132,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 18,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user4',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 345,
      followerImg: ['	https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg']
    },
    {
      id: 19,
      profile: 'https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg',
      nickname: 'user3',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, placeat.',
      follower: 2,
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
    <UserFollowListWrapper key={type} {...slideInFromBottom(0.3)}>
      <UserSearchWrapper>
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
      </UserSearchWrapper>

      <UserFollowListItemWrapper>
        {list.map(user => (
          <UserFollowListItem key={user.id}>
            <div>
              <img src={user.profile} alt="유저 프로필 이미지" />

              <div>
                <h1>{user.nickname}</h1>
                <p>{user.desc}</p>

                <div>
                  <img src={user.followerImg[0]} alt="유저 팔로워 이미지1" />
                  <img src={user.followerImg[1]} alt="유저 팔로워 이미지2" />
                  <p>{formatFollowerCount(user.follower)} followers</p>
                </div>
              </div>
            </div>

            <div>
              <button type="button">Follow</button>
            </div>
          </UserFollowListItem>
        ))}
      </UserFollowListItemWrapper>
    </UserFollowListWrapper>
  );
};

export default UserFollowList;
