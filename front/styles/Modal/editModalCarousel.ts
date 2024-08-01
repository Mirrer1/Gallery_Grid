import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ReverseHoverStyle } from 'styles/Common/hover';

import media from 'styles/media';

export const EditModalCarouselWrapper = styled.div`
  width: 55%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px 0 0 5px;
  padding: 0.5em;
  overflow: hidden;
  z-index: 30;

  ${media.mobile} {
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
`;

export const EditModalSelectedImage = styled(motion.div)`
  width: 100%;
  height: 63.5%;
  margin-bottom: 0.5em;

  & > img {
    width: 100%;
    height: 100%;
  }

  ${media.tablet} {
    height: 63%;
  }

  ${media.mobile} {
    height: 61%;
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

  .swiper-slide img {
    border-radius: 0;
    height: 100%;
  }

  .swiper-slide span {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 0.9rem;
    opacity: 40%;
    cursor: pointer;
    ${ReverseHoverStyle('&')}
  }

  ${media.mobile} {
    height: 27%;
  }
`;

export const EditModalSwiperImageItem = styled.img<{ selected: boolean }>`
  border: ${props => (props.selected ? '2px solid #6BA2E6' : 'none')};
  cursor: pointer;
`;

export const EditModalUploadBtn = styled.div`
  width: 100%;
  height: 5%;

  & > div {
    ${({ theme }) => theme.flexSet()};
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

  ${media.mobile} {
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
