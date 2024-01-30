import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const BestPostWrapper = styled.section`
  ${HoverStyle('& > div > button')}
  flex-grow: 1;

  & > div:first-child {
    ${({ theme }) => theme.flexSet('center', 'end')};
    margin-bottom: 1em;
    width: 100%;
  }

  & > div:first-child > img {
    width: 100%;
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

  & > div > button > span {
    font-size: 0.7rem;
    font-weight: 700;
    margin-right: 0.5em;
  }

  ${media.tablet} {
    & > div:first-child > img {
      height: 350px;
      margin-right: 0.7em;
    }

    & > div:first-child > p {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    width: 100%;

    & > div:first-child {
      ${({ theme }) => theme.flexColumnSet('center', 'end')};
    }

    & > div:first-child > img {
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
