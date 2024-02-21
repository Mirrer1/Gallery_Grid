import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const ChatWrapper = styled.article<{ $visible: boolean }>`
  display: ${props => (props.$visible ? 'block' : 'none')};
  width: 65%;
  height: 100%;
  padding: 1em 1.5em 1em 0.75em;

  & > div {
    height: 100%;
  }

  ${media.tablet} {
    width: 100%;
    padding: 0.5em 0.5em 0 0.5em;
  }
`;

export const ChatHeader = styled.header`
  height: 5%;
  margin-bottom: 0.7em;
  padding-bottom: 3em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > div {
    ${({ theme }) => theme.flexSet('space-between')}
    margin-bottom: 0.3em;

    & > h1 {
      font-size: 1.1rem;
      font-weight: 500;
    }

    & > span {
      font-size: 1.1rem;
      ${HoverStyle('&')}
    }
  }

  & > p {
    width: 90%;
    font-size: 0.7rem;
    opacity: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${media.tablet} {
    position: fixed;
    top: 0;
    right: 0;
    width: 75%;
    z-index: 20;
    background-color: ${({ theme }) => theme.colors.bg};
    padding: 0.7em 1em 3em 1em;

    & > div {
      margin-bottom: 0.5em;

      & > h1 {
        font-size: 1.2rem;
      }

      & > span {
        display: block;
      }
    }

    & > p {
      font-size: 0.65rem;
    }
  }

  ${media.mobile} {
    width: 100%;

    & > div {
      & > h1 {
        font-size: 1rem;
      }

      & > span {
        font-size: 0.9rem;
      }
    }
  }
`;

export const ChatItemWrapper = styled.div`
  height: 87%;
  overflow-y: scroll;
  padding: 0.5em 0.7em;

  ${media.tablet} {
    padding: 3.5em 0 3em 0;
  }

  ${media.mobile} {
    padding: 0.2em;
  }
`;

export const ReceiveChat = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('start')};
  margin-bottom: 1em;

  & > div:first-child {
    width: 10%;
    ${({ theme }) => theme.flexColumnSet()};
    margin-right: 0.3em;

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 0.5em;
    }

    & > div {
      font-size: 0.75rem;
      opacity: 70%;
    }
  }

  & > div:last-child {
    width: 90%;

    & > p {
      width: fit-content;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 0.9rem;
      line-height: 1.3;
      background-color: ${({ theme }) => theme.colors.darkBg};
      border-radius: 5px;
      padding: 0.7em 1em;
    }
  }

  ${media.tablet} {
    & > div:first-child {
      margin-right: 0.5em;
    }
  }

  ${media.mobile} {
    margin-bottom: 0.5em;

    & > div:first-child {
      width: 15%;
      margin-right: 0.5em;

      & > img {
        margin-bottom: 0.5em;
      }

      & > div {
        font-size: 0.65rem;
      }
    }

    & > div:last-child {
      & > p {
        font-size: 0.8rem;
      }
    }
  }
`;

export const SendChat = styled.div`
  ${({ theme }) => theme.flexSet('end')}
  margin-bottom: 1em;

  & > p {
    width: fit-content;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 0.9rem;
    line-height: 1.3;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    padding: 0.7em 1em;
  }

  ${media.mobile} {
    margin-bottom: 0.5em;

    & > p {
      font-size: 0.8rem;
    }
  }
`;

export const ChatInputWrapper = styled.div<{ $active: boolean }>`
  height: 6%;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.5em 0.8em;

  & > div:first-child {
    width: 88%;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      width: 5%;
      font-size: 1.2rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > input {
      width: 95%;
      font-size: 0.9rem;
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
    width: 12%;
    ${({ theme }) => theme.flexSet('end')}

    & > span:first-child {
      font-size: 0.9rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
      margin-right: 0.4em;
    }

    & > span:last-child {
      font-size: 0.95rem;
      color: white;
      opacity: ${props => (props.$active ? '40%' : '100%')};
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: 0.5em 0.5em 0.5em 0.6em;
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    width: 75%;
    position: fixed;
    right: 0;
    bottom: 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 60px;
    z-index: 20;
  }
`;
