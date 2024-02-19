import React from 'react';
import { CommentOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';

import {
  AlertContentWrapper,
  AlertHeader,
  AlertContent,
  AlertItemWrapper,
  AlertContentBtn
} from 'styles/Activity/alert';

const AlertItem = ({ type }: { type: string }) => {
  return (
    <AlertItemWrapper>
      <AlertHeader>
        <img src="https://i.pinimg.com/564x/aa/06/d7/aa06d77cd048b867f5d0b40362e62a76.jpg" alt="프로필 이미지1" />
        <p>14:47</p>
        {type === 'like' ? (
          <h1>
            <span>User1</span>님이 회원님의 게시글을 좋아합니다.
          </h1>
        ) : type === 'comment' ? (
          <h1>
            <span>User2</span>님이 게시글에 <span>Lorem ipsum dolor sit ame...</span>댓글을 남겼습니다.
          </h1>
        ) : type === 'follow' ? (
          <h1>
            <span>User3</span>님이 회원님을 팔로우하기 시작했습니다.
          </h1>
        ) : null}
      </AlertHeader>

      <AlertContentWrapper>
        {type === 'like' || type === 'comment' ? (
          <AlertContent>
            <img src="https://i.pinimg.com/564x/fb/13/18/fb1318cf654aae07299360fd4b66bf70.jpg" alt="게시글 이미지1" />

            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem expedita tenetur velit maxime, ullam
                laborum recusandae. Ab fuga, dolore repudiandae quae eum in, eligendi totam non vel voluptates dolorum
                atque? Lorem recusandae. Ab fuga, dolore repudiandae quae eum in, eligendi totam non vel voluptates
                dolorum atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem expedita tenetur velit
                maxime, ullam laborum Lorem recusandae. Ab fuga, dolore repudiandae quae eum in, eligendi totam non vel
                voluptates dolorum atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem expedita
                tenetur velit maxime, ullam laborum Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                expedita tenetur velit maxime, ullam laborum Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem expedita tenetur velit maxime, ullam laborum
              </p>

              <div>
                {type === 'like' ? <LikeTwoTone /> : <LikeOutlined />}
                <span>21</span>
              </div>

              <div>
                {type === 'comment' ? <CommentOutlined style={{ color: '#0066ff' }} /> : <CommentOutlined />}
                <span>12</span>
              </div>
            </div>
          </AlertContent>
        ) : (
          <AlertContentBtn>
            <button type="button">Visit</button>
            <button type="button">Follow</button>
          </AlertContentBtn>
        )}
      </AlertContentWrapper>
    </AlertItemWrapper>
  );
};

export default AlertItem;
