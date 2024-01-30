import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { BestPostWrapper } from 'styles/Landing/bestPost';

const BestPost = () => {
  const bestProduct = [
    { title: 'Product1', img: 'https://i.ibb.co/n70QqMG/drawing-series-by.jpg' },
    { title: 'Product2', img: 'https://i.ibb.co/BCsx9nZ/image.jpg' },
    { title: 'Product3', img: 'https://i.ibb.co/8bqzbyV/1.jpg' }
  ];

  return (
    <BestPostWrapper>
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
    </BestPostWrapper>
  );
};

export default BestPost;
