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
  const { singlePost } = useSelector((state: RootState) => state.post);

  const next = useCallback(() => {
    const newCurr = curr === singlePost.length - 1 ? 0 : curr + 1;
    setCurr(newCurr);
  }, [curr]);

  const prev = useCallback(() => {
    const newCurr = curr === 0 ? singlePost.length - 1 : curr - 1;
    setCurr(newCurr);
  }, [curr]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) prev();
      else if (deltaX < -50) next();
    }
    setTouchStartX(null);
  };

  return (
    <ModalCarouselWrapper onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div style={{ transform: `translateX(-${curr * 100}%)` }}>
        {singlePost.Images.map((image: Image, i: number) => (
          <div key={i}>
            <img src={`http://localhost:3065/${image.src}`} alt={`게시글의 ${i}번째 이미지`} />

            <ModalCarouselBtn $alignleft="true" onClick={prev}>
              <CaretLeftOutlined />
            </ModalCarouselBtn>

            <ModalCarouselBtn $alignleft="false" onClick={next}>
              <CaretRightOutlined />
            </ModalCarouselBtn>
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
