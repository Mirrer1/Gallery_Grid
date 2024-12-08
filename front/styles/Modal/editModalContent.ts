import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';

import media from 'styles/media';

export const EditModalContentWrapper = styled.div`
  flex: 1;
  ${({ theme }) => theme.flexColumnSet('normal', 'normal')};
  height: 100%;
  background-color: white;
  border-radius: 0 5px 5px 0;
  z-index: 30;

  ${media.tablet} {
    border-radius: 0 15px 0 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 50%;
    border-radius: 0;
  }
`;

export const EditModalContentHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  & > div {
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
      margin-bottom: 0.3em;
      cursor: pointer;
    }

    & > div > p {
      font-size: 0.7rem;
      opacity: 40%;
    }
  }

  ${media.tablet} {
    padding: 0.6em;

    & > div {
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
  }

  ${media.mobile} {
    padding: 1em 0.5em;
  }
`;

export const EditModalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 1px;
  color: ${({ theme }) => theme.colors.font};
  padding: 0.7em 1em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  overflow-y: auto;

  & > textarea {
    width: 100%;
    height: 1px;
    flex-grow: 1;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 0.5em;
    border: none;
    outline: none;
    resize: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > p {
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 40%;
    text-align: end;
  }

  ${media.tablet} {
    & > textarea {
      font-size: 0.75rem;
    }

    & > p {
      font-size: 0.75rem;
    }
  }

  ${media.mobile} {
    padding: 0.7em;

    & > textarea {
      font-size: 0.7rem;
      margin-bottom: 1em;
    }

    & > p {
      font-size: 0.7rem;
    }
  }
`;

export const EditModalBtn = styled.div<{ $active: boolean; $edit: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 0 0 5px 0;

  & > div:first-child {
    position: relative;

    & > span {
      opacity: 70%;
      margin-right: 0.8em;
      cursor: pointer;
      ${HoverStyle('&')}
    }

    & > div {
      position: relative;
      top: -1px;
      display: inline-block;
      opacity: 70%;
      ${HoverStyle('&')}
      cursor: pointer;

      & > p {
        font-size: 0.8rem;
      }

      & > span {
        position: absolute;
        top: -35%;
        right: -13%;
        font-size: 0.5rem;
      }
    }
  }

  & > div:last-child {
    & > button {
      font-size: 0.7rem;
      font-weight: 500;
      border-radius: 5px;
      ${HoverStyle('&')}
    }

    & > button:first-child {
      ${props => (props.$active ? HoverStyle('&') : '')};
      opacity: ${props => (props.$active ? '100%' : '40%')};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      padding: ${props => (props.$edit ? '0.66em 1.92em' : '0.7em 1.5em')};
      margin-right: 0.5em;
    }

    & > button:last-child {
      border: 1px solid ${({ theme }) => theme.colors.red};
      color: ${({ theme }) => theme.colors.red};
      padding: 0.7em 1.5em;
    }
  }

  ${media.tablet} {
    padding: 0.6em;

    & > div:last-child {
      & > button {
        font-size: 0.6rem;
      }
    }
  }

  ${media.mobile} {
    padding: 0.7em 0.5em;
    border-radius: 0 0 5px 5px;

    & > div:first-child {
      & > div {
        top: -2px;

        & > p {
          font-size: 0.7rem;
        }
      }
    }
  }
`;

export const EditModalEmojiPicker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  transform: translate(-50%, -50%);
  z-index: 99;

  & > div:first-child {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  & > div:last-child {
    transform: scale(0.8);
    position: absolute;
    bottom: 18.5%;
    right: 29%;
    z-index: 100;
  }

  ${media.tablet} {
    & > div:last-child {
      right: 22%;
      bottom: 16.5%;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      right: 20.5%;
    }
  }
`;
