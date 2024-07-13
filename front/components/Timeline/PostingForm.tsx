import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CloseOutlined, CompassOutlined, LoadingOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import { IEmojiData } from 'emoji-picker-react';
import { useDispatch } from 'react-redux';

import useInput from 'utils/useInput';
import { useLocation } from 'utils/useLocation';
import { addPostRequest } from 'store/actions/postAction';
import { PostingBtn, PostingEmojiPicker, PostingWrapper } from 'styles/Timeline/postingForm';

const PostingForm = () => {
  const dispatch = useDispatch();
  const [EmojiPicker, setEmojiPicker] =
    useState<React.ComponentType<{ onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void }>>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, onChangeContent, setContent] = useInput<string>('');
  const { location, getLocation, setLocation, loading } = useLocation();
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setImages(prevImages => [...prevImages, file]);
    }
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(addPostRequest({ content, location }));
    },
    [content, images, location]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('emoji-picker-react').then(module => {
        setEmojiPicker(() => module.default);
      });
    }
  }, []);

  return (
    <PostingWrapper encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea
        rows={6}
        maxLength={2000}
        placeholder="당신의 작품에 대한 이야기를 들려주세요."
        value={content}
        onChange={onChangeContent}
      />

      <div>
        <div>
          <PaperClipOutlined onClick={onClickImageUpload} />
          <input type="file" ref={fileInputRef} onChange={onFileChange} />

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
            Post
          </PostingBtn>
        </div>
      </div>
    </PostingWrapper>
  );
};

export default PostingForm;
