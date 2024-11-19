import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { RootState } from 'store/reducers';
import { followUserRequest, unFollowUserRequest } from 'store/actions/userAction';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import useImagePreview from 'utils/useImagePreview';
import ImagePreview from 'components/Modal/ImagePreviewModal';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  UserActivityItem,
  UserActivityWrapper,
  UserInfoImage,
  UserInfoText,
  UserInfoWrapper
} from 'styles/User/userInfo';
import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';

type InfoProps = {
  selectedActivity: 'posts' | 'follower' | 'following';
  setSelectedActivity: (value: 'posts' | 'follower' | 'following') => void;
};

const UserInfo = ({ selectedActivity, setSelectedActivity }: InfoProps) => {
  const dispatch = useDispatch();
  const { me, userInfo, followUserLoading, unFollowUserLoading } = useSelector((state: RootState) => state.user);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();

  const handleActivity = useCallback((info: 'posts' | 'follower' | 'following') => {
    setSelectedActivity(info);
  }, []);

  const onToggleFollow = useCallback(
    (userId: number) => {
      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, userInfo]
  );

  return (
    <UserInfoWrapper {...slideInFromBottom()}>
      <UserInfoImage>
        <img
          src={userInfo?.ProfileImage ? `http://localhost:3065/${userInfo.ProfileImage.src}` : '/user.jpg'}
          alt="유저 프로필 배경 이미지"
          onClick={() =>
            showImagePreview(
              userInfo?.ProfileImage ? `http://localhost:3065/${userInfo.ProfileImage.src}` : '/user.jpg'
            )
          }
        />
        <img
          src={userInfo?.ProfileImage ? `http://localhost:3065/${userInfo.ProfileImage.src}` : '/user.jpg'}
          alt="유저 프로필 이미지"
          onClick={() =>
            showImagePreview(
              userInfo?.ProfileImage ? `http://localhost:3065/${userInfo.ProfileImage.src}` : '/user.jpg'
            )
          }
        />
      </UserInfoImage>

      <UserInfoText $isFollowing={me.Followings.some((following: { id: number }) => following.id === userInfo?.id)}>
        <div>
          <h1>{userInfo?.nickname}</h1>

          {me.id !== userInfo?.id ? (
            <button type="button" onClick={() => onToggleFollow(userInfo.id)}>
              {followUserLoading || unFollowUserLoading ? (
                <LoadingOutlined />
              ) : me.Followings.some((following: { id: number }) => following.id === userInfo?.id) ? (
                'Unfollow'
              ) : (
                'Follow'
              )}
            </button>
          ) : (
            <Link href="/settings">
              <SettingOutlined />
            </Link>
          )}
        </div>

        <p>{userInfo?.desc?.trim() ? userInfo.desc : '소개글이 없습니다.'}</p>
      </UserInfoText>

      <UserActivityWrapper>
        <UserActivityItem onClick={() => handleActivity('posts')} $selected={selectedActivity === 'posts'}>
          <h2>Total Post</h2>
          <p>{userInfo?.postsCount.toLocaleString()}</p>
        </UserActivityItem>

        <UserActivityItem onClick={() => handleActivity('follower')} $selected={selectedActivity === 'follower'}>
          <h2>Follower</h2>
          <p>{formatFollowerCount(userInfo?.followersCount)}</p>
        </UserActivityItem>

        <UserActivityItem onClick={() => handleActivity('following')} $selected={selectedActivity === 'following'}>
          <h2>Following</h2>
          <p>{formatFollowerCount(userInfo?.followingsCount)}</p>
        </UserActivityItem>
      </UserActivityWrapper>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </UserInfoWrapper>
  );
};

export default UserInfo;
