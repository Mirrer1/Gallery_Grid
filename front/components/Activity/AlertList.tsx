import React from 'react';

import CommentAlert from './CommentAlert';
import LikeAlert from './LikeAlert';
import FollowAlert from './FollowAlert';
import { AlertWrapper } from 'styles/Activity/alert';

const AlertList = () => {
  return (
    <AlertWrapper>
      <div>Today</div>
      <LikeAlert />
      <CommentAlert />
      <FollowAlert />

      <div>Yesterday</div>
      <LikeAlert />
      <CommentAlert />
      <FollowAlert />

      <div>2024-1-14</div>
      <LikeAlert />
      <CommentAlert />
      <FollowAlert />
    </AlertWrapper>
  );
};

export default AlertList;
