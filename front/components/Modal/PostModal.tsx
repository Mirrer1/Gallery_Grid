import React, { useCallback } from 'react';
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
  const { postEditMode, isPreviewVisible } = useSelector((state: RootState) => state.post);

  const hideModal = useCallback(() => {
    console.log('클릭!');

    if (router.pathname === '/post/[id]') return;
    dispatch(hidePostModal());
  }, []);

  return (
    <PostModalWrapper $isPreviewVisible={isPreviewVisible}>
      <ModalOutsideArea onClick={hideModal}>
        {router.pathname !== '/post/[id]' && <PostModalBtn onClick={hideModal} $isPreviewVisible={isPreviewVisible} />}
      </ModalOutsideArea>

      <PostModalContentsWrapper {...slideInModal}>
        {postEditMode ? <EditModalCarousel /> : <ModalCarousel />}
        {postEditMode ? <EditModalContent /> : <ModalContent />}
      </PostModalContentsWrapper>
    </PostModalWrapper>
  );
};

export default PostModal;
