import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import FollowList from 'components/Activity/FollowList';
import AlertList from 'components/Activity/AlertList';
import PostModal from 'components/Modal/PostModal';

import wrapper from 'store/configureStore';
import { RootState } from 'store/reducers';
import { slideInFromBottom } from 'styles/Common/animation';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { ActivityHeader, ActivityWrapper, FollowWrapper, HeaderItem } from 'styles/Activity';

const Activity = () => {
  const followerList = [
    {
      id: 1,
      img: 'https://i.pinimg.com/564x/aa/06/d7/aa06d77cd048b867f5d0b40362e62a76.jpg',
      name: 'user1',
      follower: 25,
      following: 12
    },
    {
      id: 2,
      img: 'https://i.pinimg.com/736x/a0/c3/de/a0c3de191042b178a7ce3bc9e99cc277.jpg',
      name: 'user2',
      follower: 12,
      following: 44
    },
    {
      id: 3,
      img: 'https://i.pinimg.com/736x/e0/39/86/e03986aaf209fd80f9750eee52ac247d.jpg',
      name: 'user3',
      follower: 45,
      following: 3
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/564x/e7/8c/a7/e78ca70efddebc7c986b58fb94569bf7.jpg',
      name: 'user4',
      follower: 7567,
      following: 5
    },
    {
      id: 5,
      img: 'https://i.pinimg.com/564x/88/ff/53/88ff5371931b90ffb1f63e06b0f7a1fa.jpg',
      name: 'user5',
      follower: 23,
      following: 5
    },
    {
      id: 6,
      img: 'https://i.pinimg.com/564x/89/88/87/898887d89ce7b428ae8824c896050271.jpg',
      name: 'user6',
      follower: 2345,
      following: 45657
    },
    {
      id: 7,
      img: 'https://i.pinimg.com/564x/37/cc/5c/37cc5c5c63e8e440197e788b5c534067.jpg',
      name: 'user7',
      follower: 4,
      following: 342
    },
    {
      id: 8,
      img: 'https://i.pinimg.com/564x/7f/f4/f5/7ff4f54fa972f58dedfa70737db46e5c.jpg',
      name: 'user8',
      follower: 3,
      following: 412
    },
    {
      id: 9,
      img: 'https://i.pinimg.com/564x/4b/67/d4/4b67d468e05edc9238440212fcf658d5.jpg',
      name: 'user9',
      follower: 22213,
      following: 124
    }
  ];

  const { isPostModalVisible } = useSelector((state: RootState) => state.post);

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

          <FollowWrapper {...slideInFromBottom()}>
            <FollowList type="follower" list={followerList} />
            <FollowList type="following" list={followerList} />
          </FollowWrapper>

          <AlertList />
        </ActivityWrapper>

        {isPostModalVisible && <PostModal />}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  context.store.dispatch(loadMyInfoRequest());
  // context.store.dispatch(loadPostsRequest());

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (!me) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
});

export default Activity;
