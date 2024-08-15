import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import CommentForm from './CommentForm';
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
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const {
    isCommentListVisible,
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
    if (translateY > 300) {
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
      style={{ bottom: `${-translateY}px` }}
      {...slideInFromBottom()}
    >
      <CommentListHeader onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <CaretDownOutlined onClick={onHideComment} />
        <div />
      </CommentListHeader>

      {loadCommentsLoading ? (
        <CommentsLoading>
          <LoadingOutlined />
        </CommentsLoading>
      ) : (
        <>
          {mainComments?.length > 0 ? (
            <CommentListItemWrapper ref={commentListRef}>
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
            <NoCommentsContainer>
              <CloseSquareTwoTone twoToneColor="#6BA2E6" />
              <h1>No comments yet.</h1>
              <p>첫번째 댓글을 작성해보세요!</p>
            </NoCommentsContainer>
          )}

          <CommentForm showImagePreview={showImagePreview} />
        </>
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </CommentListWrapper>
  );
};

export default CommentList;
