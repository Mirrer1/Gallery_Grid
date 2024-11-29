import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import { backURL } from 'config';
import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import {
  addModalCommentRequest,
  modalCommentRemoveUploadedImage,
  modalCommentUploadImageRequest
} from 'store/actions/postAction';

import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import {
  ModalCommentEmojiPicker,
  ModalCommentFormItem,
  ModalCommentFormWrapper,
  ModalCommentExtrasWrapper,
  ModalCommentFormReply,
  ModalCommentFormImage
} from 'styles/Modal/modalCommentList';

type ModalCommentFormProps = {
  replyId: number | null;
  replyUser: string | null;
  setReplyId: React.Dispatch<React.SetStateAction<number | null>>;
  showImagePreview: (src: string) => void;
};

const ModalCommentForm = ({ replyId, replyUser, setReplyId, showImagePreview }: ModalCommentFormProps) => {
  const dispatch = useDispatch();
  const { fileInputRef, onFileChange } = useFileUpload(modalCommentUploadImageRequest, { showWarning: false });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, onChangeComment, setComment] = useInput('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const {
    modalCommentImagePath,
    modalCommentUploadImageLoading,
    singlePost,
    addModalCommentLoading,
    addModalCommentDone
  } = useSelector((state: RootState) => state.post);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(modalCommentRemoveUploadedImage());
  }, []);

  const handleCancel = useCallback(() => {
    setReplyId(null);
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!comment.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      if (modalCommentImagePath.length > 0) {
        modalCommentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', singlePost.id);
      if (replyId) formData.append('parentId', replyId.toString());

      dispatch(addModalCommentRequest(formData));
    },
    [comment, modalCommentImagePath, singlePost, replyId, replyUser]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        onSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [comment, modalCommentImagePath, singlePost, replyId, replyUser]
  );

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if ((replyId || modalCommentImagePath.length !== 0) && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyId, modalCommentImagePath]);

  useEffect(() => {
    if (addModalCommentDone) setComment('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [addModalCommentDone]);

  useEffect(() => {
    if (comment.length === 500) toast.warning('댓글은 500자 이하로 작성해주세요.');
  }, [comment]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <ModalCommentFormWrapper>
      {(replyId || modalCommentImagePath.length !== 0) && (
        <ModalCommentExtrasWrapper>
          {replyId && (
            <ModalCommentFormReply {...slideInTooltip}>
              <p>{replyUser}님에게 답글 작성중...</p>
              <CloseOutlined onClick={handleCancel} />
            </ModalCommentFormReply>
          )}

          {modalCommentImagePath.length !== 0 && (
            <ModalCommentFormImage key={modalCommentImagePath} {...slideInUploadImage}>
              <img
                src={`${backURL}/${modalCommentImagePath}`}
                alt="입력한 댓글의 첨부 이미지"
                onClick={() => showImagePreview(`${backURL}/${modalCommentImagePath}`)}
              />
              <DeleteOutlined onClick={handleRemoveImage} />
            </ModalCommentFormImage>
          )}
        </ModalCommentExtrasWrapper>
      )}

      <ModalCommentFormItem encType="multipart/form-data" $active={comment.length === 0} onSubmit={onSubmitForm}>
        <div>
          {modalCommentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input type="file" name="image" ref={fileInputRef} onChange={e => onFileChange(e, modalCommentImagePath)} />

          <SmileOutlined onClick={showEmojiPicker} />
          {showEmoji && EmojiPicker && (
            <ModalCommentEmojiPicker>
              <div onClick={closeEmojiPicker} />

              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            </ModalCommentEmojiPicker>
          )}

          <textarea
            placeholder="Type a Comment..."
            ref={textareaRef}
            value={comment}
            onChange={onChangeComment}
            onKeyDown={handleKeyDown}
            onInput={autoResize}
            maxLength={500}
            rows={1}
          />
        </div>

        <button type="submit">{addModalCommentLoading ? <LoadingOutlined /> : <SendOutlined />}</button>
      </ModalCommentFormItem>
    </ModalCommentFormWrapper>
  );
};

export default ModalCommentForm;
