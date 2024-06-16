import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import PostingForm from 'components/Timeline/PostingForm';
import PostList from 'components/Timeline/PostList';
import PopularUser from 'components/Timeline/PopularUser';
import SuggestedList from 'components/Timeline/SuggestedList';
import CommentList from 'components/Timeline/CommentList';

import { RootState } from 'store/reducers';
import { loadPostsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import { CommunitySection, MobileSuggestedBtn, PostsSection, TimelineWrapper } from 'styles/Timeline';

const Timeline = () => {
  const dispatch = useDispatch();
  const { isCommentListVisible, isCarouselVisible } = useSelector((state: RootState) => state.post);
  const [suggestedListVisible, setSuggestedListVisible] = useState(false);

  const showSuggestedList = useCallback(() => {
    setSuggestedListVisible(true);
  }, []);

  useEffect(() => {
    dispatch(loadPostsRequest());
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

export default Timeline;
