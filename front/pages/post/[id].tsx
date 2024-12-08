import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import PageHead from 'components/PageHead';
import useToastStatus from 'utils/useToast';
import wrapper from 'store/configureStore';
import PostModal from 'components/Modal/PostModal';
import { RootState } from 'store/reducers';
import { loadPostRequest } from 'store/actions/postAction';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { SharedPostWrapper } from 'styles/User';

const user = () => {
  const router = useRouter();
  const { id: postId } = router.query;
  const { me } = useSelector((state: RootState) => state.user);
  const { loadPostError, singlePost } = useSelector((state: RootState) => state.post);
  useToastStatus();

  useEffect(() => {
    if (loadPostError) {
      toast.warning('존재하지 않는 게시글입니다.');
      router.push(me ? '/timeline' : '/');
    }
  }, [loadPostError, me]);

  if (loadPostError) return null;

  return (
    <>
      <PageHead
        title={`Gallery Grid | ${singlePost?.User?.nickname || 'Unknown User'}'s Post`}
        description={singlePost?.content || '게시글 내용을 확인할 수 없습니다.'}
        imageUrl={singlePost?.Images[0]?.src}
        url={`https://gallerygrd.com/post/${postId || ''}`}
      />

      <SharedPostWrapper>
        <PostModal />
      </SharedPostWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  const postId = Number(Array.isArray(context.params?.id) ? context.params.id[0] : context.params?.id);
  if (postId) {
    context.store.dispatch(loadPostRequest(postId));
  }

  context.store.dispatch(loadMyInfoRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();
});

export default user;
