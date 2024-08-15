import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import { addCommentRequest, commentRemoveUploadedImage, commentUploadImageRequest } from 'store/actions/postAction';
import { slideInUploadImage } from 'styles/Common/animation';
import {
  CommentEmojiPicker,
  CommentForm,
  CommentInputImage,
  CommentInputImageWrapper,
  CommentInputWrapper
} from 'styles/Timeline/commentList';

type CommentInputProps = {
  showImagePreview: (src: string) => void;
};

const CommentInput = ({ showImagePreview }: CommentInputProps) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const { fileInputRef, onFileChange } = useFileUpload(commentUploadImageRequest, { showWarning: false });
  const {
    commentImagePath,
    commentUploadImageLoading,
    commentVisiblePostId,
    addCommentLoading,
    isPostModalVisible,
    addCommentDone
  } = useSelector((state: RootState) => state.post);

  const handleRemoveImage = useCallback(() => {
    dispatch(commentRemoveUploadedImage());
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!comment.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      if (comment.length > 500) {
        toast.warning('댓글은 500자 이하로 작성해주세요.');
        return;
      }

      const formData = new FormData();
      if (commentImagePath.length > 0) {
        commentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', commentVisiblePostId);

      dispatch(addCommentRequest(formData));
    },
    [comment, commentImagePath, commentVisiblePostId]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        onSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [comment]
  );

  useEffect(() => {
    if (addCommentDone) setComment('');
  }, [addCommentDone]);

  return (
    <CommentInputWrapper>
      {commentImagePath.length !== 0 && (
        <CommentInputImageWrapper>
          <CommentInputImage key={commentImagePath} {...slideInUploadImage}>
            <img
              src={`http://localhost:3065/${commentImagePath}`}
              alt="입력한 댓글의 첨부 이미지"
              onClick={() => showImagePreview(`http://localhost:3065/${commentImagePath}`)}
            />
            <DeleteOutlined onClick={handleRemoveImage} />
          </CommentInputImage>
        </CommentInputImageWrapper>
      )}

      <CommentForm encType="multipart/form-data" $active={comment.length === 0} onSubmit={onSubmitForm}>
        <div>
          {commentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input type="file" name="image" ref={fileInputRef} onChange={e => onFileChange(e, commentImagePath)} />

          <SmileOutlined onClick={showEmojiPicker} />
          {showEmoji && EmojiPicker && (
            <CommentEmojiPicker>
              <div onClick={closeEmojiPicker} />

              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            </CommentEmojiPicker>
          )}

          <input
            type="text"
            placeholder="Type a Comment..."
            value={comment}
            onChange={onChangeComment}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button type="submit">
          {addCommentLoading && !isPostModalVisible ? <LoadingOutlined /> : <SendOutlined />}
        </button>
      </CommentForm>
    </CommentInputWrapper>
  );
};

export default CommentInput;
