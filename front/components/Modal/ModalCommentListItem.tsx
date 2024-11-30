import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';

import DeleteModal from './DeleteModal';
import formatDate from 'utils/useListTimes';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { showDeleteModal } from 'store/actions/postAction';

import { slideInList } from 'styles/Common/animation';
import { ModalCommentContainer, ModalCommentListItemImage } from 'styles/Modal/modalCommentList';

type ModalCommentListItemProps = {
  comment: Comment;
  setReplyId: (id: number | null) => void;
  setReplyUser: (user: string | null) => void;
  showImagePreview: (src: string) => void;
  onEditClick: () => void;
};

const ModalCommentListItem = ({
  comment,
  setReplyId,
  setReplyUser,
  showImagePreview,
  onEditClick
}: ModalCommentListItemProps) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { isDeleteModalVisible, activityFocusedCommentId } = useSelector((state: RootState) => state.post);

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
    <ModalCommentContainer $reply={false} $isFocused={activityFocusedCommentId === comment.id} {...slideInList}>
      <div>
        <div>
          <img
            src={comment.User.ProfileImage ? `${comment.User.ProfileImage.src}` : '/user.jpg'}
            alt={`${comment.User.nickname}의 프로필 이미지`}
            onClick={() =>
              showImagePreview(comment.User.ProfileImage ? `${comment.User.ProfileImage.src}` : '/user.jpg')
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
        <ModalCommentListItemImage onClick={() => showImagePreview(`${comment.CommentImage?.src}`)}>
          <img src={`${comment.CommentImage.src}`} alt={`${comment.User.nickname}의 댓글 이미지`} />
        </ModalCommentListItemImage>
      )}

      <p>{comment.content}</p>

      {me && (
        <button type="button" onClick={() => onClickReply(comment.id, comment.User.nickname)}>
          답글쓰기
        </button>
      )}

      {isDeleteModalVisible && <DeleteModal />}
    </ModalCommentContainer>
  );
};

export default ModalCommentListItem;
