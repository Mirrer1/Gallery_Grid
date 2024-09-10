import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AlertOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

import ImagePreview from './ImagePreviewModal';
import ModalCommentList from './ModalCommentList';
import formatDate from 'utils/useListTimes';
import useImagePreview from 'utils/useImagePreview';
import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import { executePostEdit, hideModalCommentList, showDeleteModal, showModalCommentList } from 'store/actions/postAction';

import { slideInTooltip } from 'styles/Common/animation';
import { Tooltip, TooltipBtn, TooltipOutsideArea } from 'styles/Common/tooltip';
import {
  ModalContentHeader,
  ModalContentOptions,
  ModalContentText,
  ModalContentWrapper
} from 'styles/Modal/modalContent';

const ModalContent = () => {
  const dispatch = useDispatch();
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const { me } = useSelector((state: RootState) => state.user);
  const { singlePost, modalCommentImagePath, isModalCommentListVisible } = useSelector(
    (state: RootState) => state.post
  );
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleTooltip = useCallback(() => {
    setIsTooltipVisible(true);
  }, [isTooltipVisible]);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
  }, []);

  const openDeleteModal = useCallback((postId: number) => {
    dispatch(showDeleteModal({ type: '게시글', id: postId }));
    setIsTooltipVisible(false);
  }, []);

  const onToggleComment = useCallback(() => {
    if (isModalCommentListVisible) dispatch(hideModalCommentList());
    else dispatch(showModalCommentList());
  }, [isModalCommentListVisible, modalCommentImagePath]);

  const openEditModal = useCallback(() => {
    setIsTooltipVisible(false);
    dispatch(executePostEdit());
  }, []);

  return (
    <ModalContentWrapper>
      <ModalContentHeader>
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

      <ModalContentText $isModalCommentListVisible={isModalCommentListVisible}>{singlePost.content}</ModalContentText>
      {isModalCommentListVisible && <ModalCommentList />}

      <ModalContentOptions $isModalCommentListVisible={isModalCommentListVisible}>
        <div>
          <LikeOutlined />
          <CommentOutlined onClick={onToggleComment} />
        </div>

        <div>
          <p>좋아요 114개</p>
          <p>
            댓글{' '}
            {singlePost.Comments.reduce((total: number, comment: Comment) => {
              const repliesCount = comment.Replies ? comment.Replies.length : 0;

              if (comment.isDeleted) {
                return total + repliesCount;
              }

              return total + 1 + repliesCount;
            }, 0)}
            개
          </p>
        </div>
      </ModalContentOptions>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </ModalContentWrapper>
  );
};

export default ModalContent;
