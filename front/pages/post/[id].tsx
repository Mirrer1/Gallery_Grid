import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import useToastStatus from 'utils/useToast';
import wrapper from 'store/configureStore';
import { PageHead, SeoProps } from 'components/PageHead';
import { RootState } from 'store/reducers';
import { loadPostRequest } from 'store/actions/postAction';
import { loadMyInfoRequest } from 'store/actions/userAction';

const user = ({ seo }: { seo: SeoProps }) => {
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user);
  const { loadPostError } = useSelector((state: RootState) => state.post);
  useToastStatus();

  useEffect(() => {
    if (loadPostError) {
      toast.warning('존재하지 않는 게시글입니다.');
      router.push(me ? '/timeline' : '/');
    }
  }, [loadPostError, me]);

  if (loadPostError) return null;

  return <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  const postId = Number(Array.isArray(context.params?.id) ? context.params.id[0] : context.params?.id);
  let seo: SeoProps = {
    title: 'Gallery Grid | Unknown Post',
    description: '게시글 내용을 확인할 수 없습니다.',
    imageUrl: 'https://gallerygrd.com/favicon.ico',
    url: `https://gallerygrd.com/post/${postId || ''}`
  };

  if (postId) context.store.dispatch(loadPostRequest(postId));
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { singlePost } = state.post;

  if (singlePost) {
    seo = {
      title: `Gallery Grid | ${singlePost.User?.nickname || 'Unknown User'}'s Post`,
      description: singlePost.content || '게시글 내용을 확인할 수 없습니다.',
      imageUrl: singlePost.Images?.[0]?.src || 'https://gallerygrd.com/favicon.ico',
      url: `https://gallerygrd.com/post/${postId || ''}`
    };
  }

  return {
    props: {
      seo
    }
  };
});

export default user;
