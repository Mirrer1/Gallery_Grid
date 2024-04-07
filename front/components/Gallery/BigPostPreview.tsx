import React from 'react';
import { ArrowsAltOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  BigPostPreviewContent,
  BigPostPreviewImage,
  BigPostPreviewWrapper,
  BigPostPreviewOption
} from 'styles/Gallery/bigPostPreview';

const BigPostPreview = ({ post }: any) => {
  return (
    <BigPostPreviewWrapper {...slideInFromBottom()}>
      <BigPostPreviewImage>
        <img src={post.img[0]} alt={`${post.user}의 게시글 이미지`} />

        <div>
          {post.img.map((_: any, i: any) => (
            <div key={i}></div>
          ))}
        </div>

        <ArrowsAltOutlined />
      </BigPostPreviewImage>

      <BigPostPreviewContent>
        <h1>{post.desc}</h1>
        <p>{post.user}</p>

        <BigPostPreviewOption>
          <div>
            <LikeOutlined />
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
