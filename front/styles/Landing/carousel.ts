import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const CarouselWrapper = styled(motion.section)`
  flex-grow: 1;
  width: 65%;

  ${media.mobile} {
    width: 100%;
  }
`;

export const CarouselImage = styled.div`
  ${({ theme }) => theme.flexSet('center', 'end')};
  margin-bottom: 1em;
  width: 100%;

  & > img {
    width: 80%;
    height: 600px;
    margin-right: 1em;
  }

  & > p {
    writing-mode: vertical-rl;
    opacity: 40%;
  }

  ${media.tablet} {
    & > img {
      height: 450px;
      margin-right: 0.7em;
    }

    & > p {
      font-size: 0.8rem;
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'end')};
    margin-bottom: 0.7em;

    & > img {
      width: 100%;
      height: 400px;
      margin-right: 0;
      margin-bottom: 0.3em;
    }

    & > p {
      writing-mode: horizontal-tb;
      font-size: 0.7rem;
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
    padding: 0;

    & > button > span {
      font-size: 0.7rem;
    }
  }
`;
