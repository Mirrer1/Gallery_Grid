import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';

export const ActivityWrapper = styled.div`
  height: 100%;
  padding: 1em 2em;

  ${media.tablet} {
    padding: 0;
  }

  ${media.mobile} {
    padding: 0;
  }
`;

export const ActivityHeader = styled.header`
  height: 11%;
  padding: 1.5em 0.5em;

  & > div {
    ${({ theme }) => theme.flexSet('start')};
  }

  & > div > div {
    text-align: center;
    margin-right: 4em;
    border-right: 3px solid #e4e5ec;
    padding-right: 5em;

    &:last-child {
      margin-right: 0;
      border-right: none;
      padding-right: 0;
    }
  }

  ${media.tablet} {
    padding: 0.5em;
    margin-bottom: 1em;

    & > div {
      justify-content: center;
    }
  }

  ${media.mobile} {
    padding: 0.5em 0.8em;
    margin-bottom: 0.7em;

    & > div {
      justify-content: space-between;
    }

    & > div > div {
      margin-right: 0;
      padding-right: 3.5em;
    }
  }
`;

export const HeaderItem = styled.div`
  & > h1 {
    font-size: 0.8rem;
    opacity: 60%;
    margin-bottom: 0.5em;
  }

  & > p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.3rem;
    font-weight: 700;
  }

  ${media.mobile} {
    & > h1 {
      font-size: 0.6rem;
    }

    & > p {
      font-size: 1rem;
    }
  }
`;

export const FollowWrapper = styled(motion.div)`
  height: 8%;
  ${({ theme }) => theme.flexSet('center', 'start')};

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()};
  }
`;
