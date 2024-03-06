import React, { useCallback } from 'react';

import ModalCarousel from './ModalCarousel';
import ModalContent from './ModalContent';
import { ModalOutsideArea, PostModalBtn, PostModalWrapper } from 'styles/Modal/postModal';

const PostModal = () => {
  const hideModal = useCallback(() => {
    console.log('모달 닫기!');
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
