import React, { useCallback, useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import SuggestedList from 'components/Timeline/SuggestedList';
import CommentList from 'components/Timeline/CommentList';
import { PageHead, SeoProps } from 'components/PageHead';

import wrapper from 'store/configureStore';
import botDetector from 'utils/botDetector';
import useToastStatus from 'utils/useToast';
import { RootState } from 'store/reducers';
import { loadBestPostsRequest } from 'store/actions/postAction';
import { loadBestUsersRequest, loadMyInfoRequest, loadSuggestUsersRequest } from 'store/actions/userAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { CommunitySection, MobileSuggestedBtn, PostsSection, TimelineWrapper } from 'styles/Timeline';

const Timeline = ({ seo }: { seo: SeoProps }) => {
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);
  const [suggestedListVisible, setSuggestedListVisible] = useState(false);
  const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 992;
  const delay1 = isMobileOrTablet ? 0.3 : 0;
  const delay2 = isMobileOrTablet ? 0 : 0.3;
  useToastStatus();

  const showSuggestedList = useCallback(() => {
    setSuggestedListVisible(true);
  }, []);

  return (
    <>
      <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />

      <AppLayout>
        <TimelineWrapper>
          <PostsSection {...slideInFromBottom(delay1)}>
            <PostingForm />
            <PostList />
          </PostsSection>

          <CommunitySection {...slideInFromBottom(delay2)}>
            <PopularUser />
            <SuggestedList
              suggestedListVisible={suggestedListVisible}
              setSuggestedListVisible={setSuggestedListVisible}
            />

            {isCommentListVisible && <CommentList />}
          </CommunitySection>

          <MobileSuggestedBtn>
            <UsergroupAddOutlined onClick={showSuggestedList} />
          </MobileSuggestedBtn>
        </TimelineWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const isBot = botDetector(context.req.headers['user-agent']);

  if (isBot) {
    const seo = {
      title: 'Gallery Grid | Timeline',
      description: 'Gallery Grid 타임라인에서 인기 게시글, 최신 게시글을 확인하세요.',
      imageUrl: 'https://gallerygrd.com/favicon.ico',
      url: 'https://gallerygrd.com/timeline'
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
  context.store.dispatch(loadBestUsersRequest());
  context.store.dispatch(loadSuggestUsersRequest());
  context.store.dispatch(loadBestPostsRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { timelinePosts } = state.post;
  const { me } = state.user;

  const seo = {
    title: `Gallery Grid | ${me?.nickname || '사용자'}'s Timeline`,
    description: `${me?.nickname || '사용자'}님의 타임라인에서 인기 게시글, 최신 게시글을 확인하세요.`,
    imageUrl: timelinePosts?.[0]?.Images?.[0]?.src || 'https://gallerygrd.com/favicon.ico',
    url: 'https://gallerygrd.com/timeline'
  };

  return {
    props: {
      seo
    }
  };
});

export default Timeline;
