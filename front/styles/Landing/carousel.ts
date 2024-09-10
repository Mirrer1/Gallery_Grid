import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { ImageShadowStyle } from 'styles/Common/shadow';

export const CarouselWrapper = styled(motion.section)`
  flex-grow: 1;
  width: 55%;

  ${media.tablet} {
    width: 100%;
  }
`;

export const CarouselImage = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('end', 'end')};
  margin-bottom: 4em;
  width: 100%;

  & > img:first-child {
    width: 80%;
    height: 600px;
    filter: blur(5px);
  }

  & > img:nth-child(2) {
    width: 65%;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    ${ImageShadowStyle}
  }

  & > p {
    position: absolute;
    right: 3%;
    bottom: 3%;
    color: #fffafa;
    font-weight: 500;
  }

  ${media.tablet} {
    ${({ theme }) => theme.flexColumnSet('center', 'end')};
    height: 600px;
    margin-bottom: 2em;

    & > img:first-child {
      width: 100%;
      height: 100%;
      margin-right: 0;
      margin-bottom: 0.3em;
    }

    & > img:nth-child(2) {
      width: 90%;
      height: 85%;
      top: 46%;
      left: 50%;
    }

    & > p {
      right: 2%;
      bottom: 4%;
      font-size: 1rem;
    }
  }

  ${media.mobile} {
    justify-content: start;
    height: 355px;
    margin-bottom: 1.5em;

    & > img:nth-child(2) {
      top: 46%;
      left: 50%;
    }

    & > p {
      font-size: 0.8rem;
      bottom: 3.5%;
      right: 5%;
    }
  }
`;

export const CarouselBtn = styled.div`
  ${HoverStyle('& > button')}
  ${({ theme }) => theme.flexSet('space-between')};
  padding-left: 6em;

  & > button > span {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5em;
  }

  ${media.tablet} {
    padding: 0 1em;
  }

  ${media.mobile} {
    & > button > span {
      font-size: 0.9rem;
    }
  }
`;
