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

import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import { addCommentRequest, commentRemoveUploadedImage, commentUploadImageRequest } from 'store/actions/postAction';
import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import {
  CommentEmojiPicker,
  CommentFormInput,
  CommentFormImage,
  CommentFormWrapper,
  CommentExtrasWrapper,
  CommentFormReply
} from 'styles/Timeline/commentList';

type CommentFormProps = {
  showImagePreview: (src: string) => void;
  replyId: number | null;
  replyUser: string | null;
  setReplyId: React.Dispatch<React.SetStateAction<number | null>>;
};

const CommentForm = ({ showImagePreview, replyId, replyUser, setReplyId }: CommentFormProps) => {
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      if (commentImagePath.length > 0) {
        commentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', commentVisiblePostId);
      if (replyId) formData.append('parentId', replyId.toString());

      dispatch(addCommentRequest(formData));
    },
    [comment, commentImagePath, commentVisiblePostId, replyId, replyUser]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        onSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [comment, commentImagePath, commentVisiblePostId, replyId, replyUser]
  );

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if ((replyId || commentImagePath.length !== 0) && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyId, commentImagePath]);

  useEffect(() => {
    if (addCommentDone) setComment('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [addCommentDone]);

  useEffect(() => {
    if (comment.length === 500) toast.warning('댓글은 500자 이하로 작성해주세요.');
  }, [comment]);

  return (
    <CommentFormWrapper>
      {(replyId || commentImagePath.length !== 0) && (
        <CommentExtrasWrapper>
          {replyId && (
            <CommentFormReply {...slideInTooltip}>
              <p>{replyUser}님에게 답글 작성중...</p>
              <CloseOutlined onClick={handleCancel} />
            </CommentFormReply>
          )}

          {commentImagePath.length !== 0 && (
            <CommentFormImage key={commentImagePath} {...slideInUploadImage}>
              <img
                src={`http://localhost:3065/${commentImagePath}`}
                alt="입력한 댓글의 첨부 이미지"
                onClick={() => showImagePreview(`http://localhost:3065/${commentImagePath}`)}
              />
              <DeleteOutlined onClick={handleRemoveImage} />
            </CommentFormImage>
          )}
        </CommentExtrasWrapper>
      )}

      <CommentFormInput encType="multipart/form-data" $active={comment.length === 0} onSubmit={onSubmitForm}>
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

        <button type="submit">
          {addCommentLoading && !isPostModalVisible ? <LoadingOutlined /> : <SendOutlined />}
        </button>
      </CommentFormInput>
    </CommentFormWrapper>
  );
};

export default CommentForm;
