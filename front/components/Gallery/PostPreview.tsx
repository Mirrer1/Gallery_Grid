import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import { showPostModal } from 'store/actions/postAction';
import { slideInFromBottom } from 'styles/Common/animation';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewWrapper,
  PostPreviewOption,
  PostPreviewCheckbox
} from 'styles/Gallery/postPreview';

type PostPreviewProps = {
  post: any;
  selectMode: boolean;
};

const PostPreview = ({ post, selectMode }: PostPreviewProps) => {
  const dispatch = useDispatch();

  const onClickPost = useCallback(() => {
    // dispatch(showPostModal());
  }, []);

  return (
    <PostPreviewWrapper {...slideInFromBottom(0.3)}>
      {post.map((post: any, i: any) => (
        <article key={i} onClick={onClickPost}>
          {selectMode && (
            <PostPreviewCheckbox>
              <input type="checkbox" />
            </PostPreviewCheckbox>
          )}

          <PostPreviewImage>
            <img src={post.img[0]} alt={`${post.user}의 ${i}번째 게시글 이미지`} />

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
                <HeartOutlined />
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
