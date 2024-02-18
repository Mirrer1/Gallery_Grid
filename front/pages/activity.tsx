import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import FollowList from 'components/Activity/FollowList';
import AlertList from 'components/Activity/AlertList';
import { ActivityHeader, ActivityWrapper, HeaderItem } from 'styles/Activity';

const Activity = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Activity</title>
      </Head>

      <AppLayout>
        <ActivityWrapper>
          <ActivityHeader>
            <div>
              <HeaderItem>
                <h1>Total Post</h1>
                <p>100</p>
              </HeaderItem>

              <HeaderItem>
                <h1>Follower</h1>
                <p>3</p>
              </HeaderItem>

              <HeaderItem>
                <h1>Following</h1>
                <p>55</p>
              </HeaderItem>
            </div>
          </ActivityHeader>

          <FollowList />
          <FollowList />
          <AlertList />
        </ActivityWrapper>
      </AppLayout>
    </>
  );
};

export default Activity;
