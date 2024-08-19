import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import formatDate from 'utils/useListTimes';
import { RootState } from 'store/reducers';
import { IReplyComment } from 'store/types/postType';
import { CommentContainer, CommentListItemImage } from 'styles/Timeline/commentList';

type ReplyCommentProps = {
  comment: IReplyComment;
  replyId: number;
  setReplyId: (id: number | null) => void;
  setReplyUser: (user: string | null) => void;
  showImagePreview: (src: string) => void;
  onEditClick: () => void;
};

const ReplyComment = ({
  comment,
  replyId,
  setReplyId,
  setReplyUser,
  showImagePreview,
  onEditClick
}: ReplyCommentProps) => {
  const { me } = useSelector((state: RootState) => state.user);

  const onClickReply = useCallback((user: string) => {
    setReplyId(null);
    setReplyUser(null);

    setTimeout(() => {
      setReplyId(replyId);
      setReplyUser(user);
    }, 0);
  }, []);

  return (
    <CommentContainer $reply={true}>
      <div>
        <div>
          <img
            src={comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'}
            alt={`${comment.User.nickname}의 프로필 이미지`}
          />

          <div>
            <div>
              <h1>{comment.User.nickname}</h1>
              {comment.Post?.UserId === comment.UserId && <p>작성자</p>}
            </div>

            <p>{formatDate(comment.createdAt)}</p>
          </div>
        </div>

        {comment.User.id === me?.id ? (
          <div>
            <button type="button" onClick={onEditClick}>
              수정
            </button>
            <button type="button">삭제</button>
          </div>
        ) : (
          <div>
            <button type="button">신고</button>
          </div>
        )}
      </div>
      {comment.ReplyImage && (
        <CommentListItemImage onClick={() => showImagePreview(`http://localhost:3065/${comment.ReplyImage?.src}`)}>
          <img src={`http://localhost:3065/${comment.ReplyImage.src}`} alt={`${comment.User.nickname}의 댓글 이미지`} />
        </CommentListItemImage>
      )}
      <p>{comment.content}</p>

      <button type="button" onClick={() => onClickReply(comment.User.nickname)}>
        답글쓰기
      </button>
    </CommentContainer>
  );
};

export default ReplyComment;
