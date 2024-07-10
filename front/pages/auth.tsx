import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';

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
    <AuthLoaderWrapper>
      <AuthLoader>
        <div>
          <img src="/mark.png" alt="Icon Image" />

          <div>
            <h1>Waiting for Google Sign In{dots}</h1>
          </div>
        </div>

        <p>Google 계정에 연결하는 동안 잠시만 기다려 주세요.</p>

        <LoadingOutlined />
      </AuthLoader>
    </AuthLoaderWrapper>
  );
};

export default Auth;
