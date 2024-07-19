import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ModalCarousel from './ModalCarousel';
import ModalContent from './ModalContent';
import { hidePostModal } from 'store/actions/postAction';
import { modalAnimation } from 'styles/Common/animation';
import { ModalOutsideArea, PostModalContentsWrapper, PostModalBtn, PostModalWrapper } from 'styles/Modal/postModal';

const PostModal = () => {
  const dispatch = useDispatch();

  const hideModal = useCallback(() => {
    dispatch(hidePostModal());
  }, []);

  return (
    <PostModalWrapper>
      <ModalOutsideArea onClick={hideModal}>
        <PostModalBtn onClick={hideModal} />
      </ModalOutsideArea>

      <PostModalContentsWrapper
        initial={modalAnimation.initial}
        animate={modalAnimation.animate}
        exit={modalAnimation.exit}
      >
        <ModalCarousel />
        <ModalContent />
      </PostModalContentsWrapper>
    </PostModalWrapper>
  );
};

export default PostModal;
