import React, { useCallback } from 'react';
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { SearchProps } from './Search';
import { logoutRequest } from 'store/actions/userAction';
import { MobileHeaderContent, MobileHeaderWrapper } from 'styles/AppLayout/mobileHeader';

const MobileHeader = ({ setSearchMode }: SearchProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user);

  const onClickProfile = useCallback(() => {
    if (router.pathname !== `/user/${me.id}`) {
      router.push(`/user/${me.id}`);
    }
  }, [router, me]);

  const excuteSearchMode = useCallback(() => {
    if (setSearchMode) setSearchMode(true);
  }, [setSearchMode]);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <MobileHeaderWrapper>
      <div>
        <h1>Gallery Grid</h1>

        <MobileHeaderContent>
          <div onClick={onClickProfile}>
            <img src={me?.ProfileImage ? imgURL(me.ProfileImage.src) : '/user.jpg'} alt="유저 프로필 이미지" />
          </div>

          <div onClick={excuteSearchMode}>
            <SearchOutlined />
          </div>

          <div>
            <LogoutOutlined onClick={onClickLogout} />
          </div>
        </MobileHeaderContent>
      </div>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
