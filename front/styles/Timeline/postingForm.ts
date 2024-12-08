import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostingWrapper = styled.form<{ $uploading: boolean }>`
  background-color: ${({ theme }) => theme.colors.darkBg};
  height: ${props => (props.$uploading ? '40%' : '31%')};
  border-radius: 5px 5px 0 0;

  & > textarea {
    width: 100%;
    height: ${props => (props.$uploading ? '42%' : '70%')};
    font-size: 0.8rem;
    line-height: 1.5;
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
    position: relative;
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    height: ${props => (props.$uploading ? '15%' : '28%')};
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 0 1.2em;

    & > div:first-child {
      ${({ theme }) => theme.flexSet()};

      & > input {
        display: none;
      }

      & > span {
        ${HoverStyle('&')}
        opacity: 70%;
        margin-right: 1em;
        cursor: pointer;
      }

      & > div {
        position: relative;
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
    height: ${props => (props.$uploading ? '315px' : '230px')};
  }

  ${media.mobile} {
    height: ${props => (props.$uploading ? '275px' : '210px')};

    & > textarea {
      padding: 1em;
    }

    & > div {
      padding: 0 1em;

      & > div:first-child {
        & > span {
          font-size: 0.9rem;
        }

        & > div {
          & > p {
            font-size: 0.7rem;
          }

          & > span {
            font-size: 0.48rem;
          }
        }
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

export const UploadImages = styled.section`
  ${({ theme }) => theme.flexSet('start')};
  height: 42%;
  padding: 0 1em;

  & > div {
    width: 100px;
    height: 100px;
    margin-right: 0.5em;
    cursor: pointer;
    position: relative;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    & > span {
      position: absolute;
      top: 2%;
      right: 2%;
      font-size: 0.9rem;
      opacity: 40%;
      cursor: pointer;
      ${ReverseHoverStyle('&')}
    }
  }

  & > div:last-child {
    margin-right: 0;
  }

  ${media.tablet} {
    & > div {
      width: 85px;
      height: 85px;

      & > span {
        top: 1%;
        right: 1%;
        opacity: 70%;
      }
    }
  }

  ${media.mobile} {
    padding: 0 0.5em;

    & > div {
      width: 65px;
      height: 65px;
      margin-right: 0.4em;

      & > span {
        font-size: 0.8rem;
        top: -5%;
        right: -5%;
      }
    }
  }
`;

export const PostingEmojiPicker = styled.div<{ $uploading: boolean }>`
  & > div:first-child {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 49;
  }

  & > div:last-child {
    transform: scale(0.8);
    position: absolute;
    top: ${props => (props.$uploading ? '-10%' : '5%')};
    left: 0;
    z-index: 50;
  }

  ${media.tablet} {
    & > div:last-child {
      left: -4%;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      transform: scale(0.7);
      top: ${props => (props.$uploading ? '-80%' : '-40%')};
      left: -8%;
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

  span {
    padding: 0em 0.54em;
  }

  ${media.mobile} {
    font-size: 0.75rem;
  }
`;
