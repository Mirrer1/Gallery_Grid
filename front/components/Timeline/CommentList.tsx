import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import CommentForm from './CommentForm';
import CommentListItem from './CommentListItem';
import ReplyComment from './ReplyComment';

import { RootState } from 'store/reducers';
import { Comment, IReplyComment } from 'store/types/postType';
import { editCommentRemoveUploadedImage, hideCommentList, loadCommentsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  CommentListHeader,
  CommentListItemWrapper,
  CommentListWrapper,
  CommentsLoading,
  DeleteCommentText,
  NoCommentsContainer
} from 'styles/Timeline/commentList';

const CommentList = () => {
  const dispatch = useDispatch();
  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const {
    isCommentListVisible,
    commentVisiblePostId,
    mainComments,
    loadCommentsLoading,
    addCommentDone,
    lastChangedCommentId,
    editCommentDone
  } = useSelector((state: RootState) => state.post);

  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyUser, setReplyUser] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{ id: number | null; type: 'comment' | 'reply' | null }>({
    id: null,
    type: null
  });

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
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
    dispatch(editCommentRemoveUploadedImage());
  }, []);

  useEffect(() => {
    if (editCommentDone) cancelEdit();
  }, [editCommentDone]);

  useEffect(() => {
    setReplyId(null);
    setReplyUser(null);

    if (addCommentDone && lastChangedCommentId && commentRefs.current[lastChangedCommentId]) {
      commentRefs.current[lastChangedCommentId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [addCommentDone, lastChangedCommentId]);

  useEffect(() => {
    if (commentVisiblePostId) dispatch(loadCommentsRequest(commentVisiblePostId));
  }, [commentVisiblePostId]);

  return (
    <CommentListWrapper
      key={commentVisiblePostId}
      $isCommentListVisible={isCommentListVisible}
      {...slideInFromBottom()}
    >
      <CommentListHeader>
        <CaretDownOutlined onClick={onHideComment} />
      </CommentListHeader>

      {loadCommentsLoading ? (
        <CommentsLoading>
          <LoadingOutlined />
        </CommentsLoading>
      ) : (
        <>
          {mainComments?.length > 0 ? (
            <CommentListItemWrapper>
              {mainComments.map((comment: Comment) => (
                <div key={comment.id} ref={el => (commentRefs.current[comment.id] = el)}>
                  {comment.isDeleted ? (
                    <DeleteCommentText>삭제된 댓글입니다.</DeleteCommentText>
                  ) : (
                    <CommentListItem
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
                      <ReplyComment
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
            </CommentListItemWrapper>
          ) : (
            <NoCommentsContainer>
              <CloseSquareTwoTone twoToneColor="#6BA2E6" />
              <h1>No comments yet.</h1>
              <p>첫번째 댓글을 작성해보세요!</p>
            </NoCommentsContainer>
          )}

          <CommentForm replyId={replyId} replyUser={replyUser} setReplyId={setReplyId} />
        </>
      )}
    </CommentListWrapper>
  );
};

export default CommentList;
