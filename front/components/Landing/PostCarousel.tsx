import React, { useCallback, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { CarouselAnimation } from 'styles/Common/animation';
import { CarouselBtn, CarouselImage, CarouselWrapper } from 'styles/Landing/postCarousel';

const PostCarousel = () => {
  const bestProduct = [
    { user: 'user1', img: 'https://i.ibb.co/n70QqMG/drawing-series-by.jpg' },
    { user: 'user2', img: 'https://i.ibb.co/BCsx9nZ/image.jpg' },
    { user: 'user3', img: 'https://i.ibb.co/8bqzbyV/1.jpg' }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bestProduct.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + bestProduct.length) % bestProduct.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <CarouselWrapper>
      <CarouselImage as={motion.div} key={currentIndex} {...CarouselAnimation}>
        <img src={bestProduct[currentIndex].img} alt={`${bestProduct[currentIndex].user}의 작품`} />
        <p>@Made by {bestProduct[currentIndex].user}</p>
      </CarouselImage>

      <CarouselBtn>
        <button onClick={handlePrev}>
          <LeftOutlined />
          <span>Prev</span>
        </button>

        <button onClick={handleNext}>
          <span>Next</span>
          <RightOutlined />
        </button>
      </CarouselBtn>
    </CarouselWrapper>
  );
};

export default PostCarousel;
