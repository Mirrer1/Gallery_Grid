import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';

export const ActivityWrapper = styled.div`
  height: 100%;
  padding: 1% 2% 0 2%;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    padding: 0;
  }

  ${media.mobile} {
    padding: 0;
    margin-bottom: 0.5em;
  }
`;

export const ActivityHeader = styled(motion.header)`
  padding: 1.3em 0;
  background-color: white;
  margin-bottom: 0.8em;
  border-radius: 5px;

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    width: 70%;
    height: 100%;
    text-align: center;

    & > div:first-child,
    & > div:last-child {
      visibility: hidden;
    }
  }

  ${media.tablet} {
    padding: 1.1em 0;

    & > div {
      width: 100%;
    }
  }

  ${media.mobile} {
    padding: 0.7em 0;
  }
`;

export const HeaderItem = styled.div`
  height: 100%;

  & > h1 {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 60%;
    margin-bottom: 0.5em;
  }

  & > p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.3rem;
    font-weight: 700;
  }

  & > div {
    width: 3px;
    height: 100%;
    background-color: #e4e5ec;
  }

  ${media.tablet} {
    & > div {
      height: 42.39px;
    }
  }

  ${media.mobile} {
    & > h1 {
      font-size: 0.75rem;
    }

    & > p {
      font-size: 1.1rem;
    }
  }
`;
