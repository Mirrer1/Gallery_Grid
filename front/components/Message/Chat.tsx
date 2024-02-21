import React from 'react';

import { ChatHeader, ChatItemWrapper, ChatWrapper, ReceiveChat, SendChat } from 'styles/Message/chat';

const Chat = () => {
  return (
    <ChatWrapper>
      <ChatHeader>
        <h1>user1</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A incidunt odio amet similique quasi voluptas
          consectetur, iste, at excepturi aperiam doloremque dolorem commodi ducimus dicta? Possimus ad sapiente quaerat
          alias quidem, dolores amet, officia quisquam sequi tempore, a sit nisi!
        </p>
      </ChatHeader>

      <ChatItemWrapper>
        <ReceiveChat>
          <div>
            <img src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg" />
            <div>10:24</div>
          </div>

          <div>
            <p>Lorem ipsum dol</p>
          </div>
        </ReceiveChat>

        <SendChat>
          <p>Lorem ipsum dolor sit amet consecte p</p>
        </SendChat>

        <ReceiveChat>
          <div>
            <img src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg" />
            <div>10:41</div>
          </div>

          <div>
            <p>Lorem ips</p>
          </div>
        </ReceiveChat>
      </ChatItemWrapper>
    </ChatWrapper>
  );
};

export default Chat;
