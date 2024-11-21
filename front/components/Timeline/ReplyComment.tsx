import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import formatDate from 'utils/useListTimes';
import DeleteModal from 'components/Modal/DeleteModal';
import { RootState } from 'store/reducers';
import { IReplyComment } from 'store/types/postType';
import { showDeleteModal } from 'store/actions/postAction';
import { slideInList } from 'styles/Common/animation';
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
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { isDeleteModalVisible } = useSelector((state: RootState) => state.post);

  const openDeleteModal = useCallback(
    (commentId: number) => {
      dispatch(showDeleteModal({ type: '댓글', id: commentId, replyId, hasChild: false }));
    },
    [comment]
  );

  const onClickReply = useCallback((user: string) => {
    setReplyId(null);
    setReplyUser(null);

    setTimeout(() => {
      setReplyId(replyId);
      setReplyUser(user);
    }, 0);
  }, []);

  return (
    <CommentContainer $reply={true} {...slideInList}>
      <div>
        <div>
          <img
            src={comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'}
            alt={`${comment.User.nickname}의 프로필 이미지`}
            onClick={() =>
              showImagePreview(
                comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'
              )
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

      {isDeleteModalVisible && <DeleteModal />}
    </CommentContainer>
  );
};

export default ReplyComment;
