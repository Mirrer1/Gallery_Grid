import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import ModalReplyComment from './ModalReplyComment';
import ModalCommentListItem from './ModalCommentListItem';
import ImagePreview from './ImagePreviewModal';
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
import EditModalCommentForm from './EditModalCommentForm';

const ModalCommentList = () => {
  const dispatch = useDispatch();
  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const {
    singlePost,
    modalComments,
    loadModalCommentsLoading,
    addModalCommentDone,
    lastChangedModalCommentId,
    editModalCommentDone
  } = useSelector((state: RootState) => state.post);

  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyUser, setReplyUser] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{ id: number | null; type: 'comment' | 'reply' | null }>({
    id: null,
    type: null
  });

  const [translateY, setTranslateY] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onHideComment = useCallback(() => {
    dispatch(hideModalCommentList());
  }, []);

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  const handleEditClick = useCallback((id: number, type: 'comment' | 'reply') => {
    setEditingComment({ id, type });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingComment({ id: null, type: null });
    dispatch(editModalCommentRemoveUploadedImage());
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth <= 992) {
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth <= 992 && touchStartY !== null) {
      const deltaY = e.touches[0].clientY - touchStartY;
      if (deltaY > 0) {
        setTranslateY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 200) {
      setTranslateY(window.innerHeight);
      setTimeout(() => {
        onHideComment();
      }, 300);
    } else {
      setTranslateY(0);
    }
    setTouchStartY(null);
  };

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
    dispatch(loadModalCommentsRequest(singlePost.id));
  }, []);

  return (
    <ModalCommentListContainer style={{ bottom: `${-translateY}px` }} {...slideInFromBottom()}>
      <ModalCommentListHeader onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <CaretDownOutlined onClick={onHideComment} />
        <div />
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
              ) : editingComment.id === comment.id && editingComment.type === 'comment' ? (
                <EditModalCommentForm
                  reply={false}
                  comment={comment}
                  replyId={null}
                  cancelEdit={cancelEdit}
                  showImagePreview={showImagePreview}
                />
              ) : (
                <ModalCommentListItem
                  comment={comment}
                  setReplyId={setReplyId}
                  setReplyUser={setReplyUser}
                  showImagePreview={showImagePreview}
                  onEditClick={() => handleEditClick(comment.id, 'comment')}
                />
              )}

              {comment.Replies.map((reply: IReplyComment) => (
                <div key={reply.id} ref={el => (commentRefs.current[reply.id] = el)}>
                  {editingComment.id === reply.id && editingComment.type === 'reply' ? (
                    <EditModalCommentForm
                      reply={true}
                      comment={reply}
                      replyId={comment.id}
                      cancelEdit={cancelEdit}
                      showImagePreview={showImagePreview}
                    />
                  ) : (
                    <ModalReplyComment
                      comment={reply}
                      replyId={comment.id}
                      setReplyId={setReplyId}
                      setReplyUser={setReplyUser}
                      showImagePreview={showImagePreview}
                      onEditClick={() => handleEditClick(reply.id, 'reply')}
                    />
                  )}
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

      <ModalCommentForm
        showImagePreview={showImagePreview}
        replyId={replyId}
        replyUser={replyUser}
        setReplyId={setReplyId}
      />

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </ModalCommentListContainer>
  );
};

export default ModalCommentList;
