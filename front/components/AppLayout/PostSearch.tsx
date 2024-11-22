import React from 'react';
import { ShareAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';

import { PostCard, PostContentWrapper, PostImageWrapper, PostSearchWrapper } from 'styles/AppLayout/postSearch';

const PostSearch = () => {
  return (
    <PostSearchWrapper>
      <PostCard>
        <PostImageWrapper>
          <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />
          <ShareAltOutlined />
        </PostImageWrapper>

        <PostContentWrapper>
          <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />

          <p>LoremLoremLoremi</p>

          <span>
            <CommentOutlined />
            <p>22</p>
          </span>

          <span>
            <HeartOutlined />
            <p>20</p>
          </span>
        </PostContentWrapper>
      </PostCard>
    </PostSearchWrapper>
  );
};

export default PostSearch;
