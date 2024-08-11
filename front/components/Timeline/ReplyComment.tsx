import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import { formatDate } from 'utils/useListTimes';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { CommentListItem, CommentListItemImage } from 'styles/Timeline/commentList';
import ReplyCommentForm from './ReplyCommentForm';

type ReplyCommentProps = {
  comment: Comment;
  parentId: number;
  replyFormCommentId: number | null;
  setReplyFormCommentId: React.Dispatch<React.SetStateAction<number | null>>;
};

const ReplyComment = ({ comment, parentId, replyFormCommentId, setReplyFormCommentId }: ReplyCommentProps) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [replyFormCommentId, setReplyFormCommentId] = useState<number | null>(null);

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  return (
    <CommentListItem $reply={true}>
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
            <button type="button">수정</button>
            <button type="button">삭제</button>
          </div>
        ) : (
          <div>
            <button type="button">신고</button>
          </div>
        )}
      </div>
      {comment.CommentImage && (
        <CommentListItemImage onClick={() => showImagePreview(`http://localhost:3065/${comment.CommentImage?.src}`)}>
          <img
            src={`http://localhost:3065/${comment.CommentImage.src}`}
            alt={`${comment.User.nickname}의 댓글 이미지`}
          />
        </CommentListItemImage>
      )}
      <p>{comment.content}</p>

      <button type="button" onClick={() => setReplyFormCommentId(comment.id)}>
        답글쓰기
      </button>

      {replyFormCommentId === comment.id && (
        <ReplyCommentForm setReplyFormCommentId={setReplyFormCommentId} parentId={parentId} />
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </CommentListItem>
  );
};

export default ReplyComment;
