import React, { useCallback, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { slideInFromBottom } from 'styles/Common/animation';
import { CarouselBtn, CarouselImage, CarouselWrapper } from 'styles/Landing/carousel';

const LandingCarousel = () => {
  const { timelinePosts } = useSelector((state: RootState) => state.post);
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultPostImages = [
    '/popularPosts/post1.jpg',
    '/popularPosts/post2.jpg',
    '/popularPosts/post3.jpg',
    '/popularPosts/post4.jpg',
    '/popularPosts/post5.jpg'
  ];
  const displayedPosts = timelinePosts?.length >= 5 ? timelinePosts : defaultPostImages;

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % displayedPosts.length);
  }, [displayedPosts]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + displayedPosts.length) % displayedPosts.length);
  }, [displayedPosts]);

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
          src={
            timelinePosts?.length >= 5
              ? imgURL(displayedPosts[currentIndex]?.Images[0].src)
              : displayedPosts[currentIndex]
          }
          alt={
            timelinePosts?.length >= 5
              ? `${displayedPosts[currentIndex]?.User.nickname}의 작품 배경 이미지`
              : `기본 이미지 ${currentIndex + 1}`
          }
        />
        <img
          src={
            timelinePosts?.length >= 5
              ? imgURL(displayedPosts[currentIndex]?.Images[0].src)
              : displayedPosts[currentIndex]
          }
          alt={
            timelinePosts?.length >= 5
              ? `${displayedPosts[currentIndex]?.User.nickname}의 작품 배경 이미지`
              : `기본 이미지 ${currentIndex + 1}`
          }
        />
        {timelinePosts?.length >= 5 && <p>@Made by {displayedPosts[currentIndex]?.User.nickname}</p>}
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
