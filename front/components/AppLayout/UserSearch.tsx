import React, { useCallback, useEffect, useState } from 'react';
import { LoadingOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import formatDate from 'utils/useListTimes';
import useImagePreview from 'utils/useImagePreview';
import { RootState } from 'store/reducers';
import { SearchProps } from './Search';
import { SearchUsers } from 'store/types/userType';
import { followUserRequest, unFollowUserRequest } from 'store/actions/userAction';

import { slideInList } from 'styles/Common/animation';
import {
  NoSearchUserContainer,
  UserBio,
  UserProfileWrapper,
  UserSearchContainer,
  UserSearchContent,
  UserSearchDivider,
  UserStatsWrapper
} from 'styles/AppLayout/userSearch';

const UserSearch = ({ keyword }: SearchProps) => {
  const dispatch = useDispatch();
  const { me, searchUsers, followUserDone, unFollowUserDone, searchUsersLoading, searchUsersDone } = useSelector(
    (state: RootState) => state.user
  );
  const [followingUserId, setFollowingUserId] = useState<number | null>(null);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();

  const onToggleFollow = useCallback(
    (userId: number) => {
      setFollowingUserId(userId);

      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, searchUsers]
  );

  useEffect(() => {
    if (followUserDone || unFollowUserDone) setFollowingUserId(null);
  }, [followUserDone, unFollowUserDone]);
  return (
    <>
      {searchUsersLoading && (
        <NoSearchUserContainer>
          <LoadingOutlined />
        </NoSearchUserContainer>
      )}

      {!searchUsersLoading && searchUsers.length === 0 && searchUsersDone && (
        <NoSearchUserContainer>
          <p>&quot;{keyword}&quot;에 대한 유저검색 결과가 없습니다.</p>
        </NoSearchUserContainer>
      )}

      {searchUsers.map((user: SearchUsers) => (
        <UserSearchContainer key={user.id} {...slideInList}>
          <UserSearchContent>
            <UserProfileWrapper>
              <img
                src={user?.ProfileImage ? `http://localhost:3065/${user.ProfileImage.src}` : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={() =>
                  showImagePreview(user?.ProfileImage ? `http://localhost:3065/${user.ProfileImage.src}` : '/user.jpg')
                }
              />
              <p>{user.nickname}</p>
            </UserProfileWrapper>

            <UserBio>
              <p>{user.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>

              {me.id !== user.id && (
                <div onClick={() => onToggleFollow(user.id)}>
                  {followingUserId === user.id ? (
                    <LoadingOutlined />
                  ) : me.Followings.some((following: { id: number }) => following.id === user.id) ? (
                    <UserDeleteOutlined />
                  ) : (
                    <UserAddOutlined />
                  )}
                </div>
              )}
            </UserBio>

            <UserSearchDivider />

            <UserStatsWrapper>
              <div>
                <div>
                  <span>{user.followerCount.toLocaleString()}</span>
                  <p>Followers</p>
                </div>

                <div>
                  <span>{user.followingCount.toLocaleString()}</span>
                  <p>Followings</p>
                </div>
              </div>

              {user.Posts.length > 0 && (
                <div>
                  <img
                    src={`http://localhost:3065/${user.Posts[0].Images[0].src}`}
                    alt="게시글의 첫번째 이미지"
                    onClick={() => showImagePreview(`http://localhost:3065/${user.Posts[0].Images[0].src}`)}
                  />

                  <p>{user.Posts[0].content}</p>
                  <time>{formatDate(user.Posts[0].createdAt)}</time>
                </div>
              )}
            </UserStatsWrapper>
          </UserSearchContent>
        </UserSearchContainer>
      ))}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </>
  );
};

export default UserSearch;
