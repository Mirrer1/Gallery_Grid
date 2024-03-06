import React, { useCallback } from 'react';
import { CommentOutlined, LikeOutlined, MoreOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';

const ModalContent = () => {
  const [comment, onChangeComment] = useInput('');

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(comment);
      }
    },
    [comment]
  );

  return (
    <>
      <div>
        <img />

        <div>
          <h1>Likemirrer_</h1>
          <p>2014.4.29</p>
        </div>

        <div>
          <button type="button">Follow</button>
          <MoreOutlined />
        </div>
      </div>

      <p>Lorem ipsum dolor sit</p>

      <div>
        <div>
          <LikeOutlined />
          <CommentOutlined />
        </div>

        <div>
          <p>좋아요 114개</p>
          {/* 좋아요 없으면 "가장 먼저 좋아요를 눌러보세요" 문구로 대체 */}
          <p>댓글 29개</p>
        </div>
      </div>

      {/* <ChatInputWrapper $active={chat.length === 0}> */}
      <div>
        <div>
          <SmileOutlined />
          <input
            type="text"
            placeholder="Type a Comment..."
            value={comment}
            onChange={onChangeComment}
            onKeyPress={handleKeyPress}
          />
        </div>

        <SendOutlined />
      </div>
    </>
  );
};

export default ModalContent;
