import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import { TimelineWrapper } from 'styles/Timeline';
import PopularFollowingList from 'components/Timeline/PopularFollowingList';

const Timeline = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Timeline</title>
      </Head>

      <AppLayout>
        <TimelineWrapper>
          <article>
            <PostingForm />
            <PostList />
          </article>

          <article>
            <PopularUser />
            <PopularFollowingList />
          </article>
        </TimelineWrapper>
      </AppLayout>
    </>
  );
};

export default Timeline;
