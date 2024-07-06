import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  MessageOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Router from 'next/router';

import { RootState } from 'store/reducers';
import { MobileFooterItem, MobileFooterWrapper } from 'styles/AppLayout/mobileFooter';

const MobileFooter = () => {
  const { isCarouselVisible, isPostModalVisible } = useSelector((state: RootState) => state.post);

  const navigateTo = (path: string) => {
    Router.push(path);
  };

  return (
    <MobileFooterWrapper $visible={isCarouselVisible || isPostModalVisible}>
      <MobileFooterItem
        as={AreaChartOutlined}
        $selected={Router.pathname === '/activity'}
        onClick={() => navigateTo('/activity')}
      />

      <MobileFooterItem
        as={PictureOutlined}
        $selected={Router.pathname === '/gallery'}
        onClick={() => navigateTo('/gallery')}
      />

      <MobileFooterItem
        as={FieldTimeOutlined}
        $selected={Router.pathname === '/timeline'}
        onClick={() => navigateTo('/timeline')}
      />

      <MobileFooterItem
        as={MessageOutlined}
        $selected={Router.pathname === '/message'}
        onClick={() => navigateTo('/message')}
      />

      <MobileFooterItem
        as={SettingOutlined}
        $selected={Router.pathname === '/settings'}
        onClick={() => navigateTo('/settings')}
      />
    </MobileFooterWrapper>
  );
};

export default MobileFooter;
