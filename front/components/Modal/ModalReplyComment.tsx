import React from 'react';

import { ModalCommentListItem } from 'styles/Modal/modalCommentList';

const ModalReplyComment = () => {
  const comment = {
    id: 1,
    nickname: 'userasd1',
    profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
    content: '안녕하세요. 저는 댓댓글입니다.',
    createdAt: '2024-2-14'
  };

  return (
    <ModalCommentListItem $reply={true}>
      <div>
        <div>
          <img src={comment.profile} alt={`${comment.nickname}의 프로필 이미지`} />

          <div>
            <h1>{comment.nickname}</h1>
            <p>{comment.createdAt}</p>
          </div>
        </div>

        <div>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>

      <p>{comment.content}</p>
    </ModalCommentListItem>
  );
};

export default ModalReplyComment;
