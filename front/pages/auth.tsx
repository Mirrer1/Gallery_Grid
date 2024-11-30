import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';
import axios from 'axios';

import PageHead from 'components/PageHead';
import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { AuthLoader, AuthLoaderWrapper } from 'styles/Auth';

const Auth = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const [dots, setDots] = useState('');

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  useEffect(() => {
    if (me) Router.replace('/timeline');
  }, [me]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHead
        title="Gallery Grid | Google Sign In"
        description="Google 계정에 연결하는 중입니다. 잠시만 기다려 주세요."
        imageUrl="https://gallerygrd.com/favicon.ico"
        url="https://gallerygrd.com/auth"
      />

      <AuthLoaderWrapper>
        <AuthLoader>
          <div>
            <img src="/mark.png" alt="사이트 서브 로고 이미지" />

            <div>
              <h1>Waiting for Google Sign In{dots}</h1>
            </div>
          </div>

          <p>Google 계정에 연결하는 동안 잠시만 기다려 주세요.</p>

          <LoadingOutlined />
        </AuthLoader>
      </AuthLoaderWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch(loadMyInfoRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (me) {
    return {
      redirect: {
        destination: '/timeline',
        permanent: false
      }
    };
  }
});

export default Auth;
