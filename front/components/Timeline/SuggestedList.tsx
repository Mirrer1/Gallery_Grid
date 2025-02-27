import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CaretDownOutlined,
  LoadingOutlined,
  SyncOutlined,
  UserAddOutlined,
  UserDeleteOutlined
} from '@ant-design/icons';
import Link from 'next/link';

import useOverlays from 'utils/useOverlays';
import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { FeaturedUser } from 'store/types/userType';
import { followUserRequest, loadSuggestUsersRequest, unFollowUserRequest } from 'store/actions/userAction';

import { suggestedItemAnimation, suggestedListAnimation } from 'styles/Common/animation';
import {
  SuggestedHeader,
  SuggestedInfo,
  SuggestedInfoWrapper,
  SuggestedOutsideArea,
  SuggestedWrapper
} from 'styles/Timeline/suggestedList';

type SuggestedProps = {
  suggestedListVisible: boolean;
  setSuggestedListVisible: (value: boolean) => void;
};

const SuggestedList = ({ suggestedListVisible, setSuggestedListVisible }: SuggestedProps) => {
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const [followActionLoadingUserId, setFollowActionLoadingUserId] = useState<number | null>(null);
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);
  const { me, suggestUsers, loadSuggestUsersLoading, followUserDone, unFollowUserDone } = useSelector(
    (state: RootState) => state.user
  );
  const hideSuggestedList = useCallback(() => {
    setSuggestedListVisible(false);
  }, [suggestedListVisible]);

  const onToggleFollow = useCallback(
    (userId: number) => {
      setFollowActionLoadingUserId(userId);

      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, suggestUsers]
  );

  const reloadSuggestUsers = useCallback(() => {
    const excludeIds = suggestUsers.map((user: FeaturedUser) => user.id);
    dispatch(loadSuggestUsersRequest(excludeIds));
  }, [suggestUsers]);

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  useEffect(() => {
    if (followUserDone || unFollowUserDone) setFollowActionLoadingUserId(null);
  }, [followUserDone, unFollowUserDone]);

  return (
    <>
      <SuggestedOutsideArea onClick={hideSuggestedList} $listvisible={suggestedListVisible} />

      <SuggestedWrapper $listvisible={suggestedListVisible} $commentvisible={isCommentListVisible}>
        <SuggestedHeader>
          <h1>Suggested people</h1>

          <div>
            <SyncOutlined onClick={reloadSuggestUsers} spin={loadSuggestUsersLoading} />
            <CaretDownOutlined onClick={hideSuggestedList} />
          </div>
        </SuggestedHeader>

        <SuggestedInfoWrapper {...suggestedListAnimation} key={JSON.stringify(suggestUsers)}>
          {suggestUsers?.map((user: FeaturedUser) => (
            <SuggestedInfo key={user.id} {...suggestedItemAnimation}>
              <div>
                <img
                  src={user?.ProfileImage ? imgURL(user.ProfileImage.src) : '/user.jpg'}
                  alt={`${user.nickname}의 프로필 이미지`}
                  onClick={() => openImagePreview(user?.ProfileImage ? `${user.ProfileImage.src}` : '/user.jpg')}
                />
              </div>

              <div>
                <div>
                  <Link href={`/user/${user.id}`}>{user.nickname}</Link>
                </div>

                <p>{user.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>
              </div>

              <div>
                {followActionLoadingUserId === user.id ? (
                  <LoadingOutlined />
                ) : me.Followings.some((following: { id: number }) => following.id === user.id) ? (
                  <UserDeleteOutlined onClick={() => onToggleFollow(user.id)} />
                ) : (
                  <UserAddOutlined onClick={() => onToggleFollow(user.id)} />
                )}
              </div>
            </SuggestedInfo>
          ))}
        </SuggestedInfoWrapper>
      </SuggestedWrapper>
    </>
  );
};

export default SuggestedList;
