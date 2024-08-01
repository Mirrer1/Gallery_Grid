import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import { RootState } from 'store/reducers';
import { formatDate } from 'utils/useListTimes';
import { cancelPostEdit, hidePostModal } from 'store/actions/postAction';
import {
  EditModalBtn,
  EditModalContentHeader,
  EditModalContentWrapper,
  EditModalEmojiPicker,
  EditModalForm
} from 'styles/Modal/editModalContent';
import useInput from 'utils/useInput';
import { CloseOutlined, CompassOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { PostingEmojiPicker } from 'styles/Timeline/postingForm';
import { IEmojiData } from 'emoji-picker-react';
import { useLocation } from 'utils/useLocation';

const EditModalContent = () => {
  const dispatch = useDispatch();
  const { singlePost } = useSelector((state: RootState) => state.post);
  const [content, onChangeContent, setContent] = useInput<string>('');
  const { location, getLocation, setLocation, loading } = useLocation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [EmojiPicker, setEmojiPicker] =
    useState<React.ComponentType<{ onEmojiClick: (event: MouseEvent, emojiObject: IEmojiData) => void }>>();

  const onClickCancel = useCallback(() => {
    if (Router.pathname === '/timeline') dispatch(hidePostModal());
    else dispatch(cancelPostEdit());
  }, []);

  const setInitialLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker(prev => !prev);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setShowEmojiPicker(false);
  }, []);

  const onEmojiClick = useCallback(
    (event: MouseEvent, emojiObject: IEmojiData) => {
      setContent(prevText => prevText + emojiObject.emoji);
    },
    [setContent]
  );

  // const onSubmitForm = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (imagePaths.length === 0) {
  //       toast.warning('게시글에 이미지를 첨부해주세요.');
  //       return;
  //     }

  //     const formData = new FormData();
  //     imagePaths.forEach((image: string) => {
  //       formData.append('image', image);
  //     });
  //     if (content) formData.append('content', content);
  //     if (location) formData.append('location', location);

  //     dispatch(addPostRequest(formData));
  //   },
  //   [content, location, imagePaths]
  // );

  useEffect(() => {
    setContent(singlePost.content);

    if (typeof window !== 'undefined') {
      import('emoji-picker-react').then(module => {
        setEmojiPicker(() => module.default);
      });
    }
  }, []);

  return (
    <EditModalContentWrapper>
      <EditModalContentHeader>
        <div>
          <img
            src={
              singlePost.User.ProfileImage ? `http://localhost:3065/${singlePost.User.ProfileImage.src}` : '/user.jpg'
            }
            alt="author profile image"
          />

          <div>
            <h1>{singlePost.User.nickname}</h1>
            <p>
              {formatDate(singlePost.createdAt)}
              {singlePost.location && ` - ${singlePost.location}`}
            </p>
          </div>
        </div>
      </EditModalContentHeader>

      {/* onSubmit={onSubmitForm} */}
      <EditModalForm encType="multipart/form-data">
        <textarea
          maxLength={2000}
          placeholder="당신의 작품에 대한 이야기를 들려주세요."
          value={content}
          onChange={onChangeContent}
        />

        <p>{content.length} / 2000</p>
      </EditModalForm>

      <EditModalBtn>
        <div>
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

        <div>
          <button type="button">수정</button>
          <button type="button" onClick={onClickCancel}>
            취소
          </button>
        </div>
      </EditModalBtn>

      {showEmojiPicker && EmojiPicker && (
        <EditModalEmojiPicker>
          <div onClick={closeEmojiPicker} />

          <div>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        </EditModalEmojiPicker>
      )}
    </EditModalContentWrapper>
  );
};

export default EditModalContent;
