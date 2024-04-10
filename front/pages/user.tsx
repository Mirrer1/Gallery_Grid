import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import UserInfo from 'components/User/UserInfo';
import UserPosts from 'components/User/UserPosts';
import UserFollowList from 'components/User/UserFollowList';
import PostModal from 'components/Modal/PostModal';

import { RootState } from 'store/reducers';
import { UserWrapper } from 'styles/User';

const user = () => {
  const { isPostModalVisible } = useSelector((state: RootState) => state.post);
  const [selectedActivity, setSelectedActivity] = useState<'posts' | 'follower' | 'following'>('posts');

  return (
    <>
      <Head>
        {/* 추후 타이틀 태그 이름에 유저 이름과 같이 특정 정보 추가해서 수정하기 */}
        <title>Gallery Grid | User</title>
      </Head>

      <AppLayout>
        <UserWrapper>
          <UserInfo selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />

          {selectedActivity === 'posts' ? <UserPosts /> : <UserFollowList type={selectedActivity} />}
        </UserWrapper>

        {isPostModalVisible && <PostModal />}
      </AppLayout>
    </>
  );
};

export default user;
