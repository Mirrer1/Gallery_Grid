import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  // MessageOutlined,
  NotificationOutlined,
  PictureOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons';

import Search from './Search';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';

import useOverlays from 'utils/useOverlays';
import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { logoutRequest } from 'store/actions/userAction';
import {
  LayoutWrapper,
  NavbarItem,
  NavbarItems,
  NavbarLogout,
  // NavbarMessage,
  NavbarProfile,
  SearchWrapper
} from 'styles/AppLayout';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const { me, logoutDone } = useSelector((state: RootState) => state.user);
  const { isPostModalVisible, isDeleteModalVisible, isCarouselVisible, isPreviewVisible } = useSelector(
    (state: RootState) => state.post
  );
  const [pathname, setPathname] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<boolean>(false);

  // const onClickMessage = useCallback(() => {
  //   Router.push('/message');
  // }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const excuteSearchMode = useCallback(() => {
    setSearchMode(true);
  }, []);

  const handleNavigation = useCallback(
    (href: string) => {
      if (router.pathname !== href) {
        router.push(href);
      }
    },
    [router]
  );

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  useEffect(() => {
    if (logoutDone) {
      router.push('/');
      toast.success('정상적으로 로그아웃 되었습니다.');
    }
  }, [logoutDone]);

  useEffect(() => {
    if (typeof window !== 'undefined') setPathname(router.pathname);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      window.innerWidth <= 992 &&
      (isPostModalVisible || isDeleteModalVisible || isCarouselVisible || isPreviewVisible)
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isPostModalVisible, isDeleteModalVisible, isCarouselVisible, isPreviewVisible]);

  return (
    <LayoutWrapper>
      <aside>
        <div>
          <div>
            <SearchWrapper onClick={excuteSearchMode}>
              <SearchOutlined />
              <p>Search</p>
            </SearchWrapper>

            <NavbarProfile>
              <img
                src={me?.ProfileImage ? imgURL(me.ProfileImage.src) : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={() => openImagePreview(me?.ProfileImage ? `${me.ProfileImage.src}` : '/user.jpg')}
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
              <NavbarItem
                onClick={() => handleNavigation('/timeline')}
                $selected={pathname === '/timeline'}
                $message={false}
              >
                <div />
                <FieldTimeOutlined />
                <p>Timeline</p>
              </NavbarItem>

              <NavbarItem
                onClick={() => handleNavigation('/activity')}
                $selected={pathname === '/activity'}
                $message={false}
              >
                <div />
                <NotificationOutlined />
                <p>Activity</p>
              </NavbarItem>

              {/* <NavbarMessage $selected={pathname === '/message'}>
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
              </NavbarMessage> */}

              <NavbarItem
                onClick={() => handleNavigation('/gallery')}
                $selected={pathname === '/gallery'}
                $message={false}
              >
                <div />
                <PictureOutlined />
                <p>Gallery</p>
              </NavbarItem>

              <NavbarItem
                onClick={() => handleNavigation(`/user/${me.id}`)}
                $selected={pathname === `/user/${me.id}`}
                $message={false}
              >
                <div />
                <AreaChartOutlined />
                <p>Profile</p>
              </NavbarItem>
            </NavbarItems>
          </div>

          <NavbarItems>
            <NavbarItem
              onClick={() => handleNavigation('/settings')}
              $selected={pathname === '/settings'}
              $message={false}
            >
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

      <MobileHeader setSearchMode={setSearchMode} />

      {searchMode ? (
        <main>
          <Search setSearchMode={setSearchMode} />
        </main>
      ) : (
        <main>{children}</main>
      )}

      <MobileFooter />
    </LayoutWrapper>
  );
};

export default AppLayout;
