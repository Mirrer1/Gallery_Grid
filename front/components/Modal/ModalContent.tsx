import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';

import useInput from 'utils/useInput';
import ModalCommentList from './ModalCommentList';
import { RootState } from 'store/reducers';
import { hideCommentList, showCommentList } from 'store/actions/postAction';
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
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);

  const handleTooltip = useCallback(() => {
    setIsTooltipVisible(true);
  }, [isTooltipVisible]);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
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
          <img
            src="https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg"
            alt="게시글 작성자 프로필 이미지"
          />

          <div>
            <h1>Likemirrer_</h1>
            <p>2014.4.29</p>
          </div>
        </div>

        <div>
          <button type="button">Follow</button>

          <Tooltip>
            {isTooltipVisible && <TooltipOutsideArea onClick={hideTooltip} />}

            <MoreOutlined onClick={handleTooltip} />
            <TooltipBtn $visible={isTooltipVisible}>
              <button type="button">
                <EditOutlined />
                수정
              </button>
              <button type="button">
                <DeleteOutlined />
                삭제
              </button>
            </TooltipBtn>
          </Tooltip>
        </div>
      </ModalContentHeader>

      {isCommentListVisible ? (
        <ModalCommentList />
      ) : (
        <ModalContentText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorum adipisci sequi aperiam totam dolor
          ratione, impedit expedita voluptatem animi iusto error. Sed quos sunt molestias ducimus quam, magnam
          asperiores accusantium omnis error labore inventore! Odit, quidem officiis perspiciatis dolor similique
          consectetur sint eum error quia voluptas tenetur id distinctio! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ab dolorum adipisci sequi aperiam totam dolor ratione, impedit expedita voluptatem animi
          iusto error. Sed quos sunt molestias ducimus quam, magnam asperiores accusantium omnis error labore inventore!
          Odit, quidem officiis perspiciatis dolor similique consectetur sint eum error quia voluptas tenetur id
          distinctio! Lorem ipsum dolor sit amet consectetur adi
        </ModalContentText>
      )}

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
    </ModalContentWrapper>
  );
};

export default ModalContent;
