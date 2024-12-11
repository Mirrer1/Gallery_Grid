import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { toast } from 'react-toastify';
import Link from 'next/link';

import EditCommentForm from './EditCommentForm';
import formatDate from 'utils/useListTimes';
import { slideInList } from 'styles/Common/animation';
import { CommentContainer, CommentListItemImage } from 'styles/Timeline/commentList';
import useOverlays from 'utils/useOverlays';

type CommentListItemProps = {
  comment: Comment;
  setReplyId: (id: number | null) => void;
  setReplyUser: (user: string | null) => void;
  onEditClick: () => void;
  isEditing: boolean;
  cancelEdit: () => void;
};

const CommentListItem = ({
  comment,
  setReplyId,
  setReplyUser,
  onEditClick,
  isEditing,
  cancelEdit
}: CommentListItemProps) => {
  const { openOverlay } = useOverlays();
  const { me } = useSelector((state: RootState) => state.user);

  const openDeleteModal = useCallback(
    (commentId: number) => {
      openOverlay('delete', { type: '댓글', id: commentId, replyId: null, hasChild: comment.Replies.length > 0 });
    },
    [comment]
  );

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  const onClickReply = useCallback((commentId: number, user: string) => {
    setReplyId(null);
    setReplyUser(null);

    setTimeout(() => {
      setReplyId(commentId);
      setReplyUser(user);
    }, 0);
  }, []);

  return (
    <CommentContainer $reply={false} {...slideInList}>
      <div>
        <div>
          <img
            src={comment.User.ProfileImage ? `${comment.User.ProfileImage.src}` : '/user.jpg'}
            alt={`${comment.User.nickname}의 프로필 이미지`}
            onClick={() =>
              openImagePreview(comment.User.ProfileImage ? `${comment.User.ProfileImage.src}` : '/user.jpg')
            }
          />

          <div>
            <div>
              <Link href={`/user/${comment.UserId}`}>{comment.User.nickname}</Link>
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
            <button type="button" onClick={() => openDeleteModal(comment.id)}>
              삭제
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => toast.info('서비스 준비 중입니다.')}>
              신고
            </button>
          </div>
        )}
      </div>

      {comment.CommentImage && (
        <CommentListItemImage onClick={() => openImagePreview(`${comment.CommentImage?.src}`)}>
          <img src={`${comment.CommentImage.src}`} alt={`${comment.User.nickname}의 댓글 이미지`} />
        </CommentListItemImage>
      )}

      {isEditing ? (
        <EditCommentForm reply={false} comment={comment} replyId={null} cancelEdit={cancelEdit} />
      ) : (
        <>
          <p>{comment.content.replace(/\\n/g, '\n').replace(/␣/g, ' ')}</p>

          <button type="button" onClick={() => onClickReply(comment.id, comment.User.nickname)}>
            답글쓰기
          </button>
        </>
      )}
    </CommentContainer>
  );
};

export default CommentListItem;
