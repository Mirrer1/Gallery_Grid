import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined, CompassOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { IEmojiData } from 'emoji-picker-react';
import { toast } from 'react-toastify';
import Router from 'next/router';

import useInput from 'utils/useInput';
import { useLocation } from 'utils/useLocation';
import { RootState } from 'store/reducers';
import { formatDate } from 'utils/useListTimes';
import { cancelPostEdit, editPostRequest, hidePostModal } from 'store/actions/postAction';
import {
  EditModalBtn,
  EditModalContentHeader,
  EditModalContentWrapper,
  EditModalEmojiPicker,
  EditModalForm
} from 'styles/Modal/editModalContent';

const EditModalContent = () => {
  const dispatch = useDispatch();
  const { singlePost, imagePaths, editPostLoading } = useSelector((state: RootState) => state.post);
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
      if (singlePost) formData.append('postId', singlePost.id);

      dispatch(editPostRequest(formData));
    },
    [content, location, imagePaths, singlePost]
  );

  useEffect(() => {
    setContent(singlePost.content);
    setLocation(singlePost.location);

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
              {location && ` - ${location}`}
            </p>
          </div>
        </div>
      </EditModalContentHeader>

      <EditModalForm id="editForm" encType="multipart/form-data" onSubmit={onSubmitForm}>
        <textarea
          maxLength={2000}
          placeholder="당신의 작품에 대한 이야기를 들려주세요."
          value={content}
          onChange={onChangeContent}
        />

        <p>{content.length} / 2000</p>
      </EditModalForm>

      <EditModalBtn $active={content.length !== 0} $edit={editPostLoading}>
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
          <button type="submit" form="editForm">
            {editPostLoading ? <LoadingOutlined /> : <>수정</>}
          </button>

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
