import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CaretDownOutlined,
  CloseSquareTwoTone,
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import ReplyComment from './ReplyComment';
import useInput from 'utils/useInput';
import useFileUpload from 'utils/useFileUpload';
import useEmojiPicker from 'utils/useEmojiPicker';
import { formatDate } from 'utils/useListTimes';

import { RootState } from 'store/reducers';
import { Comment } from 'store/types/postType';
import {
  addCommentRequest,
  commentRemoveUploadedImage,
  commentUploadImageRequest,
  hideCommentList,
  loadCommentsRequest
} from 'store/actions/postAction';
import { slideInFromBottom, slideInUploadImage } from 'styles/Common/animation';
import {
  CommentEmojiPicker,
  CommentForm,
  CommentInputImage,
  CommentInputImageWrapper,
  CommentInputWrapper,
  CommentListHeader,
  CommentListItem,
  CommentListItemImage,
  CommentListItemWrapper,
  CommentListWrapper,
  CommentsLoading,
  NoCommentsContainer
} from 'styles/Timeline/commentList';

const CommentList = () => {
  const dispatch = useDispatch();
  const commentListRef = useRef<HTMLDivElement>(null);
  const [comment, onChangeComment, setComment] = useInput('');
  const { showEmoji, showEmojiPicker, closeEmojiPicker, onEmojiClick } = useEmojiPicker(setComment);
  const { fileInputRef, onFileChange } = useFileUpload(commentUploadImageRequest, { showWarning: false });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const {
    isCommentListVisible,
    commentImagePath,
    commentUploadImageLoading,
    commentVisiblePostId,
    addCommentLoading,
    isPostModalVisible,
    mainComments,
    loadCommentsLoading,
    addCommentDone
  } = useSelector((state: RootState) => state.post);

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
  }, []);

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    dispatch(commentRemoveUploadedImage());
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
      console.log('실행');

      if (!comment.trim()) {
        toast.warning('댓글 내용을 입력해주세요.');
        return;
      }

      const formData = new FormData();
      if (commentImagePath.length > 0) {
        commentImagePath.forEach((image: string) => {
          formData.append('image', image);
        });
      }
      formData.append('content', comment);
      formData.append('PostId', commentVisiblePostId);

      dispatch(addCommentRequest(formData));

      setComment('');
    },
    [comment, commentImagePath, commentVisiblePostId]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        onSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [comment]
  );

  useEffect(() => {
    if (addCommentDone && commentListRef.current) {
      commentListRef.current.scrollTo({
        top: commentListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [addCommentDone]);

  useEffect(() => {
    if (commentVisiblePostId) dispatch(loadCommentsRequest(commentVisiblePostId));
  }, [commentVisiblePostId]);

  return (
    <CommentListWrapper
      key={commentVisiblePostId}
      $isCommentListVisible={isCommentListVisible}
      {...slideInFromBottom()}
    >
      <CommentListHeader>
        <CaretDownOutlined onClick={onHideComment} />
      </CommentListHeader>

      {loadCommentsLoading ? (
        <CommentsLoading>
          <LoadingOutlined />
        </CommentsLoading>
      ) : mainComments?.length > 0 ? (
        <>
          <CommentListItemWrapper ref={commentListRef} $uploading={commentImagePath.length !== 0}>
            {mainComments.map(
              (comment: Comment) =>
                comment.parentId === null && (
                  <div key={comment.id}>
                    <CommentListItem $reply={false}>
                      <div>
                        <div>
                          <img
                            src={
                              comment.User.ProfileImage
                                ? `http://localhost:3065/${comment.User.ProfileImage.src}`
                                : '/user.jpg'
                            }
                            alt={`${comment.User.nickname}의 프로필 이미지`}
                          />

                          <div>
                            <div>
                              <h1>{comment.User.nickname}</h1>
                              {comment.Post?.UserId === comment.UserId && <p>작성자</p>}
                            </div>

                            <p>{formatDate(comment.createdAt)}</p>
                          </div>
                        </div>

                        {comment.User.id === me?.id ? (
                          <div>
                            <button type="button">수정</button>
                            <button type="button">삭제</button>
                          </div>
                        ) : (
                          <div>
                            <button type="button">신고</button>
                          </div>
                        )}
                      </div>

                      {comment.CommentImage && (
                        <CommentListItemImage
                          onClick={() => showImagePreview(`http://localhost:3065/${comment.CommentImage?.src}`)}
                        >
                          <img
                            src={`http://localhost:3065/${comment.CommentImage.src}`}
                            alt={`${comment.User.nickname}의 댓글 이미지`}
                          />
                        </CommentListItemImage>
                      )}
                      <p>{comment.content}</p>
                      <button type="button">답글쓰기</button>
                    </CommentListItem>

                    <ReplyComment />
                  </div>
                )
            )}
          </CommentListItemWrapper>

          <CommentInputWrapper $uploading={commentImagePath.length !== 0}>
            {commentImagePath.length !== 0 && (
              <CommentInputImageWrapper>
                <CommentInputImage
                  key={commentImagePath}
                  {...slideInUploadImage}
                  onClick={() => showImagePreview(`http://localhost:3065/${commentImagePath}`)}
                >
                  <img src={`http://localhost:3065/${commentImagePath}`} alt="입력한 댓글의 첨부 이미지" />
                  <DeleteOutlined onClick={handleRemoveImage} />
                </CommentInputImage>
              </CommentInputImageWrapper>
            )}

            <CommentForm
              encType="multipart/form-data"
              $active={comment.length === 0}
              $uploading={commentImagePath.length !== 0}
              onSubmit={onSubmitForm}
            >
              <div>
                {commentUploadImageLoading ? <LoadingOutlined /> : <PaperClipOutlined onClick={onClickImageUpload} />}
                <input type="file" name="image" ref={fileInputRef} onChange={e => onFileChange(e, commentImagePath)} />

                <SmileOutlined onClick={showEmojiPicker} />
                {showEmoji && EmojiPicker && (
                  <CommentEmojiPicker>
                    <div onClick={closeEmojiPicker} />

                    <div>
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  </CommentEmojiPicker>
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
                {addCommentLoading && !isPostModalVisible ? <LoadingOutlined /> : <SendOutlined />}
              </button>
            </CommentForm>
          </CommentInputWrapper>
        </>
      ) : (
        <NoCommentsContainer>
          <CloseSquareTwoTone twoToneColor="#6BA2E6" />
          <h1>No comments yet.</h1>
          <p>첫번째 댓글을 작성해보세요!</p>
        </NoCommentsContainer>
      )}

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </CommentListWrapper>
  );
};

export default CommentList;
