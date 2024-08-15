import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import {
  addReplyCommentRequest,
  replyCommentRemoveUploadedImage,
  replyCommentUploadImageRequest
} from 'store/actions/postAction';
import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import {
  ReplyCommentWrapper,
  ReplyCommentEmojiPicker,
  ReplyCommentBtn,
  ReplyCancelBtn,
  ReplyCommentImageWrapper,
  ReplyCommentImage
} from 'styles/Timeline/replyCommentForm';

type ReplyCommentFormProps = {
  setReplyFormCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  parentId: number;
};

const ReplyCommentForm = ({ setReplyFormCommentId, parentId }: ReplyCommentFormProps) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput<string>('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const { fileInputRef, onFileChange } = useFileUpload(replyCommentUploadImageRequest, { showWarning: false });
  const {
    replyCommentImagePath,
    replyCommentUploadImageLoading,
    commentVisiblePostId,
    addReplyCommentDone,
    addReplyCommentLoading
  } = useSelector((state: RootState) => state.post);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCancel = useCallback(() => {
    setReplyFormCommentId(null);
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(replyCommentRemoveUploadedImage());
  }, []);

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
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
      if (replyCommentImagePath.length > 0) {
        replyCommentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', commentVisiblePostId);
      formData.append('parentId', parentId.toString());

      dispatch(addReplyCommentRequest(formData));
    },
    [comment, replyCommentImagePath, commentVisiblePostId]
  );

  useEffect(() => {
    if (addReplyCommentDone) {
      setComment('');
    }
  }, [addReplyCommentDone]);

  return (
    <ReplyCommentWrapper {...slideInTooltip} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea
        rows={6}
        maxLength={500}
        placeholder="댓글을 작성해주세요."
        value={comment}
        onChange={onChangeComment}
      />
      <p>{comment.length} / 500</p>

      {replyCommentImagePath.length !== 0 && (
        <ReplyCommentImageWrapper>
          <ReplyCommentImage key={replyCommentImagePath} {...slideInUploadImage}>
            <img
              src={`http://localhost:3065/${replyCommentImagePath}`}
              alt="입력한 댓글의 첨부 이미지"
              onClick={() => showImagePreview(`http://localhost:3065/${replyCommentImagePath}`)}
            />
            <DeleteOutlined onClick={handleRemoveImage} />
          </ReplyCommentImage>
        </ReplyCommentImageWrapper>
      )}

      <div>
        <div>
          {replyCommentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input
            type="file"
            name="image"
            multiple
            ref={fileInputRef}
            onChange={e => onFileChange(e, replyCommentImagePath)}
          />

          <SmileOutlined onClick={showEmojiPicker} />
        </div>

        {showEmoji && EmojiPicker && (
          <ReplyCommentEmojiPicker>
            <div onClick={closeEmojiPicker} />

            <div>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </ReplyCommentEmojiPicker>
        )}

        <div>
          <ReplyCommentBtn type="submit" $active={comment.length !== 0}>
            {addReplyCommentLoading ? <LoadingOutlined /> : <p>등록</p>}
          </ReplyCommentBtn>

          <ReplyCancelBtn type="button" onClick={handleCancel}>
            <p>취소</p>
          </ReplyCancelBtn>
        </div>
      </div>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </ReplyCommentWrapper>
  );
};

export default ReplyCommentForm;
