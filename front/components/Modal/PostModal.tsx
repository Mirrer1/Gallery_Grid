import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ModalCarousel from './ModalCarousel';
import ModalContent from './ModalContent';
import { hideCommentList, hidePostModal } from 'store/actions/postAction';
import { ModalOutsideArea, PostModalBtn, PostModalWrapper } from 'styles/Modal/postModal';

const PostModal = () => {
  const dispatch = useDispatch();

  const hideModal = useCallback(() => {
    dispatch(hidePostModal());
    dispatch(hideCommentList());
  }, []);

  return (
    <PostModalWrapper>
      <ModalOutsideArea onClick={hideModal}>
        <PostModalBtn />
      </ModalOutsideArea>

      <ModalCarousel />
      <ModalContent />
    </PostModalWrapper>
  );
};

export default PostModal;
