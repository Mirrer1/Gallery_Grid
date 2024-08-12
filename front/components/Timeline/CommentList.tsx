import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import CommentInput from './CommentInput';
import CommentListItem from './CommentListItem';
import ReplyCommentForm from './ReplyCommentForm';
import ReplyComment from './ReplyComment';
import ImagePreview from 'components/Modal/ImagePreviewModal';

import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { hideCommentList, loadCommentsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  CommentListHeader,
  CommentListItemWrapper,
  CommentListWrapper,
  CommentsLoading,
  NoCommentsContainer
} from 'styles/Timeline/commentList';

const CommentList = () => {
  const dispatch = useDispatch();
  const commentListRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [replyFormCommentId, setReplyFormCommentId] = useState<number | null>(null);
  const {
    isCommentListVisible,
    commentImagePath,
    commentVisiblePostId,
    mainComments,
    loadCommentsLoading,
    addCommentDone,
    addReplyCommentDone
  } = useSelector((state: RootState) => state.post);

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
  }, []);

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  useEffect(() => {
    if (addCommentDone && commentListRef.current) {
      commentListRef.current.scrollTo({
        top: commentListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [addCommentDone]);

  useEffect(() => {
    if (commentVisiblePostId) dispatch(loadCommentsRequest(commentVisiblePostId));
  }, [commentVisiblePostId]);

  useEffect(() => {
    if (addReplyCommentDone) {
      setReplyFormCommentId(null);
    }
  }, [addReplyCommentDone]);

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
            <CommentListItemWrapper ref={commentListRef} $uploading={commentImagePath.length !== 0}>
              {mainComments.map(
                (comment: Comment) =>
                  comment.parentId === null && (
                    <div key={comment.id}>
                      <CommentListItem
                        comment={comment}
                        showImagePreview={showImagePreview}
                        setReplyFormCommentId={setReplyFormCommentId}
                      />

                      {replyFormCommentId === comment.id && (
                        <ReplyCommentForm setReplyFormCommentId={setReplyFormCommentId} parentId={comment.id} />
                      )}

                      {mainComments
                        .filter((reply: Comment) => reply.parentId === comment.id)
                        .map((reply: Comment) => (
                          <ReplyComment
                            key={reply.id}
                            comment={reply}
                            parentId={comment.id}
                            replyFormCommentId={replyFormCommentId}
                            setReplyFormCommentId={setReplyFormCommentId}
                          />
                        ))}
                    </div>
                  )
              )}
            </CommentListItemWrapper>
          ) : (
            <NoCommentsContainer $uploading={commentImagePath.length !== 0}>
              <CloseSquareTwoTone twoToneColor="#6BA2E6" />
              <h1>No comments yet.</h1>
              <p>첫번째 댓글을 작성해보세요!</p>
            </NoCommentsContainer>
          )}

          <CommentInput showImagePreview={showImagePreview} />
        </>
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </CommentListWrapper>
  );
};

export default CommentList;
