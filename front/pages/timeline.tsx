import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';

const Timeline = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Timeline</title>
      </Head>

      <AppLayout>
        <section>
          <div>
            <PostingForm />
            <div>게시글 목록</div>
          </div>

          <div>
            <div>인기작성자</div>
            <div>팔로워목록</div>
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default Timeline;
