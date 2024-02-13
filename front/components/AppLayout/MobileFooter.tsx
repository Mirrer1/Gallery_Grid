import React from 'react';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  MessageOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';

import { MobileFooterItem, MobileFooterWrapper } from 'styles/AppLayout/mobileFooter';

const MobileFooter = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <MobileFooterWrapper>
      <MobileFooterItem
        as={AreaChartOutlined}
        $selected={router.pathname === '/activity'}
        onClick={() => navigateTo('/activity')}
      />
      <MobileFooterItem
        as={MessageOutlined}
        $selected={router.pathname === '/message'}
        onClick={() => navigateTo('/message')}
      />
      <MobileFooterItem
        as={FieldTimeOutlined}
        $selected={router.pathname === '/timeline'}
        onClick={() => navigateTo('/timeline')}
      />
      <MobileFooterItem
        as={PictureOutlined}
        $selected={router.pathname === '/gallery'}
        onClick={() => navigateTo('/gallery')}
      />
      <MobileFooterItem as={LogoutOutlined} $selected={router.pathname === '/logout'} />
    </MobileFooterWrapper>
  );
};

export default MobileFooter;
