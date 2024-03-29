import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const PostingWrapper = styled.form`
  background-color: ${({ theme }) => theme.colors.darkBg};
  height: 31%;
  border-radius: 5px 5px 0 0;

  & > textarea {
    width: 100%;
    height: 70%;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 1.5em;
    border-radius: 5px 5px 0 0;
    border: none;
    outline: none;
    resize: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 0 1.2em;

    & > div:first-child > span {
      ${HoverStyle('&')}
      opacity: 70%;
      margin-right: 1em;
      cursor: pointer;
    }

    & > div:last-child {
      ${({ theme }) => theme.flexSet()};

      & > p {
        font-size: 0.75rem;
        font-weight: 500;
        opacity: 40%;
        margin-right: 1em;
      }
    }
  }

  ${media.tablet} {
    height: 230px;
  }

  ${media.mobile} {
    height: 210px;

    & > textarea {
      padding: 1em;
    }

    & > div {
      padding: 0 1em;

      & > div:first-child > span {
        font-size: 0.9rem;
      }

      & > div:last-child {
        & > p {
          font-size: 0.7rem;
          margin-right: 0.8em;
        }
      }
    }
  }
`;

export const PostingBtn = styled.button<{ $active: boolean }>`
  ${props => (props.$active ? HoverStyle('&') : '')};
  opacity: ${props => (props.$active ? '100%' : '40%')};
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
  padding: 0.7em 2em;
  border-radius: 5px;

  ${media.mobile} {
    font-size: 0.75rem;
  }
`;
