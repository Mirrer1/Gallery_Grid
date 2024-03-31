import React, { useState } from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import UserInfo from 'components/User/UserInfo';
import UserPosts from 'components/User/UserPosts';
import UserFollowerList from 'components/User/UserFollowerList';
import UserFollowingList from 'components/User/UserFollowingList';
import { UserWrapper } from 'styles/User';

const user = () => {
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

          {selectedActivity === 'posts' ? (
            <UserPosts />
          ) : selectedActivity === 'follower' ? (
            <UserFollowerList />
          ) : (
            <UserFollowingList />
          )}
        </UserWrapper>
      </AppLayout>
    </>
  );
};

export default user;
