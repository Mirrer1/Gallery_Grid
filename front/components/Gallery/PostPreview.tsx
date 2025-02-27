import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import useOverlays from 'utils/useOverlays';
import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { Image, PostComment, PostLike, UserHistoryPost } from 'store/types/postType';
import { slideInTooltip } from 'styles/Common/animation';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewOption,
  PostPreviewCheckbox
} from 'styles/Gallery/postPreview';

type PostPreviewProps = {
  userHistory: UserHistoryPost;
  selectMode: boolean;
  selectedPostIds: number[];
  setSelectedPostIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const PostPreview = ({ userHistory, selectMode, selectedPostIds, setSelectedPostIds }: PostPreviewProps) => {
  const { openOverlay } = useOverlays();
  const { me } = useSelector((state: RootState) => state.user);

  const liked = useMemo(
    () => userHistory.Post.Likers.some((liker: PostLike) => liker.id === me?.id),
    [userHistory.Post.Likers]
  );

  const hasCommented = useMemo(() => {
    return userHistory.Post.Comments.some((comment: PostComment) => {
      const isUserCommented = comment.User && comment.User.id === me?.id;
      const isUserReplied = comment.Replies?.some(reply => reply.User?.id === me?.id);
      return isUserCommented || isUserReplied;
    });
  }, [userHistory.Post.Comments, me?.id]);

  const onToggleSelect = useCallback(() => {
    setSelectedPostIds(prev => {
      if (prev.includes(userHistory.id)) {
        return prev.filter(id => id !== userHistory.id);
      } else {
        return [...prev, userHistory.id];
      }
    });
  }, [userHistory.id, setSelectedPostIds]);

  const onClickPost = useCallback(() => {
    if (selectMode) {
      onToggleSelect();
    } else {
      openOverlay('post', userHistory.Post);
    }
  }, [selectMode, userHistory.Post, onToggleSelect]);

  return (
    <>
      {selectMode && (
        <PostPreviewCheckbox {...slideInTooltip}>
          <input type="checkbox" checked={selectedPostIds.includes(userHistory.id)} onChange={onToggleSelect} />
        </PostPreviewCheckbox>
      )}

      <PostPreviewImage onClick={onClickPost}>
        <img src={imgURL(userHistory.Post.Images[0].src)} alt="게시글의 첫번째 이미지" />

        <ArrowsAltOutlined />

        <div>
          {userHistory.Post.Images.map((image: Image) => (
            <div key={image.id} />
          ))}
        </div>
      </PostPreviewImage>

      <PostPreviewContent $selectMode={selectMode}>
        <div>
          <h1>{userHistory.Post.content.replace(/\\n/g, '\n').replace(/␣/g, ' ')}</h1>
          <p>{userHistory.Post.User.nickname}</p>

          <PostPreviewOption $liked={liked} $hasCommented={hasCommented}>
            <div>
              <HeartOutlined />
              <span>{userHistory.Post.Likers.length.toLocaleString()}</span>
            </div>

            <div>
              <CommentOutlined />
              <span>
                {userHistory.Post.Comments.reduce((total, comment) => {
                  const repliesCount = comment.Replies ? comment.Replies.length : 0;

                  if (comment.isDeleted) {
                    return total + repliesCount;
                  }

                  return total + 1 + repliesCount;
                }, 0).toLocaleString()}
              </span>
            </div>
          </PostPreviewOption>
        </div>
      </PostPreviewContent>
    </>
  );
};

export default PostPreview;
