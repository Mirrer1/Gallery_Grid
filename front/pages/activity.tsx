import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import PageHead from 'components/PageHead';
import AppLayout from 'components/AppLayout';
import AlertList from 'components/Activity/AlertList';
import PostModal from 'components/Modal/PostModal';

import wrapper from 'store/configureStore';
import useToastStatus from 'utils/useToast';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { loadMyActivityCountsRequest, loadMyActivityPostsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { ActivityHeader, ActivityWrapper, HeaderItem } from 'styles/Activity';

const Activity = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { myActivityCounts, isPostModalVisible } = useSelector((state: RootState) => state.post);
  useToastStatus();

  return (
    <>
      <PageHead
        title={`Gallery Grid | ${me?.nickname || '사용자'}'s Activity`}
        description={`${me?.nickname || '사용자'}님의 활동 페이지: 좋아요, 댓글, 팔로잉 등과 관련된 알림을 확인하세요.`}
        imageUrl={me?.ProfileImage?.src}
        url="https://gallerygrd.com/activity"
      />

      <AppLayout>
        <ActivityWrapper>
          <ActivityHeader {...slideInFromBottom()}>
            <div>
              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Like</h1>
                <p>{formatFollowerCount(myActivityCounts?.like)}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Comment</h1>
                <p>{formatFollowerCount(myActivityCounts?.comment)}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>

              <HeaderItem>
                <h1>Follow</h1>
                <p>{formatFollowerCount(myActivityCounts?.follow)}</p>
              </HeaderItem>

              <HeaderItem>
                <div />
              </HeaderItem>
            </div>
          </ActivityHeader>

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
