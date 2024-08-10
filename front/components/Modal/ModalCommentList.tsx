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
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import ModalReplyComment from './ModalReplyComment';

import { RootState } from 'store/reducers';
import {
  addCommentRequest,
  hideCommentList,
  modalCommentRemoveUploadedImage,
  modalCommentUploadImageRequest
} from 'store/actions/postAction';
import { slideInFromBottom, slideInUploadImage } from 'styles/Common/animation';
import {
  ModalCommentListHeader,
  ModalCommentListItem,
  ModalCommentListItemWrapper,
  ModalCommentListWrapper,
  ModalCommentListContainer,
  ModalCommentInputImage,
  ModalCommentInputImageWrapper,
  ModalCommentEmojiPicker,
  ModalCommentForm
} from 'styles/Modal/modalCommentList';

const ModalCommentList = () => {
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
  const [comment, onChangeComment, setComment] = useInput('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const { fileInputRef, onFileChange } = useFileUpload(modalCommentUploadImageRequest, { showWarning: false });
  const { modalCommentImagePath, modalCommentUploadImageLoading, singlePost } = useSelector(
    (state: RootState) => state.post
  );

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(modalCommentRemoveUploadedImage());
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!comment.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      if (modalCommentImagePath.length > 0) {
        modalCommentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', singlePost.id);

      dispatch(addCommentRequest(formData));

      setComment('');
    },
    [comment, modalCommentImagePath, singlePost.id]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(comment);
      }
    },
    [comment]
  );

  return (
    <ModalCommentListContainer {...slideInFromBottom()}>
      <ModalCommentListWrapper $uploading={modalCommentImagePath.length !== 0}>
        <ModalCommentListHeader>
          <CaretDownOutlined onClick={onHideComment} />
        </ModalCommentListHeader>

        <ModalCommentListItemWrapper>
          {contentList.map(comment => (
            <div key={comment.id}>
              <ModalCommentListItem $reply={false}>
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
              </ModalCommentListItem>

              <ModalReplyComment />
            </div>
          ))}
        </ModalCommentListItemWrapper>
      </ModalCommentListWrapper>

      {modalCommentImagePath.length !== 0 && (
        <ModalCommentInputImageWrapper>
          <ModalCommentInputImage key={modalCommentImagePath} {...slideInUploadImage}>
            <img src={`http://localhost:3065/${modalCommentImagePath}`} alt="입력한 댓글의 첨부 이미지" />
            <DeleteOutlined onClick={handleRemoveImage} />
          </ModalCommentInputImage>
        </ModalCommentInputImageWrapper>
      )}

      <ModalCommentForm encType="multipart/form-data" $active={comment.length === 0} onSubmit={onSubmitForm}>
        <div>
          {modalCommentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
          <input type="file" name="image" ref={fileInputRef} onChange={e => onFileChange(e, modalCommentImagePath)} />

          <SmileOutlined onClick={showEmojiPicker} />
          {showEmoji && EmojiPicker && (
            <ModalCommentEmojiPicker>
              <div onClick={closeEmojiPicker} />

              <div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            </ModalCommentEmojiPicker>
          )}

          <input
            type="text"
            placeholder="Type a Comment..."
            value={comment}
            onChange={onChangeComment}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button type="submit">
          <SendOutlined />
        </button>
      </ModalCommentForm>
    </ModalCommentListContainer>
  );
};

export default ModalCommentList;
