import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import ChatList from 'components/Message/ChatList';
import Chat from 'components/Message/Chat';
import { MessageWrapper } from 'styles/Message';

const Message = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Message</title>
      </Head>

      <AppLayout>
        <MessageWrapper>
          <ChatList />
          <Chat />
        </MessageWrapper>
      </AppLayout>
    </>
  );
};

export default Message;
