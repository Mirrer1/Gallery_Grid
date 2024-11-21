import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Link from 'next/link';

import useInput from 'utils/useInput';
import formatDate from 'utils/useListTimes';
import useFileUpload from 'utils/useFileUpload';
import { RootState } from 'store/reducers';
import { Comment, IReplyComment } from 'store/types/postType';
import {
  editCommentRemoveUploadedImage,
  editCommentRequest,
  editCommentUploadImageRequest,
  executeCommentEdit
} from 'store/actions/postAction';
import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import {
  EditCommentFormSection,
  EditCommentBtn,
  EditCancelBtn,
  EditCommentImageWrapper,
  EditCommentImage,
  EditCommentHeader,
  EditCommentWrapper
} from 'styles/Timeline/editCommentForm';

type EditCommentFormProps = {
  reply: boolean;
  comment: Comment | IReplyComment;
  replyId: number | null;
  cancelEdit: () => void;
  showImagePreview: (src: string) => void;
};

const EditCommentForm = ({ reply, comment, replyId, cancelEdit, showImagePreview }: EditCommentFormProps) => {
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, onChangeText, setText] = useInput<string>('');
  const { fileInputRef, onFileChange } = useFileUpload(editCommentUploadImageRequest, { showWarning: false });
  const { editCommentUploadImageLoading, commentVisiblePostId, editCommentImagePath, editCommentLoading } = useSelector(
    (state: RootState) => state.post
  );

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(editCommentRemoveUploadedImage());
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!text.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      if (editCommentImagePath.length > 0) {
        editCommentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', text);
      formData.append('commentId', comment.id.toString());
      if (replyId) formData.append('parentId', replyId.toString());

      dispatch(editCommentRequest(formData));
    },
    [text, editCommentImagePath, commentVisiblePostId, replyId]
  );

  useEffect(() => {
    if (text.length === 500) toast.warning('댓글은 500자 이하로 작성해주세요.');
  }, [text]);

  useEffect(() => {
    const imageSrc = reply ? (comment as IReplyComment).ReplyImage?.src : (comment as Comment).CommentImage?.src;

    if (imageSrc) dispatch(executeCommentEdit(imageSrc));
    else dispatch(editCommentRemoveUploadedImage());

    setText(comment.content);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <EditCommentWrapper $reply={reply}>
      <EditCommentHeader>
        <img
          src={comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'}
          alt={`${comment.User.nickname}의 프로필 이미지`}
          onClick={() =>
            showImagePreview(
              comment.User.ProfileImage ? `http://localhost:3065/${comment.User.ProfileImage.src}` : '/user.jpg'
            )
          }
        />

        <div>
          <div>
            <Link href={`/user/${comment.UserId}`}>{comment.User.nickname}</Link>
            {comment.Post?.UserId === comment.UserId && <p>작성자</p>}
          </div>

          <p>{formatDate(comment.createdAt)}</p>
        </div>
      </EditCommentHeader>

      <EditCommentFormSection {...slideInTooltip} encType="multipart/form-data" onSubmit={onSubmitForm}>
        <textarea
          ref={textareaRef}
          rows={6}
          maxLength={500}
          placeholder="댓글을 작성해주세요."
          value={text}
          onChange={onChangeText}
        />

        {editCommentImagePath.length !== 0 && (
          <EditCommentImageWrapper>
            <EditCommentImage key={editCommentImagePath} {...slideInUploadImage}>
              <img
                src={`http://localhost:3065/${editCommentImagePath}`}
                alt="입력한 댓글의 첨부 이미지"
                onClick={() => showImagePreview(`http://localhost:3065/${editCommentImagePath}`)}
              />
              <DeleteOutlined onClick={handleRemoveImage} />
            </EditCommentImage>
          </EditCommentImageWrapper>
        )}

        <div>
          <div>
            {editCommentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
            <input
              type="file"
              name="image"
              multiple
              ref={fileInputRef}
              onChange={e => onFileChange(e, editCommentImagePath)}
            />

            <p>{text.length} / 500</p>
          </div>

          <div>
            <EditCommentBtn type="submit" $active={text.length !== 0}>
              {editCommentLoading ? <LoadingOutlined /> : <p>수정</p>}
            </EditCommentBtn>

            <EditCancelBtn type="button" onClick={cancelEdit}>
              <p>취소</p>
            </EditCancelBtn>
          </div>
        </div>
      </EditCommentFormSection>
    </EditCommentWrapper>
  );
};

export default EditCommentForm;
