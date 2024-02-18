import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import React from 'react';

const CommentAlert = () => {
  return (
    <article>
      <div>
        <img src="https://i.pinimg.com/564x/6e/f9/3e/6ef93e34c6783ebdccf06c2dc36969ec.jpg" alt="프로필 이미지2" />
        <p>9:12</p>
        <h1>User2님이 게시글에 댓글을 남겼습니다.</h1>
      </div>

      <div>
        <div>
          <img src="https://i.pinimg.com/564x/86/40/57/8640579018dd53bc12c99d7e2a1a2b2b.jpg" alt="게시글 이미지2" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam facilis deleniti cumque mollitia quae
            corporis, dolor animi laudantium dolore nesciunt itaque!
          </p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, expedita?</p>
        </div>

        <div>
          <div>
            <LikeOutlined />
            <span>51</span>
          </div>

          <div>
            <CommentOutlined style={{ color: '#6BA2E6' }} />
            <span>7</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentAlert;
