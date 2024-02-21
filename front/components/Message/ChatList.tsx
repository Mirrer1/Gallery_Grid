import React, { useCallback } from 'react';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { ChatListHeader, ChatListWrapper } from 'styles/Message/chatList';

const Message = () => {
  const [keyword, onChangeKeyword] = useInput('');

  const list = [
    {
      id: 1,
      profile: 'https://i.pinimg.com/564x/ed/30/6c/ed306c69bf2cd486a926babf2912bef9.jpg',
      nickname: 'asd231',
      lastChat: '가나다라마자가나다라마자가나다라마자',
      createdAt: '02 March'
    },
    {
      id: 2,
      profile: 'https://i.pinimg.com/564x/5e/0f/ca/5e0fca35d3ed20cf1d454044e12a7d28.jpg',
      nickname: 'AAW421',
      lastChat: 'asdasd123asdasd123asdasd123asdasd123asdasd123asdasd123asdasd123',
      createdAt: '12 April'
    },
    {
      id: 3,
      profile: 'https://i.pinimg.com/564x/5e/20/e4/5e20e416200a6f32ee535938cbbeb103.jpg',
      nickname: 'AAW421fg23',
      lastChat: '가나다asd213',
      createdAt: '28 dec'
    },
    {
      id: 4,
      profile: 'https://i.pinimg.com/564x/96/cc/19/96cc19a3986505320afdc8f806622bd0.jpg',
      nickname: 'AAW421fg231aa',
      lastChat: '가',
      createdAt: '12 March'
    }
  ];

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log(keyword);
    }
  }, []);

  return (
    <ChatListWrapper>
      <ChatListHeader>
        <div>
          <label htmlFor="chatSearch">
            <SearchOutlined />
          </label>

          <input
            type="text"
            id="chatSearch"
            placeholder="Search Chat..."
            value={keyword}
            onChange={onChangeKeyword}
            onKeyPress={handleKeyPress}
          />
        </div>

        <PlusSquareOutlined />
      </ChatListHeader>

      <div>
        {list.map(chat => (
          <div key={chat.id}>
            <div>
              <img src={chat.profile} alt={`${chat.nickname}의 프로필 이미지`} />

              <div>
                <h1>{chat.nickname}</h1>
                <p>{chat.lastChat}</p>
              </div>
            </div>

            <div>
              <div>{chat.createdAt}</div>
              <div>5</div>
            </div>
          </div>
        ))}
      </div>
    </ChatListWrapper>
  );
};

export default Message;
