import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'store/reducers';
import { FollowUser } from 'store/types/userType';
import { followUserRequest, loadUserFollowInfoRequest, unFollowUserRequest } from 'store/actions/userAction';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import useImagePreview from 'utils/useImagePreview';
import useInput from 'utils/useInput';
import ImagePreview from 'components/Modal/ImagePreviewModal';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  UserFollowListItem,
  UserFollowListItemWrapper,
  UserFollowListWrapper,
  UserSearchWrapper
} from 'styles/User/userFollowList';
import useScroll from 'utils/useScroll';

type UserFollowProps = {
  type: 'follower' | 'following';
};

const UserFollowList = ({ type: followType }: UserFollowProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id: userId } = router.query;
  const [keyword, onChangeKeyword] = useInput('');
  const userContainerRef = useRef<HTMLDivElement>(null);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const [followActionLoadingUserId, setFollowActionLoadingUserId] = useState<number | null>(null);
  const { me, userFollowInfo, followUserDone, unFollowUserDone } = useSelector((state: RootState) => state.user);
  useScroll({ type: 'user-follow', ref: userContainerRef, userId: Number(userId), followType });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(keyword);
      }
    },
    [keyword]
  );

  const onToggleFollow = useCallback(
    (userId: number) => {
      setFollowActionLoadingUserId(userId);

      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, userFollowInfo]
  );

  useEffect(() => {
    if (typeof userId === 'string') {
      dispatch(loadUserFollowInfoRequest(followType, parseInt(userId, 10)));
    }
  }, [followType, userId]);

  useEffect(() => {
    if (followUserDone || unFollowUserDone) setFollowActionLoadingUserId(null);
  }, [followUserDone, unFollowUserDone]);

  return (
    <UserFollowListWrapper key={followType} ref={userContainerRef} {...slideInFromBottom(0.3)}>
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
          onKeyDown={handleKeyDown}
        />
      </UserSearchWrapper>

      <UserFollowListItemWrapper>
        {userFollowInfo.map((user: FollowUser) => (
          <UserFollowListItem
            key={user.id}
            $isFollowing={me.Followings.some((following: { id: number }) => following.id === user?.id)}
          >
            <div>
              <img
                src={user?.ProfileImage ? `http://localhost:3065/${user.ProfileImage.src}` : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={() =>
                  showImagePreview(user?.ProfileImage ? `http://localhost:3065/${user.ProfileImage.src}` : '/user.jpg')
                }
              />

              <div>
                <h1>{user.nickname}</h1>
                <p>{user?.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>

                <div>
                  <p>{formatFollowerCount(user.followerCount)} followers</p>

                  {user.Followers.map(follower => (
                    <img
                      key={follower.id}
                      src={follower?.ProfileImage ? `http://localhost:3065/${follower.ProfileImage}` : '/user.jpg'}
                      alt={`팔로워 ${follower.nickname}의 프로필 이미지`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <button type="button" onClick={() => onToggleFollow(user.id)}>
                {followActionLoadingUserId === user.id ? (
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

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </UserFollowListWrapper>
  );
};

export default UserFollowList;
