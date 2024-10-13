import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CheckSquareOutlined, CommentOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { UserHistoryPost } from 'store/types/postType';
import { showPostModal } from 'store/actions/postAction';
import {
  AlertContentWrapper,
  AlertHeader,
  AlertContent,
  AlertItemWrapper,
  AlertContentBtn,
  AlertBtn
} from 'styles/Activity/alert';
import { slideInList } from 'styles/Common/animation';
import ImagePreview from 'components/Modal/ImagePreviewModal';
import useImagePreview from 'utils/useImagePreview';

type AlertItemProps = {
  history: UserHistoryPost;
};

const AlertItem = ({ history }: AlertItemProps) => {
  const dispatch = useDispatch();
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  const activityType = history.type === 'replyComment' ? 'comment' : history.type;

  const onClickPost = useCallback(() => {
    dispatch(showPostModal(history.Post));
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
          <button>
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
