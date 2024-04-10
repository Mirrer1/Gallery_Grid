import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import SuggestedList from 'components/Timeline/SuggestedList';
import CommentList from 'components/Timeline/CommentList';

import { RootState } from 'store/reducers';
import { slideInFromBottom } from 'styles/Common/animation';
import { CommunitySection, PostsSection, TimelineWrapper } from 'styles/Timeline';

const Timeline = () => {
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);

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

          {isCommentListVisible ? (
            <CommunitySection key="comments" {...slideInFromBottom(0.3)}>
              <CommentList />
            </CommunitySection>
          ) : (
            <CommunitySection key="community" {...slideInFromBottom(0.3)}>
              <PopularUser />
              <SuggestedList />
            </CommunitySection>
          )}
        </TimelineWrapper>
      </AppLayout>
    </>
  );
};

export default Timeline;
