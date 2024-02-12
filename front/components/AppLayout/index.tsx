import React, { ReactNode, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  MessageOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';

import Search from './Search';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';
import { LayoutWrapper, NavbarItem, NavbarItems, NavbarLogout, NavbarMessage, NavbarProfile } from 'styles/AppLayout';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);

  const showSearch = useCallback(() => {
    if (!showInput) setShowInput(true);
  }, [showInput]);

  const hideSearch = useCallback(() => {
    if (showInput) setShowInput(false);
  }, [showInput]);

  const onClickMessage = useCallback(() => {
    router.push('/message');
  }, []);

  return (
    <LayoutWrapper>
      <aside>
        <Search />

        <NavbarProfile>
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            alt="user profile image"
          />
          <h1>Tanya Shah</h1>
          <p>
            IntroText blah blah. IntroText blah blah. IntroText blah blah. IntroText blah blah. IntroText blah blah.
            IntroText blah blah. IntroText blah blah.
          </p>
        </NavbarProfile>

        <NavbarItems $firstmargin="true">
          <NavbarItem href="/timeline" $selected={router.pathname === '/timeline'}>
            <FieldTimeOutlined />
            <p>Timeline</p>
          </NavbarItem>

          <NavbarItem href="/activity" $selected={router.pathname === '/activity'}>
            <AreaChartOutlined />
            <p>Activity</p>
          </NavbarItem>

          <NavbarMessage $selected={router.pathname === '/message'}>
            <NavbarItem href="/message" $selected={router.pathname === '/message'}>
              <MessageOutlined />
              <p>Message</p>
            </NavbarItem>

            <div>
              <button type="button" onClick={onClickMessage}>
                5
              </button>
            </div>
          </NavbarMessage>

          <NavbarItem href="/gallery" $selected={router.pathname === '/gallery'}>
            <PictureOutlined />
            <p>Gallery</p>
          </NavbarItem>
        </NavbarItems>

        <NavbarItems $firstmargin="false">
          <NavbarItem href="/settings" $selected={router.pathname === '/settings'}>
            <SettingOutlined />
            <p>Settings</p>
          </NavbarItem>

          <NavbarLogout type="button">
            <LogoutOutlined />
            <p>Logout</p>
          </NavbarLogout>
        </NavbarItems>
      </aside>

      <div></div>

      <MobileHeader showInput={showInput} showSearch={showSearch} hideSearch={hideSearch} />

      <main onClick={hideSearch}>{children}</main>

      <MobileFooter />
    </LayoutWrapper>
  );
};

export default AppLayout;
