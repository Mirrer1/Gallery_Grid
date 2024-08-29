import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import useInput from 'utils/useInput';
import formatDate from 'utils/useListTimes';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { RootState } from 'store/reducers';
import { Comment, IReplyComment } from 'store/types/postType';
import {
  editModalCommentRemoveUploadedImage,
  editModalCommentRequest,
  editModalCommentUploadImageRequest,
  executeModalCommentEdit
} from 'store/actions/postAction';
import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import {
  EditModalCancelBtn,
  EditModalCommentBtn,
  EditModalCommentEmojiPicker,
  EditModalCommentFormSection,
  EditModalCommentHeader,
  EditModalCommentImage,
  EditModalCommentImageWrapper,
  EditModalCommentWrapper
} from 'styles/Modal/editModalCommentForm';

type EditCommentFormProps = {
  reply: boolean;
  comment: Comment | IReplyComment;
  replyId: number | null;
  cancelEdit: () => void;
  showImagePreview: (src: string) => void;
};

const EditModalCommentForm = ({ reply, comment, replyId, cancelEdit, showImagePreview }: EditCommentFormProps) => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput<string>('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setText);
  const { fileInputRef, onFileChange } = useFileUpload(editModalCommentUploadImageRequest, { showWarning: false });
  const { editModalCommentUploadImageLoading, editModalCommentImagePath, editModalCommentLoading } = useSelector(
    (state: RootState) => state.post
  );

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(editModalCommentRemoveUploadedImage());
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!text.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      if (text.length > 500) {
        toast.warning('댓글은 500자 이하로 작성해주세요.');
        return;
      }

      const formData = new FormData();
      if (editModalCommentImagePath.length > 0) {
        editModalCommentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', text);
      formData.append('commentId', comment.id.toString());
      if (replyId) formData.append('parentId', replyId.toString());

      dispatch(editModalCommentRequest(formData));
    },
    [text, editModalCommentImagePath, replyId]
  );

  useEffect(() => {
    const imageSrc = reply ? (comment as IReplyComment).ReplyImage?.src : (comment as Comment).CommentImage?.src;

    if (imageSrc) dispatch(executeModalCommentEdit(imageSrc));
    else dispatch(editModalCommentRemoveUploadedImage());

    setText(comment.content);
  }, []);

  return (
    <EditModalCommentWrapper $reply={reply}>
      <EditModalCommentHeader>
        <img
          src={comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'}
          alt={`${comment.User.nickname}의 프로필 이미지`}
        />

        <div>
          <div>
            <h1>{comment.User.nickname}</h1>
            {comment.Post?.UserId === comment.UserId && <p>작성자</p>}
          </div>

          <p>{formatDate(comment.createdAt)}</p>
        </div>
      </EditModalCommentHeader>

      <EditModalCommentFormSection {...slideInTooltip} encType="multipart/form-data" onSubmit={onSubmitForm}>
        <textarea rows={6} maxLength={500} placeholder="댓글을 작성해주세요." value={text} onChange={onChangeText} />
        <p>{text.length} / 500</p>

        {editModalCommentImagePath.length !== 0 && (
          <EditModalCommentImageWrapper>
            <EditModalCommentImage key={editModalCommentImagePath} {...slideInUploadImage}>
              <img
                src={`http://localhost:3065/${editModalCommentImagePath}`}
                alt="입력한 댓글의 첨부 이미지"
                onClick={() => showImagePreview(`http://localhost:3065/${editModalCommentImagePath}`)}
              />
              <DeleteOutlined onClick={handleRemoveImage} />
            </EditModalCommentImage>
          </EditModalCommentImageWrapper>
        )}

        <div>
          <div>
            {editModalCommentUploadImageLoading ? (
              <LoadingOutlined />
            ) : (
              <PaperClipOutlined onClick={onClickImageUpload} />
            )}
            <input
              type="file"
              name="image"
              multiple
              ref={fileInputRef}
              onChange={e => onFileChange(e, editModalCommentImagePath)}
            />

            <SmileOutlined onClick={showEmojiPicker} />
          </div>

          {showEmoji && EmojiPicker && (
            <EditModalCommentEmojiPicker>
              <div onClick={closeEmojiPicker} />

              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            </EditModalCommentEmojiPicker>
          )}

          <div>
            <EditModalCommentBtn type="submit" $active={text.length !== 0}>
              {editModalCommentLoading ? <LoadingOutlined /> : <p>수정</p>}
            </EditModalCommentBtn>

            <EditModalCancelBtn type="button" onClick={cancelEdit}>
              <p>취소</p>
            </EditModalCancelBtn>
          </div>
        </div>
      </EditModalCommentFormSection>
    </EditModalCommentWrapper>
  );
};

export default EditModalCommentForm;
