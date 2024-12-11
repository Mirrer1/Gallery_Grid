import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/reducers';
import ImagePreview from 'components/Modal/ImagePreviewModal';
import PostModal from 'components/Modal/PostModal';
import DeleteModal from 'components/Modal/DeleteModal';
import PostImageCarousel from 'components/Modal/PostImageCarousel';

const MODAL_COMPONENTS = {
  isPostModalVisible: PostModal,
  isDeleteModalVisible: DeleteModal,
  isCarouselVisible: PostImageCarousel,
  isPreviewVisible: ImagePreview
};

const OverlayProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const modalStates = useSelector((state: RootState) => ({
    isPostModalVisible: state.post.isPostModalVisible,
    isDeleteModalVisible: state.post.isDeleteModalVisible,
    isCarouselVisible: state.post.isCarouselVisible,
    isPreviewVisible: state.post.isPreviewVisible
  }));

  return (
    <>
      {Object.entries(MODAL_COMPONENTS).map(([key, Component]) =>
        modalStates[key as keyof typeof modalStates] ? <Component key={key} /> : null
      )}

      {children}
    </>
  );
};

export default OverlayProvider;
