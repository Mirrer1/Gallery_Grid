import React from 'react';
import { useSelector } from 'react-redux';

import DeleteModal from './DeleteModal';
import formatDate from 'utils/useListTimes';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { ModalCommentContainer, ModalCommentListItemImage } from 'styles/Modal/modalCommentList';

type ModalCommentListItemProps = {
  comment: Comment;
  // setReplyId: (id: number | null) => void;
  // setReplyUser: (user: string | null) => void;
  showImagePreview: (src: string) => void;
  // onEditClick: () => void;
};

const ModalCommentListItem = ({
  comment,
  // setReplyId,
  // setReplyUser,
  showImagePreview
  // onEditClick
}: ModalCommentListItemProps) => {
  const { me } = useSelector((state: RootState) => state.user);

  return (
    <ModalCommentContainer $reply={false}>
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
            {/* onClick={onEditClick} */}
            <button type="button">수정</button>
            {/* onClick={() => openDeleteModal(comment.id)} */}
            <button type="button">삭제</button>
          </div>
        ) : (
          <div>
            <button type="button">신고</button>
          </div>
        )}
      </div>

      {comment.CommentImage && (
        <ModalCommentListItemImage
          onClick={() => showImagePreview(`http://localhost:3065/${comment.CommentImage?.src}`)}
        >
          <img
            src={`http://localhost:3065/${comment.CommentImage.src}`}
            alt={`${comment.User.nickname}의 댓글 이미지`}
          />
        </ModalCommentListItemImage>
      )}

      <p>{comment.content}</p>

      {/* onClick={() => onClickReply(comment.id, comment.User.nickname)} */}
      <button type="button">답글쓰기</button>

      {/* {isDeleteModalVisible && <DeleteModal />} */}
    </ModalCommentContainer>
  );
};

export default ModalCommentListItem;
