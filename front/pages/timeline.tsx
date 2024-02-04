import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';

const Timeline = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Timeline</title>
      </Head>

      <AppLayout>
        <section style={{ display: 'flex', justifyContent: 'start' }}>
          <div style={{ flex: '7' }}>
            <PostingForm />
            <PostList />
          </div>

          <div style={{ flex: '3' }}>
            <div>인기작성자</div>
            <div>팔로워목록</div>
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default Timeline;
