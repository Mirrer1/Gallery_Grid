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
    border-radius: 5px;
  }

  & > img:nth-child(2) {
    width: 65%;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 40%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    ${ImageShadowStyle}
  }

  & > p {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 80%;
    color: white;
    font-weight: 500;
    text-align: end;
    padding: 1em 0.5em 0.7em 0.5em;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-clip: padding-box;
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
      width: 100%;
      right: 0;
      bottom: 0;
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
    }
  }
`;

export const CarouselBtn = styled.div`
  ${HoverStyle('& > button')}
  ${({ theme }) => theme.flexSet('space-between')};
  padding-left: 6em;

  & > button {
    font-weight: 700;

    & > span {
      font-size: 1rem;
      font-weight: 500;
      margin-right: 0.5em;
    }
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
