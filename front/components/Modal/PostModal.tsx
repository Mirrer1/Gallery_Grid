import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalCarousel from './ModalCarousel';
import ModalContent from './ModalContent';
import EditModalCarousel from './EditModalCarousel';
import EditModalContent from './EditModalContent';
import { RootState } from 'store/reducers';
import { hidePostModal } from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import { ModalOutsideArea, PostModalContentsWrapper, PostModalBtn, PostModalWrapper } from 'styles/Modal/postModal';

const PostModal = () => {
  const dispatch = useDispatch();
  const { postEditMode } = useSelector((state: RootState) => state.post);

  const hideModal = useCallback(() => {
    dispatch(hidePostModal());
  }, []);

  return (
    <PostModalWrapper>
      <ModalOutsideArea onClick={hideModal}>
        <PostModalBtn onClick={hideModal} />
      </ModalOutsideArea>

      <PostModalContentsWrapper {...slideInModal}>
        {postEditMode ? <EditModalCarousel /> : <ModalCarousel />}
        {postEditMode ? <EditModalContent /> : <ModalContent />}
      </PostModalContentsWrapper>
    </PostModalWrapper>
  );
};

export default PostModal;
