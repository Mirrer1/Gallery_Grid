import React, { useCallback } from 'react';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  UserActivityItem,
  UserActivityWrapper,
  UserInfoDivider,
  UserInfoImage,
  UserInfoText,
  UserInfoWrapper
} from 'styles/User/userInfo';

type InfoProps = {
  selectedActivity: 'posts' | 'follower' | 'following';
  setSelectedActivity: (value: 'posts' | 'follower' | 'following') => void;
};

const UserInfo = ({ selectedActivity, setSelectedActivity }: InfoProps) => {
  const handleActivity = useCallback((info: 'posts' | 'follower' | 'following') => {
    setSelectedActivity(info);
  }, []);

  return (
    <UserInfoWrapper {...slideInFromBottom()}>
      <UserInfoImage>
        <img
          src="https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg"
          alt="큰 유저 프로필 이미지"
        />
        <img
          src="https://i.pinimg.com/564x/fc/9d/e8/fc9de80da08a4e4f57199ccc16228f2b.jpg"
          alt="작은 유저 프로필 이미지"
        />
      </UserInfoImage>

      <UserInfoText>
        <div>
          <h1>Lorem ipsum dolor</h1>
          <button type="button">Follow</button>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in.
        </p>
      </UserInfoText>

      <UserActivityWrapper>
        <UserActivityItem onClick={() => handleActivity('posts')} $selected={selectedActivity === 'posts'}>
          <h2>Total Post</h2>
          <p>286</p>
        </UserActivityItem>

        <UserInfoDivider></UserInfoDivider>

        <UserActivityItem onClick={() => handleActivity('follower')} $selected={selectedActivity === 'follower'}>
          <h2>Follower</h2>
          <p>286</p>
        </UserActivityItem>

        <UserInfoDivider></UserInfoDivider>

        <UserActivityItem onClick={() => handleActivity('following')} $selected={selectedActivity === 'following'}>
          <h2>Following</h2>
          <p>286</p>
        </UserActivityItem>
      </UserActivityWrapper>
    </UserInfoWrapper>
  );
};

export default UserInfo;
