import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import ModalReplyComment from './ModalReplyComment';
import ModalCommentListItem from './ModalCommentListItem';
import ModalCommentForm from './ModalCommentForm';

import { RootState } from 'store/reducers';
import { Comment, IReplyComment } from 'store/types/postType';
import {
  editModalCommentRemoveUploadedImage,
  hideModalCommentList,
  loadModalCommentsRequest
} from 'store/actions/postAction';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  ModalCommentListHeader,
  ModalCommentListItemWrapper,
  ModalCommentListContainer,
  ModalCommentsLoading,
  ModalNoCommentsContainer,
  DeleteModalCommentText
} from 'styles/Modal/modalCommentList';

const ModalCommentList = () => {
  const dispatch = useDispatch();
  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { me } = useSelector((state: RootState) => state.user);
  const {
    singlePost,
    modalComments,
    loadModalCommentsLoading,
    addModalCommentDone,
    lastChangedModalCommentId,
    editModalCommentDone,
    focusedComment,
    loadModalCommentsDone
  } = useSelector((state: RootState) => state.post);

  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyUser, setReplyUser] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{ id: number | null; type: 'comment' | 'reply' | null }>({
    id: null,
    type: null
  });

  const onHideComment = useCallback(() => {
    dispatch(hideModalCommentList());
  }, []);

  const handleEditClick = useCallback((id: number, type: 'comment' | 'reply') => {
    setEditingComment({ id, type });

    setTimeout(() => {
      if (commentRefs.current[id]) {
        commentRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingComment({ id: null, type: null });
    dispatch(editModalCommentRemoveUploadedImage());
  }, []);
  useEffect(() => {
    if (editModalCommentDone) cancelEdit();
  }, [editModalCommentDone]);

  useEffect(() => {
    setReplyId(null);
    setReplyUser(null);

    if (addModalCommentDone && lastChangedModalCommentId && commentRefs.current[lastChangedModalCommentId]) {
      commentRefs.current[lastChangedModalCommentId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [addModalCommentDone, lastChangedModalCommentId]);

  useEffect(() => {
    if (loadModalCommentsDone && focusedComment?.id && commentRefs.current[focusedComment.id]) {
      commentRefs.current[focusedComment.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [loadModalCommentsDone, focusedComment]);

  useEffect(() => {
    dispatch(loadModalCommentsRequest(singlePost.id));
  }, []);

  return (
    <ModalCommentListContainer {...slideInFromBottom()}>
      <ModalCommentListHeader>
        <CaretDownOutlined onClick={onHideComment} />
      </ModalCommentListHeader>

      {loadModalCommentsLoading ? (
        <ModalCommentsLoading>
          <LoadingOutlined />
        </ModalCommentsLoading>
      ) : modalComments?.length > 0 ? (
        <ModalCommentListItemWrapper>
          {modalComments.map((comment: Comment) => (
            <div key={comment.id} ref={el => (commentRefs.current[comment.id] = el)}>
              {comment.isDeleted ? (
                <DeleteModalCommentText>삭제된 댓글입니다.</DeleteModalCommentText>
              ) : (
                <ModalCommentListItem
                  comment={comment}
                  setReplyId={setReplyId}
                  setReplyUser={setReplyUser}
                  onEditClick={() => handleEditClick(comment.id, 'comment')}
                  isEditing={editingComment.id === comment.id && editingComment.type === 'comment'}
                  cancelEdit={cancelEdit}
                />
              )}

              {comment.Replies.map((reply: IReplyComment) => (
                <div key={reply.id} ref={el => (commentRefs.current[reply.id] = el)}>
                  <ModalReplyComment
                    comment={reply}
                    replyId={comment.id}
                    setReplyId={setReplyId}
                    setReplyUser={setReplyUser}
                    onEditClick={() => handleEditClick(reply.id, 'reply')}
                    isEditing={editingComment.id === reply.id && editingComment.type === 'reply'}
                    cancelEdit={cancelEdit}
                  />
                </div>
              ))}
            </div>
          ))}
        </ModalCommentListItemWrapper>
      ) : (
        <ModalNoCommentsContainer>
          <CloseSquareTwoTone twoToneColor="#6BA2E6" />
          <h1>No comments yet.</h1>
          <p>첫번째 댓글을 작성해보세요!</p>
        </ModalNoCommentsContainer>
      )}

      {me && <ModalCommentForm replyId={replyId} replyUser={replyUser} setReplyId={setReplyId} />}
    </ModalCommentListContainer>
  );
};

export default ModalCommentList;
