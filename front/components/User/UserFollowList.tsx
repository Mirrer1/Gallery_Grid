import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CloseCircleOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useScroll from 'utils/useScroll';
import useOverlays from 'utils/useOverlays';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { FollowUser } from 'store/types/userType';
import {
  InitializeUserFollowInfoAction,
  followUserRequest,
  loadUserFollowInfoRequest,
  unFollowUserRequest
} from 'store/actions/userAction';

import { slideInList } from 'styles/Common/animation';
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const { id: userId } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);
  const { me, userFollowInfo, loadUserFollowInfoLoading, loadUserFollowInfoDone } = useSelector(
    (state: RootState) => state.user
  );

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

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  useEffect(() => {
    if (typeof userId === 'string') {
      dispatch(loadUserFollowInfoRequest(followType, parseInt(userId, 10)));
    }
  }, [followType, userId, resetTrigger]);

  useEffect(() => {
    setKeyword('');
  }, [followType, userId]);

  useEffect(() => {
    if (window.innerWidth > 992) {
      inputRef.current?.focus();
    }
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
        <UserSearchLoading $isGridDisabled={false}>
          <LoadingOutlined />
        </UserSearchLoading>
      ) : loadUserFollowInfoDone && userFollowInfo.length === 0 ? (
        <NoSearchTextContainer $isGridDisabled={false}>
          {keyword ? (
            <p>검색 결과가 없습니다.</p>
          ) : followType === 'follower' ? (
            <p>No followers yet.</p>
          ) : (
            <p>Not following anyone yet.</p>
          )}
        </NoSearchTextContainer>
      ) : (
        <UserFollowListItemWrapper>
          {userFollowInfo.map((user: FollowUser) => (
            <UserFollowListItem
              key={user.id}
              $isFollowing={me.Followings.some((following: { id: number }) => following.id === user?.id)}
              {...slideInList}
            >
              <div>
                <img
                  src={user?.ProfileImage ? imgURL(user.ProfileImage.src) : '/user.jpg'}
                  alt="유저 프로필 이미지"
                  onClick={() => openImagePreview(user?.ProfileImage ? `${user.ProfileImage.src}` : '/user.jpg')}
                />
                <div>
                  <Link href={`/user/${user.id}`}>{user.nickname}</Link>
                  <p>{user?.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>
                  <div>
                    <p>{formatFollowerCount(user.followerCount)} followers</p>
                    {user.Followers.map(follower => (
                      <img
                        key={follower.id}
                        src={follower?.ProfileImage ? imgURL(follower.ProfileImage) : '/user.jpg'}
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
    </UserFollowListWrapper>
  );
};

export default UserFollowList;
