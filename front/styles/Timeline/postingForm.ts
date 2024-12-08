import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostingWrapper = styled.form<{ $uploading: boolean }>`
  background-color: ${({ theme }) => theme.colors.darkBg};
  height: ${props => (props.$uploading ? '40%' : '31%')};
  border-radius: 5px 5px 0 0;
  ${({ theme }) => theme.flexColumnSet('normal', 'normal')};
  gap: 12px;

  & > textarea {
    flex: 1;
    width: 100%;
    font-size: 0.8rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 1.2em 1.2em 0 1.2em;
    border-radius: 5px 5px 0 0;
    border: none;
    outline: none;
    resize: none;
  }

  & > div {
    position: relative;
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 0 1.2em 0.8em 1.2em;

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

  ${media.mobile} {
    & > div {
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
  padding: 0 1em;
  gap: 8px;

  & > div {
    width: 15%;
    aspect-ratio: 1/1;
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
      & > span {
        font-size: 0.8rem;
        opacity: 60%;
      }
    }
  }

  ${media.mobile} {
    padding: 0 0.8em;

    & > div {
      width: 18%;
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
