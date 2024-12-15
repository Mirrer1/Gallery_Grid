import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import useInput from 'utils/useInput';
import useOverlays from 'utils/useOverlays';
import useFileUpload from 'utils/useFileUpload';
import { imgURL } from 'config';
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
  EditModalCommentFormSection,
  EditModalCommentImage,
  EditModalCommentImageWrapper,
  EditModalCommentWrapper
} from 'styles/Modal/editModalCommentForm';

type EditCommentFormProps = {
  reply: boolean;
  comment: Comment | IReplyComment;
  replyId: number | null;
  cancelEdit: () => void;
};

const EditModalCommentForm = ({ reply, comment, replyId, cancelEdit }: EditCommentFormProps) => {
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, onChangeText, setText] = useInput<string>('');
  const { editModalCommentImagePath, editModalCommentLoading } = useSelector((state: RootState) => state.post);
  const { fileInputRef, onFileChange, isUploading } = useFileUpload(editModalCommentUploadImageRequest, {
    showWarning: false
  });

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

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  useEffect(() => {
    if (text.length === 500) toast.warning('댓글은 500자 이하로 작성해주세요.');
  }, [text]);

  useEffect(() => {
    const imageSrc = reply ? (comment as IReplyComment).ReplyImage?.src : (comment as Comment).CommentImage?.src;

    if (imageSrc) dispatch(executeModalCommentEdit(imageSrc));
    else dispatch(editModalCommentRemoveUploadedImage());

    setText(comment.content);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <EditModalCommentWrapper {...slideInTooltip}>
      <EditModalCommentFormSection encType="multipart/form-data" onSubmit={onSubmitForm}>
        <textarea
          ref={textareaRef}
          rows={6}
          maxLength={500}
          placeholder="댓글을 작성해주세요."
          value={text.replace(/\\n/g, '\n').replace(/␣/g, ' ')}
          onChange={onChangeText}
        />

        {editModalCommentImagePath.length !== 0 && (
          <EditModalCommentImageWrapper>
            <EditModalCommentImage key={editModalCommentImagePath} {...slideInUploadImage}>
              <img
                src={imgURL(editModalCommentImagePath)}
                alt="입력한 댓글의 첨부 이미지"
                onClick={() => openImagePreview(`${editModalCommentImagePath}`)}
              />
              <DeleteOutlined onClick={handleRemoveImage} />
            </EditModalCommentImage>
          </EditModalCommentImageWrapper>
        )}

        <div>
          <div>
            {isUploading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
            <input
              type="file"
              name="image"
              multiple
              ref={fileInputRef}
              onChange={e => onFileChange(e, editModalCommentImagePath)}
            />

            <p>{text.length} / 500</p>
          </div>

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
