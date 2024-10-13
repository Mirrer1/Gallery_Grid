import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CheckSquareOutlined, CommentOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import useImagePreview from 'utils/useImagePreview';
import { UserHistoryPost } from 'store/types/postType';
import { readActivityRequest, setActivityFocusedCommentId, showPostModal } from 'store/actions/postAction';
import { slideInList } from 'styles/Common/animation';
import {
  AlertContentWrapper,
  AlertHeader,
  AlertContent,
  AlertItemWrapper,
  AlertContentBtn,
  AlertBtn
} from 'styles/Activity/alert';

type AlertItemProps = {
  history: UserHistoryPost;
};

const AlertItem = ({ history }: AlertItemProps) => {
  const dispatch = useDispatch();
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const activityType = history.type === 'replyComment' ? 'comment' : history.type;

  const onClickPost = useCallback(() => {
    if (history.type === 'comment' && history.Comment?.id) {
      dispatch(setActivityFocusedCommentId(history.Comment.id));
    } else if (history.type === 'replyComment' && history.ReplyComment?.id) {
      dispatch(setActivityFocusedCommentId(history.ReplyComment.id));
    }

    dispatch(showPostModal(history.Post));
  }, []);

  const onReadActivity = useCallback(() => {
    dispatch(readActivityRequest(history.id));
  }, []);

  return (
    <AlertItemWrapper {...slideInList}>
      <AlertHeader $type={activityType}>
        <div>
          <img
            src={
              history.Alerter?.ProfileImage ? `http://localhost:3065/${history.Alerter?.ProfileImage.src}` : '/user.jpg'
            }
            alt="유저 프로필 이미지"
            onClick={() =>
              showImagePreview(
                history.Alerter?.ProfileImage
                  ? `http://localhost:3065/${history.Alerter?.ProfileImage.src}`
                  : '/user.jpg'
              )
            }
          />

          <div>
            {activityType === 'like' ? (
              <h1>
                <span>{history.Alerter?.nickname}</span>님이 회원님의 게시글을 좋아합니다.
              </h1>
            ) : activityType === 'comment' ? (
              <h1>
                <p>
                  <span>{history.Alerter?.nickname}</span>님이 게시글에
                </p>
                <p>{history.Comment ? history.Comment.content : history.ReplyComment?.content}</p>
                댓글을 남겼습니다.
              </h1>
            ) : activityType === 'follow' ? (
              <h1>
                <span>{history.Alerter?.nickname}</span>님이 회원님을 팔로우하기 시작했습니다.
              </h1>
            ) : null}

            <p>{dayjs(history.createdAt).format('HH:mm')}</p>
          </div>
        </div>

        <AlertBtn $selectAll={false}>
          <button type="button" onClick={onReadActivity}>
            <CheckSquareOutlined />
            <DeleteOutlined />
            <p>읽음</p>
          </button>
        </AlertBtn>
      </AlertHeader>

      <AlertContentWrapper onClick={onClickPost}>
        {activityType === 'like' || activityType === 'comment' ? (
          <AlertContent onClick={onClickPost} $type={activityType}>
            <img src={`http://localhost:3065/${history.Post.Images[0].src}`} alt="게시글의 첫번째 이미지" />

            <div>
              <p>{history.Post.content}</p>

              <div>
                <div>
                  <HeartOutlined />
                  <span>{history.Post.Likers.length}</span>
                </div>

                <div>
                  <CommentOutlined />
                  <span>
                    {history.Post.Comments.reduce((total, comment) => {
                      const repliesCount = comment.Replies ? comment.Replies.length : 0;

                      if (comment.isDeleted) {
                        return total + repliesCount;
                      }

                      return total + 1 + repliesCount;
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>
          </AlertContent>
        ) : (
          <AlertContentBtn>
            <button type="button">Visit</button>
            <button type="button">Follow</button>
          </AlertContentBtn>
        )}
      </AlertContentWrapper>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </AlertItemWrapper>
  );
};

export default AlertItem;
