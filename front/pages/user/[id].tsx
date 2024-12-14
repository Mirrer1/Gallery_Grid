import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import UserInfo from 'components/User/UserInfo';
import UserPosts from 'components/User/UserPosts';
import UserFollowList from 'components/User/UserFollowList';
import { PageHead, SeoProps } from 'components/PageHead';

import wrapper from 'store/configureStore';
import useToastStatus from 'utils/useToast';
import { RootState } from 'store/reducers';
import { loadUserPostsRequest } from 'store/actions/postAction';
import { loadMyInfoRequest, loadUserInfoRequest } from 'store/actions/userAction';
import { UserWrapper } from 'styles/User';
import { toast } from 'react-toastify';

const user = ({ seo }: { seo: SeoProps }) => {
  const router = useRouter();
  const { id: userId } = router.query;
  const { loadUserInfoError, followUserDone, unFollowUserDone } = useSelector((state: RootState) => state.user);
  const [selectedActivity, setSelectedActivity] = useState<'posts' | 'follower' | 'following'>('posts');
  const [followLoadingId, setFollowLoadingId] = useState<number | null>(null);
  useToastStatus();

  useEffect(() => {
    if (followUserDone || unFollowUserDone) setFollowLoadingId(null);
  }, [followUserDone, unFollowUserDone]);

  useEffect(() => {
    setSelectedActivity('posts');
  }, [userId]);

  useEffect(() => {
    if (loadUserInfoError) {
      toast.warning('유효하지 않은 사용자입니다.');
      router.push('/timeline');
    }
  }, [loadUserInfoError]);

  if (loadUserInfoError) return null;

  return (
    <>
      <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />

      <AppLayout>
        <UserWrapper>
          <UserInfo
            userId={Number(userId)}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            followLoadingId={followLoadingId}
            setFollowLoadingId={setFollowLoadingId}
          />

          {selectedActivity === 'posts' ? (
            <UserPosts />
          ) : (
            <UserFollowList
              type={selectedActivity}
              setSelectedActivity={setSelectedActivity}
              followLoadingId={followLoadingId}
              setFollowLoadingId={setFollowLoadingId}
            />
          )}
        </UserWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  const userId = Number(Array.isArray(context.params?.id) ? context.params.id[0] : context.params?.id);
  if (userId) {
    context.store.dispatch(loadUserInfoRequest(userId));
    context.store.dispatch(loadUserPostsRequest(userId));
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { userInfo } = state.user;

  const seo = {
    title: `Gallery Grid | ${userInfo?.nickname || 'Unknown User'}'s Profile`,
    description: userInfo?.desc || '소개글이 없습니다.',
    imageUrl: userInfo?.ProfileImage?.src || 'https://gallerygrd.com/favicon.ico',
    url: `https://gallerygrd.com/user/${userId}`
  };

  return {
    props: {
      seo
    }
  };
});

export default user;
