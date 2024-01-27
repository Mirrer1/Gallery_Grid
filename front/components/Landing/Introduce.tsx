import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IntroImage, IntroText, IntroWrapper, ContentBreak, HeaderBreak } from 'styles/Landing/introduce';

const Introduce = () => {
  return (
    <IntroWrapper>
      <IntroText>
        <div>
          <p>Work</p>
          <div></div>
          <p>1</p>
        </div>

        <h1>
          Gallery&nbsp;
          <HeaderBreak />
          Grid
        </h1>

        <p>
          당신의 창의력을 펼쳐보세요. <ContentBreak />
          여기가 바로 시작입니다.
          <br />
          예술가들의 커뮤니티에서 영감을 얻고, <ContentBreak />
          당신의 작품을 세상과 공유하세요.
          <br />
          새로운 미술 세계를 경험하고, <ContentBreak />
          무한한 가능성을 탐험해보세요.
        </p>

        <button type="button">MORE +</button>
      </IntroText>

      <IntroImage>
        <div>
          <img src="https://i.ibb.co/n70QqMG/drawing-series-by.jpg" alt="product image" />
          <p>@Made by Mirrer</p>
        </div>

        <div>
          <button>
            <LeftOutlined />
            <span>Prev</span>
          </button>

          <button>
            <span>Next</span>
            <RightOutlined />
          </button>
        </div>
      </IntroImage>
    </IntroWrapper>
  );
};

export default Introduce;
