import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass, EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Image } from 'store/types/postType';
import { hidePostCarousel } from 'store/actions/postAction';
import {
  BackgroundImageContainer,
  CarouselOutsideArea,
  HideSwiperBtn,
  ImageCarouselWrapper
} from 'styles/Timeline/imageCarousel';

type CarouselProps = {
  images: Image[];
};

const PostImageCarousel = ({ images }: CarouselProps) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const hideCarousel = useCallback(() => {
    dispatch(hidePostCarousel());
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperClass) => {
      setActiveIndex(swiper.realIndex);
    },
    [images]
  );

  useEffect(() => {
    console.log(`images: ${JSON.stringify(images)}`);
  }, []);

  return (
    <>
      <CarouselOutsideArea onClick={hideCarousel}>
        <HideSwiperBtn onClick={hideCarousel} />
      </CarouselOutsideArea>

      <ImageCarouselWrapper>
        <BackgroundImageContainer $background={`http://localhost:3065/${images[activeIndex].src}`} />

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {images.map((image: Image, i: number) => (
            <SwiperSlide key={i}>
              <img src={`http://localhost:3065/${image.src}`} alt={`${i}번째 이미지`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageCarouselWrapper>
    </>
  );
};

export default PostImageCarousel;
