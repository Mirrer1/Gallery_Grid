import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import SuggestedList from 'components/Timeline/SuggestedList';

import { slideInFromBottom } from 'styles/Common/animation';
import { CommunitySection, PostsSection, TimelineWrapper } from 'styles/Timeline';

const Timeline = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Timeline</title>
      </Head>

      <AppLayout>
        <TimelineWrapper>
          <PostsSection {...slideInFromBottom()}>
            <PostingForm />
            <PostList />
          </PostsSection>

          <CommunitySection {...slideInFromBottom(0.3)}>
            <PopularUser />
            <SuggestedList />
          </CommunitySection>
        </TimelineWrapper>
      </AppLayout>
    </>
  );
};

export default Timeline;
