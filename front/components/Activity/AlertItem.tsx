import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CheckSquareOutlined,
  CommentOutlined,
  DeleteOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';

import ImagePreview from 'components/Modal/ImagePreviewModal';
import useImagePreview from 'utils/useImagePreview';
import { RootState } from 'store/reducers';
import { UserHistoryPost } from 'store/types/postType';
import { followUserRequest, unFollowUserRequest } from 'store/actions/userAction';
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
  const { me, followUserLoading, unFollowUserLoading } = useSelector((state: RootState) => state.user);
  const activityType = history.type === 'replyComment' ? 'comment' : history.type;

  const onClickPost = useCallback(() => {
    if (history.type === 'follow') return;

    if (history.type === 'comment' && history.Comment?.id) {
      dispatch(setActivityFocusedCommentId(history.Comment.id));
    } else if (history.type === 'replyComment' && history.ReplyComment?.id) {
      dispatch(setActivityFocusedCommentId(history.ReplyComment.id));
    }

    dispatch(showPostModal(history.Post));
  }, [history]);

  const onToggleFollow = useCallback(
    (userId: number) => {
      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) dispatch(unFollowUserRequest(userId));
      else dispatch(followUserRequest(userId));
    },
    [me.Followings, history]
  );

  const onReadActivity = useCallback(() => {
    dispatch(readActivityRequest(history.id));
  }, []);

  const onMoveUserProfile = useCallback(
    (userId: number) => {
      Router.push(`/user/${userId}`);
    },
    [history]
  );

  return (
    <AlertItemWrapper {...slideInList}>
      <AlertHeader $type={activityType}>
        <div>
          <img
            src={history.Alerter?.ProfileImage ? `${history.Alerter?.ProfileImage.src}` : '/user.jpg'}
            alt="유저 프로필 이미지"
            onClick={() =>
              showImagePreview(history.Alerter?.ProfileImage ? `${history.Alerter?.ProfileImage.src}` : '/user.jpg')
            }
          />

          <div>
            {activityType === 'like' ? (
              <div>
                <span>
                  <Link href={`/user/${history.Alerter.id}`}>{history.Alerter?.nickname}</Link>
                </span>
                님이 회원님의 게시글을 좋아합니다.
              </div>
            ) : activityType === 'comment' ? (
              <div>
                <p>
                  <span>
                    <Link href={`/user/${history.Alerter.id}`}>{history.Alerter?.nickname}</Link>
                  </span>
                  님이 게시글에
                </p>
                <p>{history.Comment ? history.Comment.content : history.ReplyComment?.content}</p>
                댓글을 남겼습니다.
              </div>
            ) : activityType === 'follow' ? (
              <div>
                <span>
                  <Link href={`/user/${history.Alerter.id}`}>{history.Alerter?.nickname}</Link>
                </span>
                님이 회원님을 팔로우하기 시작했습니다.
              </div>
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
            <img src={`${history.Post.Images[0].src}`} alt="게시글의 첫번째 이미지" />

            <div>
              <p>{history.Post.content}</p>

              <div>
                <div>
                  <HeartOutlined />
                  <span>{history.Post.Likers.length.toLocaleString()}</span>
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
                    }, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </AlertContent>
        ) : (
          <AlertContentBtn
            $isFollowing={me.Followings.some((following: { id: number }) => following.id === history.Alerter.id)}
          >
            <button type="button" onClick={() => onMoveUserProfile(history.Alerter.id)}>
              Visit
            </button>

            {me.id !== history.Alerter?.id && (
              <button type="button" onClick={() => onToggleFollow(history.Alerter.id)}>
                {followUserLoading || unFollowUserLoading ? (
                  <LoadingOutlined />
                ) : me.Followings.some((following: { id: number }) => following.id === history.Alerter.id) ? (
                  'Unfollow'
                ) : (
                  'Follow'
                )}
              </button>
            )}
          </AlertContentBtn>
        )}
      </AlertContentWrapper>

      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </AlertItemWrapper>
  );
};

export default AlertItem;
