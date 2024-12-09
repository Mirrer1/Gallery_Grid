import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

import useImagePreview from 'utils/useImagePreview';
import ImagePreview from 'components/Modal/ImagePreviewModal';
import { RootState } from 'store/reducers';
import { postRemoveUploadedImage, postReorderUploadedImage } from 'store/actions/postAction';
import { PostingUploadImageItem, PostingUploadImageWrapper, UploadImages } from 'styles/Timeline/postingForm';
import { reorderPostingUploadImage, slideInPostingUploadImage } from 'styles/Common/animation';

const PostingImageManager = () => {
  const dispatch = useDispatch();
  const { postImagePaths } = useSelector((state: RootState) => state.post);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (index: number) => {
      if (draggedIndex === null) return;

      const reorderedPaths = [...postImagePaths];
      const [movedItem] = reorderedPaths.splice(draggedIndex, 1);
      reorderedPaths.splice(index, 0, movedItem);

      dispatch(postReorderUploadedImage(reorderedPaths));
      setDraggedIndex(null);
    },
    [draggedIndex, postImagePaths, dispatch]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (draggedIndex === null || touchPosition === null) {
        setDraggedIndex(null);
        return;
      }

      const parent = e.currentTarget.closest('section')!;
      const children = Array.from(parent.children);

      const dropIndex = children.findIndex(child => {
        const rect = child.getBoundingClientRect();
        return (
          touchPosition.x >= rect.left &&
          touchPosition.x <= rect.right &&
          touchPosition.y >= rect.top &&
          touchPosition.y <= rect.bottom
        );
      });

      if (dropIndex !== -1 && draggedIndex !== dropIndex) {
        const reorderedPaths = [...postImagePaths];
        const [movedItem] = reorderedPaths.splice(draggedIndex, 1);
        reorderedPaths.splice(dropIndex, 0, movedItem);

        dispatch(postReorderUploadedImage(reorderedPaths));
      }

      setDraggedIndex(null);
    },
    [draggedIndex, touchPosition, postImagePaths, dispatch]
  );

  const handleRemoveImage = useCallback(
    (image: string) => {
      dispatch(postRemoveUploadedImage(image));
    },
    [dispatch]
  );

  return (
    <>
      <UploadImages>
        {postImagePaths.map((path: string, index: number) => (
          <PostingUploadImageWrapper key={path} {...reorderPostingUploadImage}>
            <PostingUploadImageItem
              layout
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onTouchStart={e => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              {...slideInPostingUploadImage(index, postImagePaths.length - 1 - (postImagePaths.length % 5) + 1)}
            >
              <img src={path} alt={`업로드한 ${index}번째 이미지`} onClick={() => showImagePreview(path)} />
              <DeleteOutlined onClick={() => handleRemoveImage(path)} />
            </PostingUploadImageItem>
          </PostingUploadImageWrapper>
        ))}
      </UploadImages>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </>
  );
};

export default PostingImageManager;
