import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined, CompassOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import Router from 'next/router';

import ImagePreview from './ImagePreviewModal';
import useInput from 'utils/useInput';
import formatDate from 'utils/useListTimes';
import useEmojiPicker from 'utils/useEmojiPicker';
import useImagePreview from 'utils/useImagePreview';
import { useLocation } from 'utils/useLocation';
import { RootState } from 'store/reducers';
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
  const { singlePost, editPostImagePaths, editPostLoading } = useSelector((state: RootState) => state.post);
  const [content, onChangeContent, setContent] = useInput<string>('');
  const { location, getLocation, setLocation, loading } = useLocation();
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setContent);

  const onClickCancel = useCallback(() => {
    if (Router.pathname === '/timeline') dispatch(hidePostModal());
    else dispatch(cancelPostEdit());
  }, []);

  const setInitialLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (editPostImagePaths.length === 0) {
        toast.warning('게시글에 이미지를 첨부해주세요.');
        return;
      }

      if (!content.trim()) {
        toast.warning('게시글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      editPostImagePaths.forEach((image: string) => {
        formData.append('image', image);
      });
      formData.append('content', content);
      formData.append('postId', singlePost.id);
      if (location) formData.append('location', location);

      dispatch(editPostRequest(formData));
    },
    [content, location, editPostImagePaths, singlePost]
  );

  useEffect(() => {
    if (content.length === 2000) toast.warning('게시글은 2000자 이하로 작성해주세요.');
  }, [content]);

  useEffect(() => {
    setContent(singlePost.content);
    setLocation(singlePost.location);
  }, []);

  return (
    <EditModalContentWrapper>
      <EditModalContentHeader>
        <div>
          <img
            src={
              singlePost.User.ProfileImage ? `http://localhost:3065/${singlePost.User.ProfileImage.src}` : '/user.jpg'
            }
            alt="유저 프로필 이미지"
            onClick={() =>
              showImagePreview(
                singlePost.User.ProfileImage ? `http://localhost:3065/${singlePost.User.ProfileImage.src}` : '/user.jpg'
              )
            }
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

        <div>
          <button type="submit" form="editForm">
            {editPostLoading ? <LoadingOutlined /> : <>수정</>}
          </button>

          <button type="button" onClick={onClickCancel}>
            취소
          </button>
        </div>
      </EditModalBtn>

      {showEmoji && EmojiPicker && (
        <EditModalEmojiPicker>
          <div onClick={closeEmojiPicker} />

          <div>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        </EditModalEmojiPicker>
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </EditModalContentWrapper>
  );
};

export default EditModalContent;
