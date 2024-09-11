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

export const ActivityHeader = styled.header`
  padding: 1.5em 1em;

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
  }

  ${media.mobile} {
    padding: 0.5em 1.5em;
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
  ${({ theme }) => theme.flexSet('center', 'start')};
  margin-bottom: 0.5em;

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()};
  }
`;
