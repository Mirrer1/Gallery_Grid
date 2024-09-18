import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { Image, PostComment, PostLike, UserHistoryPost } from 'store/types/postType';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewOption,
  PostPreviewCheckbox
} from 'styles/Gallery/postPreview';

type PostPreviewProps = {
  userHistory: UserHistoryPost;
  selectMode: boolean;
};

const PostPreview = ({ userHistory, selectMode }: PostPreviewProps) => {
  const { me } = useSelector((state: RootState) => state.user);
  const liked = useMemo(
    () => userHistory.Post.Likers.some((liker: PostLike) => liker.id === me?.id),
    [userHistory.Post.Likers]
  );
  const hasCommented = useMemo(() => {
    console.log(userHistory.Post.Comments);

    return userHistory.Post.Comments.some((comment: PostComment) => {
      const isUserCommented = comment.User && comment.User.id === me?.id;
      const isUserReplied = comment.Replies?.some(reply => reply.User?.id === me?.id);
      return isUserCommented || isUserReplied;
    });
  }, [userHistory.Post.Comments, me?.id]);

  return (
    <>
      {selectMode && (
        <PostPreviewCheckbox>
          <input type="checkbox" />
        </PostPreviewCheckbox>
      )}

      <PostPreviewImage>
        <img src={`http://localhost:3065/${userHistory.Post.Images[0].src}`} alt="게시글의 첫번째 이미지" />

        <div>
          {userHistory.Post.Images.map((image: Image) => (
            <div key={image.id} />
          ))}
        </div>

        <ArrowsAltOutlined />
      </PostPreviewImage>

      <PostPreviewContent>
        <h1>{userHistory.Post.content}</h1>
        <p>{userHistory.Post.User.nickname}</p>

        <PostPreviewOption $liked={liked} $hasCommented={hasCommented}>
          <div>
            <HeartOutlined />
            <span>{userHistory.Post.Likers.length}</span>
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
              }, 0)}
            </span>
          </div>
        </PostPreviewOption>
      </PostPreviewContent>
    </>
  );
};

export default PostPreview;
