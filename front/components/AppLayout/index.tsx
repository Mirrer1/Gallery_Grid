import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Link from 'next/link';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  MessageOutlined,
  NotificationOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';

import Search from './Search';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';
import ImagePreview from 'components/Modal/ImagePreviewModal';

import useImagePreview from 'utils/useImagePreview';
import { RootState } from 'store/reducers';
import { logoutRequest } from 'store/actions/userAction';
import { LayoutWrapper, NavbarItem, NavbarItems, NavbarLogout, NavbarMessage, NavbarProfile } from 'styles/AppLayout';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { me, logoutDone } = useSelector((state: RootState) => state.user);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const [showInput, setShowInput] = useState(false);
  const [pathname, setPathname] = useState<string | null>(null);

  const showSearch = useCallback(() => {
    if (!showInput) setShowInput(true);
  }, [showInput]);

  const hideSearch = useCallback(() => {
    if (showInput) setShowInput(false);
  }, [showInput]);

  const onClickMessage = useCallback(() => {
    Router.push('/message');
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  useEffect(() => {
    if (logoutDone) {
      Router.replace('/');
      toast.success('정상적으로 로그아웃 되었습니다.');
    }
  }, [logoutDone]);

  useEffect(() => {
    if (typeof window !== 'undefined') setPathname(Router.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutWrapper>
      <aside>
        <div>
          <div>
            <Search />

            <NavbarProfile>
              <img
                src={me?.ProfileImage ? `http://localhost:3065/${me.ProfileImage.src}` : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={() =>
                  showImagePreview(me?.ProfileImage ? `http://localhost:3065/${me.ProfileImage.src}` : '/user.jpg')
                }
              />

              <h1>{me?.nickname}</h1>
              <p>
                {me?.desc ? (
                  me.desc
                ) : (
                  <Link href="/settings">더 많은 사람들이 당신을 알 수 있도록, 소개글을 작성해보세요.</Link>
                )}
              </p>
            </NavbarProfile>

            <NavbarItems>
              <NavbarItem href="/timeline" $selected={pathname === '/timeline'} $message={false}>
                <div />
                <FieldTimeOutlined />
                <p>Timeline</p>
              </NavbarItem>

              <NavbarItem href="/activity" $selected={pathname === '/activity'} $message={false}>
                <div />
                <NotificationOutlined />
                <p>Activity</p>
              </NavbarItem>

              <NavbarMessage $selected={pathname === '/message'}>
                <NavbarItem href="/message" $selected={pathname === '/message'} $message={true}>
                  <div />
                  <MessageOutlined />
                  <p>Message</p>
                </NavbarItem>

                <div>
                  <button type="button" onClick={onClickMessage}>
                    <p>5</p>
                  </button>
                </div>
              </NavbarMessage>

              <NavbarItem href="/gallery" $selected={pathname === '/gallery'} $message={false}>
                <div />
                <PictureOutlined />
                <p>Gallery</p>
              </NavbarItem>

              <NavbarItem href={`/user/${me.id}`} $selected={pathname === '/user'} $message={false}>
                <div />
                <AreaChartOutlined />
                <p>Profile</p>
              </NavbarItem>
            </NavbarItems>
          </div>

          <NavbarItems>
            <NavbarItem href="/settings" $selected={pathname === '/settings'} $message={false}>
              <div />
              <SettingOutlined />
              <p>Settings</p>
            </NavbarItem>

            <NavbarLogout type="button" onClick={onClickLogout}>
              <div />
              <LogoutOutlined />
              <p>Logout</p>
            </NavbarLogout>
          </NavbarItems>
        </div>
      </aside>

      <div />

      <MobileHeader showInput={showInput} showSearch={showSearch} hideSearch={hideSearch} />

      <main onClick={hideSearch}>{children}</main>

      <MobileFooter />

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </LayoutWrapper>
  );
};

export default AppLayout;
