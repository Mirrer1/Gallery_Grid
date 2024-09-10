import React, { useCallback, useEffect, useState } from 'react';
import {
  CloseOutlined,
  CompassOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import useImagePreview from 'utils/useImagePreview';
import { useLocation } from 'utils/useLocation';
import { RootState } from 'store/reducers';
import { addPostRequest, postRemoveUploadedImage, postUploadImagesRequest } from 'store/actions/postAction';
import { slideInUploadImage } from 'styles/Common/animation';
import { PostingBtn, PostingEmojiPicker, PostingWrapper, UploadImages } from 'styles/Timeline/postingForm';

const PostingForm = () => {
  const dispatch = useDispatch();
  const [content, onChangeContent, setContent] = useInput<string>('');
  const { location, getLocation, setLocation, loading } = useLocation();
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setContent);
  const { fileInputRef, onFileChange } = useFileUpload(postUploadImagesRequest, { maxFiles: 5, showWarning: true });

  const { postImagePaths, postUploadImagesLoading, addPostLoading, addPostDone } = useSelector(
    (state: RootState) => state.post
  );

  const setInitialLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (postImagePaths.length === 0) {
        toast.warning('게시글에 이미지를 첨부해주세요.');
        return;
      }

      if (!content.trim()) {
        toast.warning('게시글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      postImagePaths.forEach((image: string) => {
        formData.append('image', image);
      });
      formData.append('content', content);
      if (location) formData.append('location', location);

      dispatch(addPostRequest(formData));
    },
    [content, location, postImagePaths]
  );

  const handleRemoveImage = useCallback((image: string) => {
    dispatch(postRemoveUploadedImage(image));
  }, []);

  useEffect(() => {
    if (content.length === 2000) toast.warning('게시글은 2000자 이하로 작성해주세요.');
  }, [content]);

  useEffect(() => {
    if (addPostDone) {
      setContent('');
      setLocation(null);
    }
  }, [addPostDone]);

  return (
    <PostingWrapper $uploading={postImagePaths.length > 0} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea
        rows={6}
        maxLength={2000}
        placeholder="당신의 작품에 대한 이야기를 들려주세요."
        value={content}
        onChange={onChangeContent}
      />

      {postImagePaths.length > 0 && (
        <UploadImages>
          {postImagePaths.map((path: string, i: number) => (
            <motion.div key={path} {...slideInUploadImage}>
              <img
                src={`http://localhost:3065/${path}`}
                alt={`업로드한 ${i}번째 이미지`}
                onClick={() => showImagePreview(`http://localhost:3065/${path}`)}
              />
              <DeleteOutlined onClick={() => handleRemoveImage(path)} />
            </motion.div>
          ))}
        </UploadImages>
      )}

      <div>
        <div>
          {postUploadImagesLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input type="file" name="image" multiple ref={fileInputRef} onChange={e => onFileChange(e, postImagePaths)} />

          <SmileOutlined onClick={showEmojiPicker} />
          {location ? (
            <div onClick={setInitialLocation}>
              <p>{location}</p>
              <CloseOutlined />
            </div>
          ) : loading ? (
            <LoadingOutlined />
          ) : (
            <CompassOutlined onClick={getLocation} />
          )}
        </div>

        {showEmoji && EmojiPicker && (
          <PostingEmojiPicker>
            <div onClick={closeEmojiPicker} />

            <div>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </PostingEmojiPicker>
        )}

        <div>
          <p>{content.length} / 2000</p>

          <PostingBtn type="submit" $active={content.length !== 0}>
            {addPostLoading ? <LoadingOutlined /> : <p>Post</p>}
          </PostingBtn>
        </div>
      </div>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </PostingWrapper>
  );
};

export default PostingForm;
