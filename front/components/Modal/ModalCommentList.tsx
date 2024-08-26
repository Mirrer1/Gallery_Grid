import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, CloseSquareTwoTone, LoadingOutlined } from '@ant-design/icons';

import ModalReplyComment from './ModalReplyComment';
import ModalCommentListItem from './ModalCommentListItem';
import ImagePreview from './ImagePreviewModal';
import ModalCommentForm from './ModalCommentForm';

import { RootState } from 'store/reducers';
import { Comment, IReplyComment } from 'store/types/postType';
import { loadModalCommentsRequest } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  ModalCommentListHeader,
  ModalCommentListItemWrapper,
  ModalCommentListContainer,
  ModalCommentsLoading,
  ModalNoCommentsContainer
} from 'styles/Modal/modalCommentList';

type ModalCommentListProps = {
  setIsModalCommentListVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCommentList = ({ setIsModalCommentListVisible }: ModalCommentListProps) => {
  const dispatch = useDispatch();
  const { singlePost, modalComments, loadModalCommentsLoading } = useSelector((state: RootState) => state.post);
  const [translateY, setTranslateY] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onHideComment = useCallback(() => {
    setIsModalCommentListVisible(false);
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
    dispatch(loadModalCommentsRequest(singlePost.id));
  }, [singlePost]);

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
            <div key={comment.id}>
              <ModalCommentListItem comment={comment} showImagePreview={showImagePreview} />

              {comment.Replies.map((reply: IReplyComment) => (
                <div key={reply.id}>
                  <ModalReplyComment
                    comment={reply}
                    // replyId={comment.id}
                    // setReplyId={setReplyId}
                    // setReplyUser={setReplyUser}
                    showImagePreview={showImagePreview}
                    // onEditClick={() => handleEditClick(reply.id, 'reply')}
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

      <ModalCommentForm
        showImagePreview={showImagePreview}
        // replyId={replyId}
        // replyUser={replyUser}
        // setReplyId={setReplyId}
      />

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </ModalCommentListContainer>
  );
};

export default ModalCommentList;
