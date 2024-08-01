import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AlertOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
  SendOutlined,
  ShareAltOutlined,
  SmileOutlined
} from '@ant-design/icons';

import useInput from 'utils/useInput';
import ModalCommentList from './ModalCommentList';
import { RootState } from 'store/reducers';
import { formatDate } from 'utils/useListTimes';
import { hideCommentList, showCommentList, showDeleteModal } from 'store/actions/postAction';
import { slideInTooltip } from 'styles/Common/animation';
import { Tooltip, TooltipBtn, TooltipOutsideArea } from 'styles/Common/tooltip';
import {
  ModalCommentInput,
  ModalContentHeader,
  ModalContentOptions,
  ModalContentText,
  ModalContentWrapper
} from 'styles/Modal/modalContent';

const ModalContent = () => {
  const dispatch = useDispatch();
  const [comment, onChangeComment] = useInput('');
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);
  const { me } = useSelector((state: RootState) => state.user);

  const post: any = {
    Comments: [],
    Images: [
      { id: 185, src: '2714b3d09f0ad9ccdfaebdc195b4e67a_1722492282687.jpg' },
      { id: 186, src: '77292c31c7f08adaff7650798fef5ce0_1722492282691.jpg' },
      { id: 187, src: 'A91c4cb4531f6c3f91b1b3a1e2c4fc2fc_1722492282694.jpg' },
      { id: 188, src: 'afed7289a2605bfa567229db5dfdbf5b_1722492282696.jpg' },
      { id: 189, src: 'AllWalksofLife_1722492282700.jpg' }
    ],
    Likers: [],
    User: {
      ProfileImage: null,
      id: 10,
      nickname: '김민덕'
    },
    UserId: 10,
    content: '게시글 수정 테스트11111',
    createdAt: '2024-08-01T06:04:47.000Z',
    id: 113,
    location: null,
    updatedAt: '2024-08-01T06:04:47.000Z'
  };

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
    if (isCommentListVisible) dispatch(hideCommentList());
    else dispatch(showCommentList());
  }, [isCommentListVisible]);

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
          <img src={post.User.ProfileImage ? post.User.ProfileImage.src : '/user.jpg'} alt="author profile image" />

          <div>
            <h1>{post.User.nickname}</h1>
            <p>
              {formatDate(post.createdAt)}
              {post.location && ` - ${post.location}`}
            </p>
          </div>
        </div>

        <div>
          <button type="button">Follow</button>
          <MoreOutlined onClick={handleTooltip} />

          {isTooltipVisible && (
            <Tooltip {...slideInTooltip} $visible={isTooltipVisible}>
              <TooltipOutsideArea onClick={hideTooltip} />

              {me?.id === post.UserId ? (
                <TooltipBtn>
                  <button type="button">
                    <EditOutlined />
                    수정
                  </button>
                  <button type="button" onClick={() => openDeleteModal(post.id)}>
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

      {isCommentListVisible ? <ModalCommentList /> : <ModalContentText>{post.content}</ModalContentText>}

      <ModalContentOptions $isCommentListVisible={isCommentListVisible}>
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

      {isCommentListVisible && (
        <ModalCommentInput $active={comment.length === 0}>
          <div>
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
    </ModalContentWrapper>
  );
};

export default ModalContent;
