import React, { useCallback, useState } from 'react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { ModalCarouselBtn, ModalCarouselWrapper } from 'styles/Modal/modalCarousel';

const ModalCarousel = () => {
  const postImages = [
    'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
    'https://i.pinimg.com/564x/b1/bc/32/b1bc32636df7757cc51cf52a71a2a78f.jpg',
    'https://i.pinimg.com/564x/e7/5b/41/e75b41ec9be4ff5303804a35466544e3.jpg'
  ];

  const [curr, setCurr] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = useCallback(() => {
    const newCurr = curr === postImages.length - 1 ? 0 : curr + 1;
    setCurr(newCurr);
  }, [curr]);

  const prev = useCallback(() => {
    const newCurr = curr === 0 ? postImages.length - 1 : curr - 1;
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
        {postImages.map((post, i) => (
          <div key={i}>
            <img src={post} alt={`${post} 이미지 ${i}`} />

            <ModalCarouselBtn $alignleft="true" onClick={prev}>
              <CaretLeftOutlined />
            </ModalCarouselBtn>

            <ModalCarouselBtn $alignleft="false" onClick={next}>
              <CaretRightOutlined />
            </ModalCarouselBtn>
          </div>
        ))}
      </div>
    </ModalCarouselWrapper>
  );
};

export default ModalCarousel;
