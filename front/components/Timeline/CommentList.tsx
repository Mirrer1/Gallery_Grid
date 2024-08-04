import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CaretDownOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';

import ReplyComment from './ReplyComment';
import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import { RootState } from 'store/reducers';
import { commentRemoveUploadedImage, commentUploadImageRequest, hideCommentList } from 'store/actions/postAction';
import { slideInFromBottom, slideInUploadImage } from 'styles/Common/animation';
import {
  CommentInput,
  CommentInputImage,
  CommentInputImageWrapper,
  CommentInputWrapper,
  CommentListHeader,
  CommentListItem,
  CommentListItemWrapper,
  CommentListWrapper
} from 'styles/Timeline/commentList';

const CommentList = () => {
  const contentList = [
    {
      id: 1,
      nickname: 'userasd1',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content:
        '안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.',
      createdAt: '2024-2-14'
    },
    {
      id: 2,
      nickname: 'useasdasdr2',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글2입니다.',
      createdAt: '2024-2-11'
    },
    {
      id: 3,
      nickname: 'usedasdasdr3',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글3입니다.',
      createdAt: '2024-6-24'
    },
    {
      id: 4,
      nickname: 'user4',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글4입니다.',
      createdAt: '2023-1-26'
    },
    {
      id: 5,
      nickname: 'user5',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글5입니다.',
      createdAt: '2023-2-22'
    },
    {
      id: 6,
      nickname: 'user6',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글6입니다.',
      createdAt: '2023-12-12'
    },
    {
      id: 7,
      nickname: 'user7',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글7입니다.',
      createdAt: '2023-11-4'
    },
    {
      id: 8,
      nickname: 'user8',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글8입니다.',
      createdAt: '2023-9-1'
    },
    {
      id: 9,
      nickname: 'user9',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글9입니다.',
      createdAt: '2023-6-12'
    }
  ];

  const dispatch = useDispatch();
  const { isCommentListVisible, commentImagePath, commentUploadImageLoading } = useSelector(
    (state: RootState) => state.post
  );
  const { fileInputRef, onFileChange } = useFileUpload(commentUploadImageRequest, { showWarning: false });
  const [comment, onChangeComment] = useInput('');

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(commentRemoveUploadedImage());
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
    <CommentListWrapper $isCommentListVisible={isCommentListVisible} {...slideInFromBottom()}>
      <CommentListHeader>
        <CaretDownOutlined onClick={onHideComment} />
      </CommentListHeader>

      <CommentListItemWrapper $uploading={commentImagePath.length !== 0}>
        {contentList.map(comment => (
          <div key={comment.id}>
            <CommentListItem $reply={false}>
              <div>
                <div>
                  <img src={comment.profile} alt={`${comment.nickname}의 프로필 이미지`} />

                  <div>
                    <h1>{comment.nickname}</h1>
                    <p>{comment.createdAt}</p>
                  </div>
                </div>

                <div>
                  <button type="button">수정</button>
                  <button type="button">삭제</button>
                </div>
              </div>

              <p>{comment.content}</p>
            </CommentListItem>

            <ReplyComment />
          </div>
        ))}
      </CommentListItemWrapper>

      <CommentInputWrapper $uploading={commentImagePath.length !== 0}>
        {commentImagePath.length !== 0 && (
          <CommentInputImageWrapper>
            <CommentInputImage key={commentImagePath} {...slideInUploadImage}>
              <img src={`http://localhost:3065/${commentImagePath}`} alt="입력한 댓글의 첨부 이미지" />
              <DeleteOutlined onClick={handleRemoveImage} />
            </CommentInputImage>
          </CommentInputImageWrapper>
        )}

        <CommentInput $active={comment.length === 0} $uploading={commentImagePath.length !== 0}>
          <div>
            {commentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
            <input type="file" name="image" ref={fileInputRef} onChange={e => onFileChange(e, commentImagePath)} />

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
        </CommentInput>
      </CommentInputWrapper>
    </CommentListWrapper>
  );
};

export default CommentList;
