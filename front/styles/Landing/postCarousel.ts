import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const CarouselWrapper = styled(motion.section)`
  flex-grow: 1;

  ${media.mobile} {
    width: 100%;
  }
`;

export const CarouselImage = styled.div`
  ${({ theme }) => theme.flexSet('center', 'end')};
  margin-bottom: 1em;
  width: 100%;

  & > img {
    cursor: pointer;
    width: 90%;
    height: 500px;
    margin-right: 1em;
  }

  & > p {
    writing-mode: vertical-rl;
    font-size: 0.8rem;
    opacity: 40%;
  }

  ${media.tablet} {
    & > img {
      height: 350px;
      margin-right: 0.7em;
    }

    & > p {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'end')};

    & > img {
      width: 100%;
      height: 400px;
      margin-right: 0;
      margin-bottom: 0.3em;
    }

    & > p {
      writing-mode: horizontal-tb;
      font-size: 0.6rem;
    }
  }
`;

export const CarouselBtn = styled.div`
  ${HoverStyle('& > button')}
  ${({ theme }) => theme.flexSet('space-between')};

  & > button > span {
    font-size: 0.7rem;
    font-weight: 500;
    margin-right: 0.5em;
  }
`;
