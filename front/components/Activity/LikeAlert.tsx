import React from 'react';

import { CommentOutlined, LikeTwoTone } from '@ant-design/icons';

const LikeAlert = () => {
  return (
    <article>
      <div>
        <img src="https://i.pinimg.com/564x/aa/06/d7/aa06d77cd048b867f5d0b40362e62a76.jpg" alt="프로필 이미지1" />
        <p>14:47</p>
        <h1>User1님이 회원님의 게시글을 좋아합니다.</h1>
      </div>

      <div>
        <div>
          <img src="https://i.pinimg.com/564x/fb/13/18/fb1318cf654aae07299360fd4b66bf70.jpg" alt="게시글 이미지1" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem expedita tenetur velit maxime, ullam laborum
            recusandae. Ab fuga, dolore repudiandae quae eum in, eligendi totam non vel voluptates dolorum atque?
          </p>
        </div>

        <div>
          <div>
            <LikeTwoTone />
            <span>21</span>
          </div>

          <div>
            <CommentOutlined />
            <span>12</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LikeAlert;
