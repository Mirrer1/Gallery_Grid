import React, { useCallback, useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import SuggestedList from 'components/Timeline/SuggestedList';
import CommentList from 'components/Timeline/CommentList';

import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import { loadPostsRequest } from 'store/actions/postAction';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { CommunitySection, MobileSuggestedBtn, PostsSection, TimelineWrapper } from 'styles/Timeline';

const Timeline = () => {
  const { isCommentListVisible, isCarouselVisible } = useSelector((state: RootState) => state.post);
  const [suggestedListVisible, setSuggestedListVisible] = useState(false);

  const showSuggestedList = useCallback(() => {
    setSuggestedListVisible(true);
  }, []);

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
            <SuggestedList
              suggestedListVisible={suggestedListVisible}
              setSuggestedListVisible={setSuggestedListVisible}
            />

            {isCommentListVisible && <CommentList />}
          </CommunitySection>

          <MobileSuggestedBtn $listvisible={suggestedListVisible || isCarouselVisible}>
            <UsergroupAddOutlined onClick={showSuggestedList} />
          </MobileSuggestedBtn>
        </TimelineWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadPostsRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();
});

export default Timeline;
