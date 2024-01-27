import styled from 'styled-components';
import media from 'styles/media';

export const IntroWrapper = styled.main`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 2em 6em;

  ${media.tablet} {
    padding: 2em;
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('center', 'start')};
  }
`;

export const IntroText = styled.section`
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

  & > button {
    font-size: 0.9rem;
    font-weight: 700;
    transition: opacity 200ms ease-in-out;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
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

    & > div {
      margin-bottom: 3em;
    }

    & > p {
      font-size: 0.55rem;
      margin-bottom: 1em;
    }

    & > button {
      font-size: 0.7rem;
      margin-bottom: 4em;
    }
  }
`;

export const IntroImage = styled.section`
  & > div:first-child {
    ${({ theme }) => theme.flexSet('center', 'end')};
    margin-bottom: 1em;
  }

  & > div:first-child > img {
    width: 600px;
    height: 500px;
    margin-right: 1em;
  }

  & > div:first-child > p {
    writing-mode: vertical-rl;
    font-size: 0.8rem;
    opacity: 40%;
  }

  & > div:nth-child(2) {
    ${({ theme }) => theme.flexSet('space-between')};
  }

  & > div > button {
    transition: opacity 200ms ease-in-out;
  }

  & > div > button:hover {
    opacity: 40%;
  }

  & > div > button:active {
    opacity: 100%;
  }

  & > div > button > span {
    font-size: 0.6rem;
    font-weight: 700;
    margin-right: 0.5em;
  }

  ${media.tablet} {
    & > div:first-child > img {
      width: 450px;
      height: 350px;
      margin-right: 0.7em;
    }

    & > div:first-child > p {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    & > div:first-child {
      ${({ theme }) => theme.flexColumnSet('center', 'end')};
    }

    & > div:first-child > img {
      width: 350px;
      height: 400px;
      margin-right: 0;
      margin-bottom: 0.3em;
    }

    & > div:first-child > p {
      writing-mode: horizontal-tb;
      font-size: 0.6rem;
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
