import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import AlertList from 'components/Activity/AlertList';
import PostModal from 'components/Modal/PostModal';

import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import { loadMyActivityCountsRequest, loadMyInfoRequest } from 'store/actions/userAction';
import { loadMyActivityPostsRequest } from 'store/actions/postAction';
import { ActivityHeader, ActivityWrapper, HeaderItem } from 'styles/Activity';

const Activity = () => {
  const { myActivityCounts } = useSelector((state: RootState) => state.user);
  const { isPostModalVisible } = useSelector((state: RootState) => state.post);

  return (
    <>
      <Head>
        <title>Gallery Grid | Activity</title>
      </Head>

      <AppLayout>
        <ActivityWrapper>
          <ActivityHeader>
            <div>
              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Like</h1>
                <p>{myActivityCounts.like}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Comment</h1>
                <p>{myActivityCounts.comment}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Follow</h1>
                <p>{myActivityCounts.follow}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>
            </div>
          </ActivityHeader>

          {/* <FollowWrapper {...slideInFromBottom()}>
            <FollowList type="follower" list={followerList} />
            <FollowList type="following" list={followerList} />
          </FollowWrapper> */}

          <AlertList />
        </ActivityWrapper>

        {isPostModalVisible && <PostModal />}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadMyActivityCountsRequest());
  context.store.dispatch(loadMyActivityPostsRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (!me) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
});

export default Activity;
