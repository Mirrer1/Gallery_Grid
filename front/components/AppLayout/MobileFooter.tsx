import React, { useEffect, useState } from 'react';
import {
  AreaChartOutlined,
  FieldTimeOutlined,
  // MessageOutlined,
  PictureOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Router from 'next/router';

import { MobileFooterItem, MobileFooterWrapper } from 'styles/AppLayout/mobileFooter';

const MobileFooter = () => {
  const [pathname, setPathname] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    Router.push(path);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') setPathname(Router.pathname);
  }, []);

  return (
    <MobileFooterWrapper>
      <MobileFooterItem
        as={AreaChartOutlined}
        $selected={pathname === '/activity'}
        onClick={() => navigateTo('/activity')}
      />

      <MobileFooterItem
        as={PictureOutlined}
        $selected={pathname === '/gallery'}
        onClick={() => navigateTo('/gallery')}
      />

      <MobileFooterItem
        as={FieldTimeOutlined}
        $selected={pathname === '/timeline'}
        onClick={() => navigateTo('/timeline')}
      />

      {/* <MobileFooterItem
        as={MessageOutlined}
        $selected={pathname === '/message'}
        onClick={() => navigateTo('/message')}
      /> */}

      <MobileFooterItem
        as={SettingOutlined}
        $selected={pathname === '/settings'}
        onClick={() => navigateTo('/settings')}
      />
    </MobileFooterWrapper>
  );
};

export default MobileFooter;
