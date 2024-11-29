import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CloseCircleOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { backURL } from 'config';
import { RootState } from 'store/reducers';
import { FollowUser } from 'store/types/userType';
import {
  InitializeUserFollowInfoAction,
  followUserRequest,
  loadUserFollowInfoRequest,
  unFollowUserRequest
} from 'store/actions/userAction';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import ImagePreview from 'components/Modal/ImagePreviewModal';
import useImagePreview from 'utils/useImagePreview';
import useScroll from 'utils/useScroll';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  NoSearchTextContainer,
  UserFollowListItem,
  UserFollowListItemWrapper,
  UserFollowListWrapper,
  UserSearchLoading,
  UserSearchWrapper
} from 'styles/User/userFollowList';

type UserFollowProps = {
  type: 'follower' | 'following';
  setSelectedActivity: (value: 'posts' | 'follower' | 'following') => void;
  followLoadingId: number | null;
  setFollowLoadingId: React.Dispatch<React.SetStateAction<number | null>>;
};

const UserFollowList = ({
  type: followType,
  setSelectedActivity,
  followLoadingId,
  setFollowLoadingId
}: UserFollowProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id: userId } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const { me, userFollowInfo, loadUserFollowInfoLoading } = useSelector((state: RootState) => state.user);

  const [keyword, setKeyword] = useState('');
  const [resetTrigger, setResetTrigger] = useState(false);
  useScroll({ type: 'user-follow', ref: userContainerRef, userId: Number(userId), followType });

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setKeyword(value);

      dispatch(InitializeUserFollowInfoAction());
      dispatch(loadUserFollowInfoRequest(followType, parseInt(userId as string, 10), undefined, undefined, value));
    },
    [followType, userId]
  );

  const onClearKeyword = useCallback(() => {
    setKeyword('');
    dispatch(InitializeUserFollowInfoAction());
    setResetTrigger(prev => !prev);
  }, []);

  const onToggleFollow = useCallback(
    (userId: number) => {
      setFollowLoadingId(userId);

      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, userFollowInfo]
  );

  const onMoveUserProfile = useCallback(
    (id: number) => {
      if (Number(userId) === id) setSelectedActivity('posts');
      else router.push(`/user/${id}`);
    },
    [userFollowInfo]
  );

  useEffect(() => {
    if (typeof userId === 'string') {
      dispatch(loadUserFollowInfoRequest(followType, parseInt(userId, 10)));
    }
  }, [followType, userId, resetTrigger]);

  useEffect(() => {
    setKeyword('');
  }, [followType, userId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [followType, userId]);

  return (
    <UserFollowListWrapper key={followType} ref={userContainerRef}>
      <UserSearchWrapper>
        <label htmlFor="user-search">
          <SearchOutlined />
        </label>

        <input
          ref={inputRef}
          type="text"
          id="user-search"
          placeholder="Search"
          value={keyword}
          onChange={onChangeKeyword}
        />

        {keyword && <CloseCircleOutlined onClick={onClearKeyword} />}
      </UserSearchWrapper>

      {loadUserFollowInfoLoading && userFollowInfo.length < 20 ? (
        <UserSearchLoading>
          <LoadingOutlined />
        </UserSearchLoading>
      ) : userFollowInfo.length === 0 ? (
        <NoSearchTextContainer>
          {keyword ? (
            <p>검색 결과가 없습니다.</p>
          ) : followType === 'follower' ? (
            <p>No followers yet.</p>
          ) : (
            <p>Not following anyone yet.</p>
          )}
        </NoSearchTextContainer>
      ) : (
        <UserFollowListItemWrapper {...slideInFromBottom(0.3)}>
          {userFollowInfo.map((user: FollowUser) => (
            <UserFollowListItem
              key={user.id}
              $isFollowing={me.Followings.some((following: { id: number }) => following.id === user?.id)}
            >
              <div>
                <img
                  src={user?.ProfileImage ? `${backURL}/${user.ProfileImage.src}` : '/user.jpg'}
                  alt="유저 프로필 이미지"
                  onClick={() =>
                    showImagePreview(user?.ProfileImage ? `${backURL}/${user.ProfileImage.src}` : '/user.jpg')
                  }
                />
                <div>
                  <Link href={`/user/${user.id}`}>{user.nickname}</Link>
                  <p>{user?.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>
                  <div>
                    <p>{formatFollowerCount(user.followerCount)} followers</p>
                    {user.Followers.map(follower => (
                      <img
                        key={follower.id}
                        src={follower?.ProfileImage ? `${backURL}/${follower.ProfileImage}` : '/user.jpg'}
                        alt={`팔로워 ${follower.nickname}의 프로필 이미지`}
                        onClick={() => onMoveUserProfile(follower.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <button type="button" onClick={() => onToggleFollow(user.id)}>
                  {followLoadingId === user.id ? (
                    <LoadingOutlined />
                  ) : me.Followings.some((following: { id: number }) => following.id === user?.id) ? (
                    'Unfollow'
                  ) : (
                    'Follow'
                  )}
                </button>
              </div>
            </UserFollowListItem>
          ))}
        </UserFollowListItemWrapper>
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </UserFollowListWrapper>
  );
};

export default UserFollowList;
