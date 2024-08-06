import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

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
    height: 12%;
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
    height: 78%;
    font-size: 0.75rem;
  }

  ${media.mobile} {
    height: 72%;
    font-size: 0.7rem;
  }
`;

export const ModalContentOptions = styled.div<{ $isModalCommentListVisible: boolean }>`
  height: 10%;
  padding: 0.8em;
  border-radius: 0 0 5px 0;

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
      color: ${props => (props.$isModalCommentListVisible ? '#6BA2E6' : 'black')};
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
    padding: 0.6em;
    border-radius: 0 0 5px 5px;

    & > div:first-child {
      margin-bottom: 0;
    }
  }
`;
