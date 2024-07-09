import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { RootState } from 'store/reducers';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { AuthLoaderWrapper } from 'styles/Auth';

const Auth = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  useEffect(() => {
    if (me) Router.replace('/timeline');
  }, [me]);

  return (
    <AuthLoaderWrapper>
      <LoadingOutlined />
    </AuthLoaderWrapper>
  );
};

export default Auth;
