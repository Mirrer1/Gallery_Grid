import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';

import { showPostModal } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewWrapper,
  PostPreviewOption
} from 'styles/Gallery/postPreview';

const PostPreview = ({ post }: any) => {
  const dispatch = useDispatch();

  const onClickPost = useCallback(() => {
    dispatch(showPostModal());
  }, []);

  return (
    <PostPreviewWrapper {...slideInFromBottom(0.3)}>
      {post.map((post: any, i: any) => (
        <article key={i} onClick={onClickPost}>
          <PostPreviewImage>
            <img src={post.img[0]} alt={`${post.user}의 게시글 이미지`} />

            <div>
              {post.img.map((_: any, i: any) => (
                <div key={i}></div>
              ))}
            </div>

            <ArrowsAltOutlined />
          </PostPreviewImage>

          <PostPreviewContent>
            <h1>{post.desc}</h1>
            <p>{post.user}</p>

            <PostPreviewOption>
              <div>
                <LikeOutlined />
                <span>24</span>
              </div>

              <div>
                <CommentOutlined />
                <span>13</span>
              </div>
            </PostPreviewOption>
          </PostPreviewContent>
        </article>
      ))}
    </PostPreviewWrapper>
  );
};

export default PostPreview;
