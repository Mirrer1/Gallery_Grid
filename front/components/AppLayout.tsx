import React, { ReactNode } from 'react';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  MessageOutlined,
  PictureOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <aside>
        <SearchOutlined />

        <div>
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            alt="user profile image"
          />
          <h1>Tanya Shah</h1>
          <p>IntroText blah blah.</p>
        </div>

        <div>
          <button type="button">
            <FieldTimeOutlined />
            <p>Timeline</p>
          </button>

          <button type="button">
            <AreaChartOutlined />
            <p>Activity</p>
          </button>

          <button type="button">
            <MessageOutlined />
            <p>Message</p>
          </button>

          <button type="button">
            <PictureOutlined />
            <p>Gallery</p>
          </button>
        </div>

        <div>
          <button type="button">
            <SettingOutlined />
            <p>Settings</p>
          </button>

          <button type="button">
            <LogoutOutlined />
            <p>Settings</p>
          </button>
        </div>
      </aside>

      <main>{children}</main>
    </>
  );
};

export default AppLayout;
