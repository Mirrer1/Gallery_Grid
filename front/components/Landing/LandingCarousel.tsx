import React, { useCallback, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { RootState } from 'store/reducers';
import { slideInFromBottom } from 'styles/Common/animation';
import { CarouselBtn, CarouselImage, CarouselWrapper } from 'styles/Landing/carousel';

const LandingCarousel = () => {
  const { timelinePosts } = useSelector((state: RootState) => state.post);
  const bestProducts = timelinePosts.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bestProducts.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + bestProducts.length) % bestProducts.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <CarouselWrapper>
      <CarouselImage as={motion.div} key={currentIndex} {...slideInFromBottom(0.3)}>
        <img
          src={`http://localhost:3065/${bestProducts[currentIndex].Images[0].src}`}
          alt={`${bestProducts[currentIndex].User.nickname}의 작품 배경 이미지`}
        />
        <img
          src={`http://localhost:3065/${bestProducts[currentIndex].Images[0].src}`}
          alt={`${bestProducts[currentIndex].User.nickname}의 작품 이미지`}
        />
        <p>@Made by {bestProducts[currentIndex].User.nickname}</p>
      </CarouselImage>

      <CarouselBtn>
        <button onClick={handlePrev}>
          <LeftOutlined />
          <span>PREV</span>
        </button>

        <button onClick={handleNext}>
          <span>NEXT</span>
          <RightOutlined />
        </button>
      </CarouselBtn>
    </CarouselWrapper>
  );
};

export default LandingCarousel;
