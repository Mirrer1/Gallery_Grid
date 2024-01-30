import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';

import media from 'styles/media';

export const ContentsWrapper = styled.main`
  ${({ theme }) => theme.flexSet('space-between', 'start')};
  padding: 2em 6em;

  ${media.tablet} {
    padding: 2em;
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'center')};
  }
`;

export const ContentsText = styled.section<{ selected: string }>`
  margin-right: 2em;

  & > div {
    ${({ theme }) => theme.flexSet('start')};
    font-size: 0.7rem;
    font-weight: 700;
    margin-bottom: 5em;
  }

  & > div > div {
    width: 100px;
    height: 2px;
    background-color: black;
    margin: 0 2em;
  }

  & > h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2em;
    margin-bottom: 0.8em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 70%;
    line-height: 2em;
    margin-bottom: 3em;
  }

  ${HoverStyle('& > button')};
  & > button {
    font-size: 0.9rem;
    font-weight: 700;
  }

  ${media.tablet} {
    & > div {
      font-size: 0.6rem;
    }

    & > h1 {
      font-size: 2rem;
    }

    & > p {
      font-size: 0.6rem;
    }

    & > button {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    margin-right: 0;
    text-align: center;

    & > div {
      ${({ theme }) => theme.flexSet()};
      margin-bottom: 3em;
    }

    & > p {
      font-size: 0.55rem;
      margin-bottom: ${props => (props.selected === 'home' ? '1em' : '4em')};
    }

    & > button {
      font-size: 0.7rem;
      margin-bottom: 4em;
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
