import React from 'react';
import { CaretLeftOutlined, CaretRightOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';

import { PopularBtn, PopularOptions, PopularUserContents, PopularUserWrapper } from 'styles/Timeline/popularUser';

const PopularUser = () => {
  return (
    <PopularUserWrapper>
      <div>
        <img src="https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg" alt="popular user image" />

        <PopularUserContents>
          <div>Popular</div>
          <h1>Lorem ipsum, dolor</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse quis ex corporis eligendi ad et adipisci
            omnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modi
            maiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.
          </p>

          <PopularOptions>
            <div>
              <LikeOutlined />
              <span>24</span>
            </div>

            <div>
              <CommentOutlined />
              <span>13</span>
            </div>
          </PopularOptions>
        </PopularUserContents>

        <PopularBtn $alignleft="true">
          <CaretLeftOutlined />
        </PopularBtn>

        <PopularBtn $alignleft="false">
          <CaretRightOutlined />
        </PopularBtn>
      </div>
    </PopularUserWrapper>
  );
};

export default PopularUser;
