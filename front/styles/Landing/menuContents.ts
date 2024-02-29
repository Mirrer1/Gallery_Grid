import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';

import media from 'styles/media';
import { motion } from 'framer-motion';

export const ContentsWrapper = styled.main`
  ${({ theme }) => theme.flexSet('space-between', 'start')};
  padding: 2em 10em 0 10em;

  ${media.tablet} {
    ${({ theme }) => theme.flexColumnSet('center', 'center')};
    padding: 2em 4em;
  }

  ${media.mobile} {
    padding: 1em;
  }
`;

export const ContentsText = styled(motion.section)<{ $selected: string }>`
  width: 45%;
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
    width: 100%;
    text-align: center;
    margin-right: 0;
    margin: 1.5em 0 0 0;

    & > div {
      ${({ theme }) => theme.flexSet()};
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
      margin-bottom: 2.5em;
    }
  }

  ${media.mobile} {
    & > p {
      font-size: 0.7rem;
      margin-bottom: ${props => (props.$selected === 'home' ? '1em' : '4em')};
    }

    & > button {
      font-size: 0.8rem;
    }
  }
`;

export const HeaderBreak = styled.br<{ $selected: string }>`
  display: block;

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: ${props => props.$selected === 'signup' && 'block'};
  }
`;
