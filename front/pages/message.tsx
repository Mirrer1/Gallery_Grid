import React, { useState } from 'react';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import ChatList from 'components/Message/ChatList';
import Chat from 'components/Message/Chat';
import botDetector from 'utils/botDetector';

import wrapper from 'store/configureStore';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { MessageWrapper } from 'styles/Message';

const Message = () => {
  const [visibleChat, setVisibleChat] = useState(false);

  return (
    <>
      <Head>
        <title>Gallery Grid | Message</title>
      </Head>

      <AppLayout>
        <MessageWrapper>
          <ChatList visibleChat={visibleChat} setVisibleChat={setVisibleChat} />
          <Chat visibleChat={visibleChat} setVisibleChat={setVisibleChat} />
        </MessageWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const isBot = botDetector(context.req.headers['user-agent']);

  if (isBot) {
    const seo = {
      title: 'Gallery Grid | Message',
      description: 'Gallery Grid에서 메시지를 주고받아보세요.',
      url: 'https://gallerygrd.com/message',
      imageUrl: 'https://gallerygrd.com/favicon.ico'
    };

    return {
      props: {
        seo
      }
    };
  }

  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  return {
    props: {}
  };
});

export default Message;
