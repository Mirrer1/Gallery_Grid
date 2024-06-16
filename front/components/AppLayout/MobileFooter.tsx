import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  MessageOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { MobileFooterItem, MobileFooterWrapper } from 'styles/AppLayout/mobileFooter';

const MobileFooter = () => {
  const router = useRouter();
  const { isCarouselVisible, isPostModalVisible } = useSelector((state: RootState) => state.post);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <MobileFooterWrapper $visible={isCarouselVisible || isPostModalVisible}>
      <MobileFooterItem
        as={AreaChartOutlined}
        $selected={router.pathname === '/activity'}
        onClick={() => navigateTo('/activity')}
      />

      <MobileFooterItem
        as={PictureOutlined}
        $selected={router.pathname === '/gallery'}
        onClick={() => navigateTo('/gallery')}
      />

      <MobileFooterItem
        as={FieldTimeOutlined}
        $selected={router.pathname === '/timeline'}
        onClick={() => navigateTo('/timeline')}
      />

      <MobileFooterItem
        as={MessageOutlined}
        $selected={router.pathname === '/message'}
        onClick={() => navigateTo('/message')}
      />

      <MobileFooterItem
        as={SettingOutlined}
        $selected={router.pathname === '/settings'}
        onClick={() => navigateTo('/settings')}
      />
    </MobileFooterWrapper>
  );
};

export default MobileFooter;
