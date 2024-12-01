import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ModalCarousel from './ModalCarousel';
import ModalContent from './ModalContent';
import EditModalCarousel from './EditModalCarousel';
import EditModalContent from './EditModalContent';
import { RootState } from 'store/reducers';
import { hidePostModal } from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import { ModalOutsideArea, PostModalContentsWrapper, PostModalBtn, PostModalWrapper } from 'styles/Modal/postModal';

const PostModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postEditMode, isPostModalVisible } = useSelector((state: RootState) => state.post);

  const hideModal = useCallback(() => {
    if (router.pathname === '/post/[id]') return;
    dispatch(hidePostModal());
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (isPostModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isPostModalVisible]);

  return (
    <PostModalWrapper onTouchMove={handleTouchMove}>
      <ModalOutsideArea onClick={hideModal}>
        {router.pathname !== '/post/[id]' && <PostModalBtn onClick={hideModal} />}
      </ModalOutsideArea>

      <PostModalContentsWrapper {...slideInModal}>
        {postEditMode ? <EditModalCarousel /> : <ModalCarousel />}
        {postEditMode ? <EditModalContent /> : <ModalContent />}
      </PostModalContentsWrapper>
    </PostModalWrapper>
  );
};

export default PostModal;
