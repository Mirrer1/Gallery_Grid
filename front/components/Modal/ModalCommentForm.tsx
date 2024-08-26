import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import { modalCommentRemoveUploadedImage, modalCommentUploadImageRequest } from 'store/actions/postAction';
import { slideInUploadImage } from 'styles/Common/animation';
import {
  ModalCommentInputImage,
  ModalCommentInputImageWrapper,
  ModalCommentEmojiPicker,
  ModalCommentFormItem,
  ModalCommentFormWrapper
} from 'styles/Modal/modalCommentList';

type ModalCommentFormProps = {
  showImagePreview: (src: string) => void;
  // replyId: number | null;
  // replyUser: string | null;
  // setReplyId: React.Dispatch<React.SetStateAction<number | null>>;
};

const ModalCommentForm = ({ showImagePreview }: ModalCommentFormProps) => {
  const dispatch = useDispatch();
  const { fileInputRef, onFileChange } = useFileUpload(modalCommentUploadImageRequest, { showWarning: false });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, onChangeComment, setComment] = useInput('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const { modalCommentImagePath, modalCommentUploadImageLoading, singlePost, addCommentLoading } = useSelector(
    (state: RootState) => state.post
  );

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(modalCommentRemoveUploadedImage());
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

      // dispatch(addCommentRequest(formData));

      setComment('');
    },
    [comment, modalCommentImagePath, singlePost.id]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        console.log(comment);
      }
    },
    [comment]
  );

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (comment.length === 500) toast.warning('댓글은 500자 이하로 작성해주세요.');
  }, [comment]);

  return (
    <ModalCommentFormWrapper>
      {modalCommentImagePath.length !== 0 && (
        <ModalCommentInputImageWrapper>
          <ModalCommentInputImage key={modalCommentImagePath} {...slideInUploadImage}>
            <img
              src={`http://localhost:3065/${modalCommentImagePath}`}
              alt="입력한 댓글의 첨부 이미지"
              onClick={() => showImagePreview(`http://localhost:3065/${modalCommentImagePath}`)}
            />
            <DeleteOutlined onClick={handleRemoveImage} />
          </ModalCommentInputImage>
        </ModalCommentInputImageWrapper>
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

        <button type="submit">{addCommentLoading ? <LoadingOutlined /> : <SendOutlined />}</button>
      </ModalCommentFormItem>
    </ModalCommentFormWrapper>
  );
};

export default ModalCommentForm;
