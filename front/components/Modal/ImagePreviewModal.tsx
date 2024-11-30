import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { slideInModal } from 'styles/Common/animation';
import { UploadImage, UploadImagePreview } from 'styles/Modal/imagePreviewModal';

type ImagePreviewProps = {
  imagePreview: string | null;
  hideImagePreview: () => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ imagePreview, hideImagePreview }) => {
  if (!imagePreview) return null;

  return (
    <UploadImagePreview>
      <div onClick={hideImagePreview}>
        <CloseOutlined onClick={hideImagePreview} />
      </div>

      <UploadImage {...slideInModal}>
        <img src={imagePreview} alt="업로드한 이미지" />
      </UploadImage>
    </UploadImagePreview>
  );
};

export default ImagePreview;
