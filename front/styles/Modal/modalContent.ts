import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import media from 'styles/media';

export const ModalContentWrapper = styled.div`
  width: 45%;
  height: 100%;
  background-color: white;
  border-radius: 0 5px 5px 0;
  z-index: 30;

  ${media.mobile} {
    width: 100%;
    border-radius: 0 0 5px 5px;
  }
`;

export const ModalContentHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  height: 10%;
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  & > div:first-child {
    ${({ theme }) => theme.flexSet()};

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 0.5em;
      cursor: pointer;
    }

    & > div > h1 {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.3em;
      cursor: pointer;

      @media (min-width: 992px) {
        &:hover {
          text-decoration: underline;
          text-underline-offset: 1.5px;
        }
      }
    }

    & > div > p {
      font-size: 0.7rem;
      opacity: 40%;
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.flexSet()};

    & > button {
      font-size: 0.7rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      margin-right: 0.5em;
      ${HoverStyle('&')}
    }
  }

  ${media.tablet} {
    padding: 0.6em;

    & > div:first-child {
      & > img {
        width: 38px;
        height: 38px;
      }

      & > div > h1 {
        font-size: 0.8rem;
      }

      & > div > p {
        font-size: 0.65rem;
      }
    }

    & > div:last-child {
      & > button {
        font-size: 0.6rem;
        padding: 0.73em 1.5em 0.7em 1.5em;
      }
    }
  }

  ${media.mobile} {
    height: 17%;
    padding: 0.5em;
  }
`;

export const ModalContentText = styled.div`
  height: 80%;
  font-size: 0.85rem;
  line-height: 1.5;
  padding: 0.7em 1.2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  overflow-y: auto;

  ${media.tablet} {
    height: 81%;
    font-size: 0.75rem;
  }

  ${media.mobile} {
    height: 69%;
    font-size: 0.7rem;
  }
`;

export const ModalContentOptions = styled.div<{ $isCommentListVisible: boolean }>`
  height: 10%;
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: ${props => (props.$isCommentListVisible ? '0 0 0 0' : '0 0 5px 0')};

  & > div:first-child {
    margin-bottom: 0.5em;

    & > span {
      font-size: 1.1rem;
      cursor: pointer;
      ${HoverStyle('&')};
    }

    & > span:first-child {
      margin-right: 0.5rem;
    }

    & > span:last-child {
      color: ${props => (props.$isCommentListVisible ? '#6BA2E6' : 'black')};
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.flexSet('start')};
    font-size: 0.8rem;

    & > p:first-child {
      margin-right: 0.5rem;
    }
  }

  ${media.tablet} {
    height: 9%;

    & > div:first-child {
      & > span {
        font-size: 1rem;
      }
    }

    & > div:last-child {
      font-size: 0.7rem;

      & > p:first-child {
        margin-right: 0.4rem;
      }
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexSet('space-between')};
    height: 14%;
    padding: 0.6em;
    border-radius: ${props => (props.$isCommentListVisible ? '0 0 0 0' : '0 0 5px 5px')};

    & > div:first-child {
      margin-bottom: 0;
    }
  }
`;

export const ModalCommentInput = styled.div<{ $active: boolean }>`
  height: 7%;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 0 0 5px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.7em;

  & > div:first-child {
    width: 90%;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      width: 7%;
      font-size: 1.2rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > input {
      width: 95%;
      font-size: 0.8rem;
      padding: 0.5em 1em 0.5em 0.5em;
      border: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        opacity: 60%;
      }
    }
  }

  & > div:last-child {
    width: 10%;
    ${({ theme }) => theme.flexSet('end')}

    & > span {
      font-size: 0.85rem;
      color: white;
      opacity: ${props => (props.$active ? '40%' : '100%')};
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: 0.4em 0.4em 0.4em 0.6em;
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    height: 6%;

    & > div:first-child {
      & > span {
        width: 9%;
      }

      & > input {
        width: 93%;
      }
    }
  }

  ${media.mobile} {
    height: 12%;
    border-radius: 0 0 5px 5px;
  }
`;
