import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  BigPostPreviewContent,
  BigPostPreviewImage,
  BigPostPreviewWrapper,
  BigPostPreviewOption
} from 'styles/Gallery/bigPostPreview';
import { showPostModal } from 'store/actions/postAction';

const BigPostPreview = ({ post }: any) => {
  const dispatch = useDispatch();

  const onClickPost = useCallback(() => {
    dispatch(showPostModal());
  }, []);

  return (
    <BigPostPreviewWrapper {...slideInFromBottom()} onClick={onClickPost}>
      <BigPostPreviewImage>
        <img src={post.img[0]} alt={`${post.user}의 첫번째 게시글 이미지`} />

        <div>
          {post.img.map((_: any, i: any) => (
            <div key={i} />
          ))}
        </div>

        <ArrowsAltOutlined />
      </BigPostPreviewImage>

      <BigPostPreviewContent>
        <h1>{post.desc}</h1>
        <p>{post.user}</p>

        <BigPostPreviewOption>
          <div>
            <HeartOutlined />
            <span>24</span>
          </div>

          <div>
            <CommentOutlined />
            <span>13</span>
          </div>
        </BigPostPreviewOption>
      </BigPostPreviewContent>
    </BigPostPreviewWrapper>
  );
};

export default BigPostPreview;
