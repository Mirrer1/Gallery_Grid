import React, { useCallback, useEffect, useRef } from 'react';
import { CaretDownOutlined, PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { slideInFromBottom } from 'styles/Common/animation';
import { ChatHeader, ChatInputWrapper, ChatItemWrapper, ChatWrapper, ReceiveChat, SendChat } from 'styles/Message/chat';

type ChatProps = {
  visibleChat: boolean;
  setVisibleChat: (value: boolean) => void;
};

const Chat = ({ visibleChat, setVisibleChat }: ChatProps) => {
  const [chat, onChangeChat] = useInput('');
  const lastChatItemRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(chat);
      }
    },
    [chat]
  );

  const onHiddenChat = useCallback(() => {
    setVisibleChat(false);
  }, []);

  useEffect(() => {
    if (lastChatItemRef.current) {
      lastChatItemRef.current.scrollIntoView({
        block: 'start'
      });
    }
  }, [visibleChat]);

  return (
    // key={visibleChat}
    // 추후 chat id 로 key값 적용
    <ChatWrapper $visible={visibleChat} {...slideInFromBottom()}>
      <div>
        <ChatHeader>
          <div>
            <h1>user1</h1>
            <CaretDownOutlined onClick={onHiddenChat} />
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A incidunt odio amet similique quasi voluptas
            consectetur, iste, at excepturi aperiam doloremque dolorem commodi ducimus dicta? Possimus ad sapiente
            quaerat alias quidem, dolores amet, officia quisquam sequi tempore, a sit nisi!
          </p>
        </ChatHeader>

        <ChatItemWrapper>
          <ReceiveChat>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:24</div>
            </div>

            <div>
              <p>Lorem ipsum dol Lorem ipsum dol</p>
            </div>
          </ReceiveChat>

          <SendChat>
            <p>Lorem ipsum dolor sit amet consecte p</p>
          </SendChat>

          <ReceiveChat>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:41</div>
            </div>

            <div>
              <p>Lorem ips</p>
            </div>
          </ReceiveChat>

          <ReceiveChat>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
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
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:41</div>
            </div>

            <div>
              <p>Lorem ips</p>
            </div>
          </ReceiveChat>

          <ReceiveChat>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
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
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:41</div>
            </div>

            <div>
              <p>Lorem ips</p>
            </div>
          </ReceiveChat>

          <ReceiveChat>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:24</div>
            </div>

            <div>
              <p>Lorem ipsum dol</p>
            </div>
          </ReceiveChat>

          <SendChat>
            <p>Lorem ipsum dolor sit amet consecte p</p>
          </SendChat>

          <ReceiveChat ref={lastChatItemRef}>
            <div>
              <img
                src="https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg"
                alt="Chat Receiver Profile Image"
              />
              <div>10:41</div>
            </div>

            <div>
              <p>Lorem ips</p>
            </div>
          </ReceiveChat>
        </ChatItemWrapper>

        <ChatInputWrapper $active={chat.length === 0}>
          <div>
            <PaperClipOutlined />
            <SmileOutlined />
            <input
              type="text"
              placeholder="Type a Message..."
              value={chat}
              onChange={onChangeChat}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <SendOutlined />
          </div>
        </ChatInputWrapper>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
