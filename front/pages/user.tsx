import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import UserInfo from 'components/User/UserInfo';
import UserPosts from 'components/User/UserPosts';

const user = () => {
  return (
    <>
      <Head>
        {/* 추후 타이틀 태그 이름에 유저 이름과 같이 특정 정보 추가해서 수정하기 */}
        <title>Gallery Grid | User</title>
      </Head>

      <AppLayout>
        <section>
          <UserInfo />
          <UserPosts />
        </section>
      </AppLayout>
    </>
  );
};

export default user;
