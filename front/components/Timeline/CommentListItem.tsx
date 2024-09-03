import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';

import DeleteModal from 'components/Modal/DeleteModal';
import formatDate from 'utils/useListTimes';
import { showDeleteModal } from 'store/actions/postAction';
import { CommentContainer, CommentListItemImage } from 'styles/Timeline/commentList';

type CommentListItemProps = {
  comment: Comment;
  setReplyId: (id: number | null) => void;
  setReplyUser: (user: string | null) => void;
  showImagePreview: (src: string) => void;
  onEditClick: () => void;
};

const CommentListItem = ({
  comment,
  setReplyId,
  setReplyUser,
  showImagePreview,
  onEditClick
}: CommentListItemProps) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { isDeleteModalVisible } = useSelector((state: RootState) => state.post);

  const openDeleteModal = useCallback(
    (commentId: number) => {
      dispatch(showDeleteModal({ type: '댓글', id: commentId, replyId: null, hasChild: comment.Replies.length > 0 }));
    },
    [comment]
  );

  const onClickReply = useCallback((commentId: number, user: string) => {
    setReplyId(null);
    setReplyUser(null);

    setTimeout(() => {
      setReplyId(commentId);
      setReplyUser(user);
    }, 0);
  }, []);

  return (
    <CommentContainer $reply={false}>
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
            <button type="button" onClick={() => openDeleteModal(comment.id)}>
              삭제
            </button>
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

      <button type="button" onClick={() => onClickReply(comment.id, comment.User.nickname)}>
        답글쓰기
      </button>

      {isDeleteModalVisible && <DeleteModal />}
    </CommentContainer>
  );
};

export default CommentListItem;