import React, { useState } from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import ChatList from 'components/Message/ChatList';
import Chat from 'components/Message/Chat';
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

export default Message;
