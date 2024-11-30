import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { Image } from 'store/types/postType';
import {
  ModalActiveIndicator,
  ModalActiveIndicatorItem,
  ModalCarouselBtn,
  ModalCarouselWrapper
} from 'styles/Modal/modalCarousel';

const ModalCarousel = () => {
  const [curr, setCurr] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { singlePost } = useSelector((state: RootState) => state.post);

  const next = useCallback(() => {
    setCurr(prev => (prev === singlePost.Images.length - 1 ? prev : prev + 1));
    setTranslateX(0);
  }, [singlePost.Images.length]);

  const prev = useCallback(() => {
    setCurr(prev => (prev === 0 ? prev : prev - 1));
    setTranslateX(0);
  }, [singlePost.Images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && touchStartX !== null) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchMoveX - touchStartX;

      if ((curr === 0 && deltaX > 0) || (curr === singlePost.Images.length - 1 && deltaX < 0)) {
        return;
      }

      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        prev();
      } else if (deltaX < -50) {
        next();
      } else {
        setTranslateX(0);
      }
    }
    setIsDragging(false);
    setTouchStartX(null);
  };

  return (
    <ModalCarouselWrapper onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div
        style={{
          transform: `translateX(calc(-${curr * 100}% + ${translateX}px))`,
          transition: isDragging ? 'none' : 'transform 0.75s ease'
        }}
      >
        {singlePost.Images.map((image: Image, i: number) => (
          <div key={i}>
            <img src={`${image.src.replace(/\/thumb\//, '/original/')}`} alt={`게시글의 ${i}번째 이미지`} />

            {singlePost.Images.length > 1 && (
              <ModalCarouselBtn $alignleft="true" onClick={prev}>
                <CaretLeftOutlined />
              </ModalCarouselBtn>
            )}

            {singlePost.Images.length > 1 && (
              <ModalCarouselBtn $alignleft="false" onClick={next}>
                <CaretRightOutlined />
              </ModalCarouselBtn>
            )}
          </div>
        ))}
      </div>

      <ModalActiveIndicator>
        {singlePost.Images.map((image: Image, i: number) => (
          <ModalActiveIndicatorItem key={image.id} $active={i === curr} />
        ))}
      </ModalActiveIndicator>
    </ModalCarouselWrapper>
  );
};

export default ModalCarousel;
