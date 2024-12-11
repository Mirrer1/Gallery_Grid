import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { hideImagePreview } from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import { UploadImage, UploadImagePreview } from 'styles/Modal/imagePreviewModal';

const ImagePreview = () => {
  const dispatch = useDispatch();
  const { previewImagePath } = useSelector((state: RootState) => state.post);

  const hidePreview = useCallback(() => {
    dispatch(hideImagePreview());
  }, []);

  return (
    <UploadImagePreview>
      <div onClick={hidePreview}>
        <CloseOutlined onClick={hidePreview} />
      </div>

      <UploadImage {...slideInModal}>
        <img src={previewImagePath} alt="프리뷰 이미지" />
      </UploadImage>
    </UploadImagePreview>
  );
};

export default ImagePreview;
