import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const BestPost = () => {
  return (
    <main>
      <section>
        <div>
          <p>best</p>
          <span></span>
          <p>1</p>
        </div>

        <h1>
          Gallery
          <br />
          Grid
        </h1>

        <p>
          당신의 창의력을 펼쳐보세요. 여기가 바로 시작입니다.
          <br />
          예술가들의 커뮤니티에서 영감을 얻고, 당신의 작품을 세상과 공유하세요.
          <br />
          새로운 미술 세계를 경험하고, 무한한 가능성을 탐험해보세요.
        </p>

        <button type="button">MORE +</button>
      </section>

      <section>
        <div>
          <img src="https://i.ibb.co/n70QqMG/drawing-series-by.jpg" alt="product image" />
          <p>@Made by Mirrer</p>
        </div>

        <div>
          <div>
            <LeftOutlined />
            <span>Prev</span>
          </div>

          <div>
            <span>Next</span>
            <RightOutlined />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BestPost;
