import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';

import useOverlays from 'utils/useOverlays';
import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { InitializeUserFollowInfoAction, followUserRequest, unFollowUserRequest } from 'store/actions/userAction';
import { formatFollowerCount } from 'utils/formatFollowerCount';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  UserActivityItem,
  UserActivityWrapper,
  UserInfoImage,
  UserInfoText,
  UserInfoWrapper
} from 'styles/User/userInfo';
import { initializeUserPosts, loadUserPostsRequest } from 'store/actions/postAction';

type InfoProps = {
  userId: number;
  selectedActivity: 'posts' | 'follower' | 'following';
  setSelectedActivity: (value: 'posts' | 'follower' | 'following') => void;
  followLoadingId: number | null;
  setFollowLoadingId: React.Dispatch<React.SetStateAction<number | null>>;
};

const UserInfo = ({
  userId,
  selectedActivity,
  setSelectedActivity,
  followLoadingId,
  setFollowLoadingId
}: InfoProps) => {
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const { me, userInfo } = useSelector((state: RootState) => state.user);

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  const handleActivity = useCallback(
    (info: 'posts' | 'follower' | 'following') => {
      if (selectedActivity === info) return;

      if (info === 'posts') {
        dispatch(initializeUserPosts());
        dispatch(loadUserPostsRequest(userId));
      }

      if (info === 'follower' || info === 'following') dispatch(InitializeUserFollowInfoAction());

      setSelectedActivity(info);
    },
    [selectedActivity]
  );

  const onToggleFollow = useCallback(
    (userId: number) => {
      setFollowLoadingId(userId);

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
          src={userInfo?.ProfileImage ? imgURL(userInfo.ProfileImage.src) : '/user.jpg'}
          alt="유저 프로필 배경 이미지"
          onClick={() => openImagePreview(userInfo?.ProfileImage ? `${userInfo.ProfileImage.src}` : '/user.jpg')}
        />
        <img
          src={userInfo?.ProfileImage ? imgURL(userInfo.ProfileImage.src) : '/user.jpg'}
          alt="유저 프로필 이미지"
          onClick={() => openImagePreview(userInfo?.ProfileImage ? `${userInfo.ProfileImage.src}` : '/user.jpg')}
        />
      </UserInfoImage>

      <UserInfoText $isFollowing={me.Followings.some((following: { id: number }) => following.id === userInfo?.id)}>
        <div>
          <h1>{userInfo?.nickname}</h1>

          {me.id !== userInfo?.id ? (
            <button type="button" onClick={() => onToggleFollow(userInfo.id)}>
              {followLoadingId === userInfo?.id ? (
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
    </UserInfoWrapper>
  );
};

export default UserInfo;
