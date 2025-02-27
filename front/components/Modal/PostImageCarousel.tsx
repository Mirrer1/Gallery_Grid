import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass, EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { imgURL } from 'config';
import { Image } from 'store/types/postType';
import { RootState } from 'store/reducers';
import { hidePostCarousel } from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import {
  BackgroundImageContainer,
  CarouselOutsideArea,
  HideSwiperBtn,
  ImageCarouselWrapper
} from 'styles/Timeline/imageCarousel';

const PostImageCarousel = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const { postCarousel } = useSelector((state: RootState) => state.post);

  const hideCarousel = useCallback(() => {
    dispatch(hidePostCarousel());
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperClass) => {
      setActiveIndex(swiper.realIndex);
    },
    [postCarousel]
  );

  return (
    <>
      <CarouselOutsideArea onClick={hideCarousel}>
        <HideSwiperBtn onClick={hideCarousel} />
      </CarouselOutsideArea>

      <ImageCarouselWrapper {...slideInModal}>
        <BackgroundImageContainer $background={`${postCarousel[activeIndex].src}`} />

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
          {postCarousel.map((image: Image, i: number) => (
            <SwiperSlide key={i}>
              <img src={imgURL(image.src)} alt={`게시글의 ${i}번째 이미지`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageCarouselWrapper>
    </>
  );
};

export default PostImageCarousel;
