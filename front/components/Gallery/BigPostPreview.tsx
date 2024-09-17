import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { showPostModal } from 'store/actions/postAction';
import { Image, Post, PostComment, PostLike } from 'store/types/postType';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  BigPostPreviewContent,
  BigPostPreviewImage,
  BigPostPreviewWrapper,
  BigPostPreviewOption,
  BigPostPreviewCheckbox
} from 'styles/Gallery/bigPostPreview';

type BigPostPreviewProps = {
  post: Post;
  selectMode: boolean;
};

const BigPostPreview = ({ post, selectMode }: BigPostPreviewProps) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const liked = useMemo(() => post.Likers.some((liker: PostLike) => liker.id === me?.id), [post.Likers]);
  const hasCommented = useMemo(() => {
    return post.Comments.some((comment: PostComment) => {
      const isUserCommented = comment.User && comment.User.id === me?.id;
      const isUserReplied = comment.Replies?.some(reply => reply.User?.id === me?.id);
      return isUserCommented || isUserReplied;
    });
  }, [post.Comments, me?.id]);

  const onClickPost = useCallback(() => {
    dispatch(showPostModal(post));
  }, []);

  return (
    <BigPostPreviewWrapper {...slideInFromBottom()} onClick={onClickPost}>
      {selectMode && (
        <BigPostPreviewCheckbox>
          <input type="checkbox" />
        </BigPostPreviewCheckbox>
      )}

      <BigPostPreviewImage>
        <img src={`http://localhost:3065/${post.Images[0].src}`} alt="게시글의 첫번째 이미지" />

        <div>
          {post.Images.map((image: Image) => (
            <div key={image.id} />
          ))}
        </div>

        <ArrowsAltOutlined />
      </BigPostPreviewImage>

      <BigPostPreviewContent>
        <h1>{post.content}</h1>
        <p>{post.User.nickname}</p>

        <BigPostPreviewOption $liked={liked} $hasCommented={hasCommented}>
          <div>
            <HeartOutlined />
            <span>{post.Likers.length}</span>
          </div>

          <div>
            <CommentOutlined />
            <span>
              {post.Comments.reduce((total, comment) => {
                const repliesCount = comment.Replies ? comment.Replies.length : 0;

                if (comment.isDeleted) {
                  return total + repliesCount;
                }

                return total + 1 + repliesCount;
              }, 0)}
            </span>
          </div>
        </BigPostPreviewOption>
      </BigPostPreviewContent>
    </BigPostPreviewWrapper>
  );
};

export default BigPostPreview;
