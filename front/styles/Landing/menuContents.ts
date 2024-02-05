import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';

import media from 'styles/media';
import { motion } from 'framer-motion';

export const ContentsWrapper = styled.main`
  ${({ theme }) => theme.flexSet('space-between', 'start')};
  padding: 2em 3em 0 6em;

  ${media.tablet} {
    padding: 6em 0 0 3em;
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'center')};
    padding: 1em;
  }
`;

export const ContentsText = styled(motion.section)<{ $selected: string }>`
  width: 35%;
  margin: 2em 0 0 0;

  & > div {
    ${({ theme }) => theme.flexSet('start')};
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 5em;
  }

  & > div > div {
    width: 100px;
    height: 2px;
    background-color: black;
    margin: 0 2em;
  }

  & > h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.2em;
    margin-bottom: 0.8em;
  }

  & > p {
    opacity: 70%;
    line-height: 2em;
    margin-bottom: 3em;
  }

  ${HoverStyle('& > button')};
  & > button {
    font-size: 1.1rem;
    font-weight: 500;
  }

  ${media.tablet} {
    margin: 1.5em 0 0 0;

    & > div {
      font-size: 0.8rem;
      margin-bottom: 3em;
    }

    & > h1 {
      font-size: 2.5rem;
      margin-bottom: 0.6em;
    }

    & > p {
      font-size: 0.8rem;
      margin-bottom: 2em;
    }

    & > button {
      font-size: 0.9rem;
    }
  }

  ${media.mobile} {
    margin-right: 0;
    text-align: center;
    width: 100%;

    & > div {
      ${({ theme }) => theme.flexSet()};
      margin-bottom: 3em;
    }

    & > p {
      font-size: 0.7rem;
      margin-bottom: ${props => (props.$selected === 'home' ? '1em' : '4em')};
    }

    & > button {
      font-size: 0.8rem;
      margin-bottom: 2.5em;
    }
  }
`;

export const HeaderBreak = styled.br`
  display: block;

  ${media.mobile} {
    display: none;
  }
`;

export const ContentBreak = styled.br`
  display: none;

  ${media.tablet} {
    display: block;
  }

  ${media.mobile} {
    display: none;
  }
`;
