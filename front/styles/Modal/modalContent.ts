import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const ModalContentWrapper = styled.div`
  flex: 1;
  ${({ theme }) => theme.flexColumnSet('normal', 'normal')};
  height: 100%;
  background-color: white;
  border-radius: 0 5px 5px 0;
  z-index: 30;

  ${media.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0 15px 0 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 50%;
    border-radius: 0;
  }
`;

export const ModalContentHeader = styled.div<{ $isFollowing: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 0.8em;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkBg};

  & > div:first-child {
    ${({ theme }) => theme.flexSet()};

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 0.5em;
      cursor: pointer;
    }

    & > div > a {
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
    }

    & > div > p {
      font-size: 0.7rem;
      opacity: 40%;
      margin-top: 0.3em;
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.flexSet()};

    & > button {
      width: 80px;
      font-size: 0.7rem;
      background-color: ${props => (props.$isFollowing ? 'white' : '#6BA2E6')};
      color: ${props => (props.$isFollowing ? '#6BA2E6' : 'white')};
      border: ${props => props.$isFollowing && '1px solid #6BA2E6'};
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

      & > div > a {
        font-size: 0.8rem;
      }

      & > div > p {
        font-size: 0.65rem;
      }
    }

    & > div:last-child {
      & > button {
        font-size: 0.6rem;
        width: 70px;
      }
    }
  }

  ${media.mobile} {
    padding: 0.5em;
  }
`;

export const ModalContentText = styled.div<{ $isModalCommentListVisible: boolean }>`
  flex-grow: 1;
  height: 1px;
  display: ${props => (props.$isModalCommentListVisible ? 'none' : 'block')};
  color: ${({ theme }) => theme.colors.font};
  font-size: 0.85rem;
  line-height: 1.5;
  white-space: pre-wrap;
  padding: 0.7em 1.2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  overflow-y: auto;

  ${media.tablet} {
    display: block;
    font-size: 0.75rem;
  }

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

export const ModalContentOptions = styled.div<{ $liked: boolean; $isModalCommentListVisible: boolean }>`
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
      color: ${props => (props.$liked ? '#EE6B6E' : 'black')};
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
    padding: 1em 0.5em;
    border-radius: 0 0 5px 5px;

    & > div:first-child {
      margin-bottom: 0;
    }
  }
`;
