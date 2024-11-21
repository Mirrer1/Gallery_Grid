import React, { useCallback, useState } from 'react';
import { CaretLeftOutlined, CaretRightOutlined, CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';

import { RootState } from 'store/reducers';
import { FeaturedUser } from 'store/types/userType';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import { PopularBtn, PopularOptions, PopularUserContents, PopularUserWrapper } from 'styles/Timeline/popularUser';

const PopularUser = () => {
  const { bestUsers } = useSelector((state: RootState) => state.user);
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);
  const [curr, setCurr] = useState(0);

  const next = useCallback(() => {
    const newCurr = curr === bestUsers?.length - 1 ? 0 : curr + 1;
    setCurr(newCurr);
  }, [curr]);

  const prev = useCallback(() => {
    const newCurr = curr === 0 ? bestUsers?.length - 1 : curr - 1;
    setCurr(newCurr);
  }, [curr]);

  const onMoveUserProfile = useCallback(
    (userId: number) => {
      const isTabletOrMobile = window.innerWidth <= 992;
      if (isTabletOrMobile) {
        Router.push(`/user/${userId}`);
      }
    },
    [bestUsers]
  );

  return (
    <PopularUserWrapper $commentvisible={isCommentListVisible}>
      <div style={{ transform: `translateX(-${curr * 100}%)` }}>
        {bestUsers?.map((user: FeaturedUser) => (
          <div key={user.id} onClick={() => onMoveUserProfile(user.id)}>
            <img
              src={user?.ProfileImage ? `http://localhost:3065/${user.ProfileImage.src}` : '/user.jpg'}
              alt={`${user.nickname}의 프로필 이미지`}
            />

            <PopularUserContents>
              <div>
                <div>Popular</div>
                <Link href={`/user/${user.id}`}>{user.nickname}</Link>
                <p>{user.desc?.trim() ? user.desc : '소개글이 없습니다.'}</p>
              </div>

              <PopularOptions>
                <div>
                  <UserOutlined />
                  <span>{formatFollowerCount(user.followerCount)}</span>
                </div>

                <div>
                  <HeartOutlined />
                  <span>{formatFollowerCount(user.likeCount)}</span>
                </div>

                <div>
                  <CommentOutlined />
                  <span>{formatFollowerCount(user.commentCount + user.replyCommentCount)}</span>
                </div>
              </PopularOptions>
            </PopularUserContents>

            {curr !== 0 && (
              <PopularBtn $alignleft="true" onClick={prev}>
                <CaretLeftOutlined />
              </PopularBtn>
            )}

            {curr !== bestUsers.length - 1 && (
              <PopularBtn $alignleft="false" onClick={next}>
                <CaretRightOutlined />
              </PopularBtn>
            )}
          </div>
        ))}
      </div>
    </PopularUserWrapper>
  );
};

export default PopularUser;
