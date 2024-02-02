import React, { ReactNode } from 'react';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  MessageOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';

import Search from './Search';
import Link from 'next/link';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <aside>
        <Search />

        <div>
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            alt="user profile image"
          />
          <h1>Tanya Shah</h1>
          <p>IntroText blah blah.</p>
        </div>

        <div>
          <Link href="/home">
            <FieldTimeOutlined />
            <p>Timeline</p>
          </Link>

          <Link href="/activity">
            <AreaChartOutlined />
            <p>Activity</p>
          </Link>

          <Link href="/message">
            <MessageOutlined />
            <p>Message</p>
          </Link>

          <Link href="/gallery">
            <PictureOutlined />
            <p>Gallery</p>
          </Link>
        </div>

        <div>
          <Link href="/settings">
            <SettingOutlined />
            <p>Settings</p>
          </Link>

          <button type="button">
            <LogoutOutlined />
            <p>Logout</p>
          </button>
        </div>
      </aside>

      <main>{children}</main>
    </>
  );
};

export default AppLayout;
