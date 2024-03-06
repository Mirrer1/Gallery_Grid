import React, { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import PostModalCarousel from './PostModalCarousel';
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

      <PostModalCarousel />

      <div>모달 컨텐츠</div>
    </PostModalWrapper>
  );
};

export default PostModal;
