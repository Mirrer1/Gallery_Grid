import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import AlertList from 'components/Activity/AlertList';
import { PageHead, SeoProps } from 'components/PageHead';

import wrapper from 'store/configureStore';
import botDetector from 'utils/botDetector';
import useToastStatus from 'utils/useToast';
import { formatFollowerCount } from 'utils/formatFollowerCount';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { loadMyActivityCountsRequest, loadMyActivityPostsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { ActivityHeader, ActivityWrapper, HeaderItem } from 'styles/Activity';

const Activity = ({ seo }: { seo: SeoProps }) => {
  const { myActivityCounts } = useSelector((state: RootState) => state.post);
  useToastStatus();

  return (
    <>
      <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />

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
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const isBot = botDetector(context.req.headers['user-agent']);

  if (isBot) {
    const seo = {
      title: 'Gallery Grid | Activity',
      description: 'Gallery Grid에서 좋아요, 댓글, 팔로잉 등과 관련된 알림을 확인하세요.',
      imageUrl: 'https://gallerygrd.com/favicon.ico',
      url: 'https://gallerygrd.com/activity'
    };

    return {
      props: {
        seo
      }
    };
  }

  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadMyActivityCountsRequest());
  context.store.dispatch(loadMyActivityPostsRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  const seo = {
    title: `Gallery Grid | ${me?.nickname || '사용자'}'s Activity`,
    description: `${me?.nickname || '사용자'}님의 활동 페이지: 좋아요, 댓글, 팔로잉 등과 관련된 알림을 확인하세요.`,
    imageUrl: me?.ProfileImage?.src || 'https://gallerygrd.com/favicon.ico',
    url: 'https://gallerygrd.com/activity'
  };

  return {
    props: {
      seo
    }
  };
});

export default Activity;
