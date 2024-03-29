import React from 'react';

import AlertItem from './AlertItem';
import { slideInFromBottom } from 'styles/Common/animation';
import { AlertDivider, AlertWrapper } from 'styles/Activity/alert';

const AlertList = () => {
  return (
    <AlertWrapper {...slideInFromBottom(0.3)}>
      <AlertDivider>Today</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />

      <AlertDivider>Yesterday</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />

      <AlertDivider>2024-1-21</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />

      <AlertDivider>2024-1-15</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />

      <AlertDivider>2024-1-13</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />

      <AlertDivider>2024-1-4</AlertDivider>
      <AlertItem type="like" />
      <AlertItem type="comment" />
      <AlertItem type="follow" />
    </AlertWrapper>
  );
};

export default AlertList;
