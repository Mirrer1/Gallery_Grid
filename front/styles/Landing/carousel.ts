import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const CarouselWrapper = styled(motion.section)`
  flex-grow: 1;
  width: 65%;

  ${media.mobile} {
    width: 100%;
  }
`;

export const CarouselImage = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('center', 'end')};
  margin-bottom: 4em;
  width: 100%;

  & > img:first-child {
    width: 80%;
    height: 600px;
    filter: blur(5px);
    ${ShadowStyle}
  }

  & > img:nth-child(2) {
    width: 65%;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
    ${ShadowStyle}
  }

  & > p {
    position: absolute;
    right: 13%;
    bottom: 3%;
    color: #fffafa;
    font-weight: 500;
  }

  ${media.tablet} {
    & > img:first-child {
      height: 450px;
    }

    & > img:nth-child(2) {
      width: 70%;
      height: 320px;
      left: 37%;
    }

    & > p {
      font-size: 0.85rem;
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'end')};
    margin-bottom: 3em;

    & > img:first-child {
      width: 100%;
      height: 400px;
      margin-right: 0;
      margin-bottom: 0.3em;
    }

    & > img:nth-child(2) {
      width: 90%;
      left: 50%;
    }

    & > p {
      font-size: 0.7rem;
      right: 3%;
    }
  }
`;

export const CarouselBtn = styled.div`
  ${HoverStyle('& > button')}
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 0 6em;

  & > button > span {
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 0.5em;
  }

  ${media.tablet} {
    padding: 0 3em;

    & > button > span {
      font-size: 0.8rem;
    }
  }

  ${media.mobile} {
    padding: 0 1em;

    & > button > span {
      font-size: 0.7rem;
    }
  }
`;
