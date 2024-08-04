import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AlertOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  SendOutlined,
  ShareAltOutlined,
  SmileOutlined
} from '@ant-design/icons';

import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import ModalCommentList from './ModalCommentList';
import { RootState } from 'store/reducers';
import { formatDate } from 'utils/useListTimes';
import {
  executePostEdit,
  modalCommentRemoveUploadedImage,
  modalCommentUploadImageRequest,
  showDeleteModal
} from 'store/actions/postAction';

import { slideInTooltip, slideInUploadImage } from 'styles/Common/animation';
import { Tooltip, TooltipBtn, TooltipOutsideArea } from 'styles/Common/tooltip';
import {
  ModalCommentInput,
  ModalCommentInputImage,
  ModalCommentInputImageWrapper,
  ModalCommentInputWrapper,
  ModalContentHeader,
  ModalContentOptions,
  ModalContentText,
  ModalContentWrapper
} from 'styles/Modal/modalContent';

const ModalContent = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { singlePost, modalCommentImagePath, modalCommentUploadImageLoading } = useSelector(
    (state: RootState) => state.post
  );

  const [comment, onChangeComment] = useInput('');
  const { fileInputRef, onFileChange } = useFileUpload(modalCommentUploadImageRequest, { showWarning: false });
  const [isModalCommentListVisible, setIsModalCommentListVisible] = useState<boolean>(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleTooltip = useCallback(() => {
    setIsTooltipVisible(true);
  }, [isTooltipVisible]);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
  }, []);

  const openDeleteModal = useCallback((postId: number) => {
    dispatch(showDeleteModal(postId));
  }, []);

  const onToggleComment = useCallback(() => {
    setIsModalCommentListVisible(prev => !prev);
    if (isModalCommentListVisible && modalCommentImagePath.length !== 0) dispatch(modalCommentRemoveUploadedImage());
  }, [isModalCommentListVisible, modalCommentImagePath]);

  const handleRemoveImage = useCallback(() => {
    dispatch(modalCommentRemoveUploadedImage());
  }, []);

  const openEditModal = useCallback(() => {
    setIsTooltipVisible(false);
    dispatch(executePostEdit());
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(comment);
      }
    },
    [comment]
  );

  return (
    <ModalContentWrapper>
      <ModalContentHeader>
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
              {singlePost.location && ` - ${singlePost.location}`}
            </p>
          </div>
        </div>

        <div>
          <button type="button">Follow</button>
          <MoreOutlined onClick={handleTooltip} />

          {isTooltipVisible && (
            <Tooltip {...slideInTooltip} $visible={isTooltipVisible}>
              <TooltipOutsideArea onClick={hideTooltip} />

              {me?.id === singlePost.User.id ? (
                <TooltipBtn>
                  <button type="button" onClick={openEditModal}>
                    <EditOutlined />
                    수정
                  </button>
                  <button type="button" onClick={() => openDeleteModal(singlePost.id)}>
                    <DeleteOutlined />
                    삭제
                  </button>
                </TooltipBtn>
              ) : (
                <TooltipBtn>
                  <button type="button">
                    <ShareAltOutlined />
                    공유
                  </button>
                  <button type="button">
                    <AlertOutlined />
                    신고
                  </button>
                </TooltipBtn>
              )}
            </Tooltip>
          )}
        </div>
      </ModalContentHeader>

      {isModalCommentListVisible ? (
        <ModalCommentList isModalCommentListVisible={isModalCommentListVisible} />
      ) : (
        <ModalContentText>{singlePost.content}</ModalContentText>
      )}

      <ModalContentOptions $isModalCommentListVisible={isModalCommentListVisible}>
        <div>
          <LikeOutlined />
          <CommentOutlined onClick={onToggleComment} />
        </div>

        <div>
          <p>좋아요 114개</p>
          {/* 좋아요 없으면 "가장 먼저 좋아요를 눌러보세요" 문구로 대체 */}
          <p>댓글 29개</p>
        </div>
      </ModalContentOptions>

      <ModalCommentInputWrapper $uploading={modalCommentImagePath.length !== 0}>
        {modalCommentImagePath.length !== 0 && (
          <ModalCommentInputImageWrapper>
            <ModalCommentInputImage key={modalCommentImagePath} {...slideInUploadImage}>
              <img src={`http://localhost:3065/${modalCommentImagePath}`} alt="입력한 댓글의 첨부 이미지" />
              <DeleteOutlined onClick={handleRemoveImage} />
            </ModalCommentInputImage>
          </ModalCommentInputImageWrapper>
        )}

        {isModalCommentListVisible && (
          <ModalCommentInput $active={comment.length === 0} $uploading={modalCommentImagePath.length !== 0}>
            <div>
              {modalCommentUploadImageLoading ? (
                <LoadingOutlined />
              ) : (
                <PaperClipOutlined onClick={onClickImageUpload} />
              )}
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={e => onFileChange(e, modalCommentImagePath)}
              />

              <SmileOutlined />
              <input
                type="text"
                placeholder="Type a Comment..."
                value={comment}
                onChange={onChangeComment}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <SendOutlined />
            </div>
          </ModalCommentInput>
        )}
      </ModalCommentInputWrapper>
    </ModalContentWrapper>
  );
};

export default ModalContent;
