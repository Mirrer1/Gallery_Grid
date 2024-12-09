import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const EditModalCarouselWrapper = styled.div`
  width: 65%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px 0 0 5px;
  padding: 0.5em;
  overflow: hidden;
  z-index: 30;
  ${({ theme }) => theme.flexColumnSet('space-between', 'normal')};

  ${media.tablet} {
    border-radius: 15px 0 0 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 65%;
    border-radius: 15px 15px 0 0;
  }
`;

export const EditModalSelectedImage = styled(motion.div)`
  width: 100%;
  height: 1px;
  flex-grow: 1;
  margin-bottom: 0.5em;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const EditModalSwiperImages = styled.div`
  height: 29%;
  margin-bottom: 0.5em;

  .swiper {
    padding: 0;
    height: 100%;
  }

  .swiper-slide {
    height: 100%;
    position: relative;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 25px;
    height: 25px;
    transform: translateY(50%);
  }

  .swiper-button-prev {
    left: 0.7%;
  }

  .swiper-button-next {
    right: 0.7%;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    width: 23px;
    height: 23px;
  }

  .swiper-pagination {
    bottom: 1.5%;
  }

  .swiper-slide img {
    border-radius: 0;
    height: 100%;
  }

  ${media.tablet} {
    height: 27%;
  }

  ${media.mobile} {
    height: 30%;

    .swiper-button-prev,
    .swiper-button-next {
      width: 20px;
      height: 20px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      width: 18px;
      height: 18px;
    }
  }
`;

export const EditModalSwiperImageItem = styled.img<{ selected: boolean }>`
  border: ${props => (props.selected ? '2px solid #6BA2E6' : 'none')};
  cursor: pointer;
`;

export const EditModalOptionBtn = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;

  & > span {
    opacity: 40%;
    cursor: pointer;
    ${ReverseHoverStyle('&')}
  }

  & > span:first-child,
  span:nth-child(2) {
    margin-right: 0.4em;
  }

  ${media.tablet} {
    & > span {
      font-size: 0.9rem;
    }

    & > span:first-child,
    span:nth-child(2) {
      margin-right: 0.3em;
    }
  }
`;

export const EditModalUploadBtn = styled.div`
  width: 100%;
  height: 5%;

  & > div {
    ${({ theme }) => theme.flexSet()};
    height: 100%;
    font-size: 0.7rem;
    background-color: #6ba2e6;
    color: white;
    font-weight: 500;
    padding: 0.7em 1.5em;
    cursor: pointer;

    & > span {
      font-size: 1rem;
      margin-right: 0.2em;
    }

    & > p {
      line-height: 0;
    }
  }

  & > input {
    display: none;
  }

  ${media.tablet} {
    height: 5%;
  }

  ${media.mobile} {
    height: 7%;

    & > div {
      padding: 0.5em;
      font-size: 0.65rem;

      & > span {
        font-size: 0.8rem;
        margin-right: 0.4em;
      }
    }
  }
`;
