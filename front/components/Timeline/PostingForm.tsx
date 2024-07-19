import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CloseOutlined,
  CompassOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IEmojiData } from 'emoji-picker-react';

import useInput from 'utils/useInput';
import { useLocation } from 'utils/useLocation';
import { RootState } from 'store/reducers';
import { addPostRequest, removeUploadedImage, uploadImagesRequest } from 'store/actions/postAction';
import { modalAnimation } from 'styles/Common/animation';
import {
  PostingBtn,
  PostingEmojiPicker,
  PostingWrapper,
  UploadImage,
  UploadImagePreview,
  UploadImages
} from 'styles/Timeline/postingForm';
import { toast } from 'react-toastify';

const PostingForm = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imagePaths, uploadImagesLoading, addPostLoading, addPostDone } = useSelector(
    (state: RootState) => state.post
  );
  const { location, getLocation, setLocation, loading } = useLocation();
  const [content, onChangeContent, setContent] = useInput<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [EmojiPicker, setEmojiPicker] =
    useState<React.ComponentType<{ onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void }>>();

  const setInitialLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const onEmojiClick = useCallback(
    (event: MouseEvent, emojiObject: IEmojiData) => {
      setContent(prevText => prevText + emojiObject.emoji);
    },
    [setContent]
  );

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker(prev => !prev);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setShowEmojiPicker(false);
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files as FileList;
      if (imagePaths.length + files.length > 5) {
        toast.warning('이미지는 최대 5개까지 업로드할 수 있습니다.');
        return;
      }

      const imageFormData = new FormData();
      Array.from(files).forEach((file: File) => {
        imageFormData.append('image', file);
      });

      dispatch(uploadImagesRequest(imageFormData));
    },
    [imagePaths]
  );

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (imagePaths.length === 0) {
        toast.warning('게시글에 이미지를 첨부해주세요.');
        return;
      }

      const formData = new FormData();
      imagePaths.forEach((image: string) => {
        formData.append('image', image);
      });
      if (content) formData.append('content', content);
      if (location) formData.append('location', location);

      dispatch(addPostRequest(formData));
    },
    [content, location, imagePaths]
  );

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  const handleRemoveImage = useCallback((image: string) => {
    dispatch(removeUploadedImage(image));
  }, []);

  useEffect(() => {
    if (addPostDone) setContent('');
  }, [addPostDone]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('emoji-picker-react').then(module => {
        setEmojiPicker(() => module.default);
      });
    }
  }, []);

  return (
    <PostingWrapper $uploading={imagePaths.length > 0} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea
        rows={6}
        maxLength={2000}
        placeholder="당신의 작품에 대한 이야기를 들려주세요."
        value={content}
        onChange={onChangeContent}
      />

      {imagePaths.length > 0 && (
        <UploadImages>
          {imagePaths.map((path: string, i: number) => (
            <div key={i}>
              <img
                src={`http://localhost:3065/${path}`}
                alt={`${i} Uploaded Image`}
                onClick={() => showImagePreview(`http://localhost:3065/${path}`)}
              />
              <DeleteOutlined onClick={() => handleRemoveImage(path)} />
            </div>
          ))}
        </UploadImages>
      )}

      <div>
        <div>
          {uploadImagesLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input type="file" name="image" multiple ref={fileInputRef} onChange={onFileChange} />

          <SmileOutlined onClick={toggleEmojiPicker} />
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

        {showEmojiPicker && EmojiPicker && (
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

      {imagePreview && (
        <UploadImagePreview>
          <div onClick={hideImagePreview}>
            <CloseOutlined onClick={hideImagePreview} />
          </div>

          <UploadImage initial={modalAnimation.initial} animate={modalAnimation.animate} exit={modalAnimation.exit}>
            <img src={imagePreview} alt="Uploaded Image Preview" />
          </UploadImage>
        </UploadImagePreview>
      )}
    </PostingWrapper>
  );
};

export default PostingForm;
