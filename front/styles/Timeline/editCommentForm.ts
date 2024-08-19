import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const EditCommentWrapper = styled.div<{ $reply: boolean }>`
  padding-left: ${props => (props.$reply ? '2em' : '0')};
`;

export const EditCommentFormSection = styled(motion.form)`
  border: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 5px;
  margin-bottom: 1em;

  & > textarea {
    width: 100%;
    font-size: 0.7rem;
    line-height: 1.5;
    padding: 1em 0.8em;
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
    text-align: end;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 40%;
    padding: 0 1em;
    margin-bottom: 0.5em;
  }

  & > div {
    position: relative;
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.darkBg};
    padding: 0.5em;

    & > div:first-child {
      ${({ theme }) => theme.flexSet()};

      & > input {
        display: none;
      }

      & > span {
        font-size: 0.95rem;
        opacity: 70%;
        margin-right: 0.5em;
        cursor: pointer;
        ${HoverStyle('&')}
      }

      & > div {
        display: inline-block;
        opacity: 70%;
        ${HoverStyle('&')}
        cursor: pointer;

        & > span {
          position: absolute;
          top: -35%;
          right: -13%;
          font-size: 0.5rem;
        }
      }
    }
  }

  ${media.tablet} {
    & > div {
      & > div:first-child {
        & > span {
          font-size: 1rem;
          margin-right: 0.6em;
        }
      }
    }
  }
`;

export const EditCommentHeader = styled.header`
  ${({ theme }) => theme.flexSet('start')};
  margin-bottom: 0.5em;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.4em;
  }

  & > div {
    & > div {
      ${({ theme }) => theme.flexSet('flex-start')};
      margin-bottom: 0.3em;

      & > h1 {
        font-size: 0.9rem;
        font-weight: 500;
        margin-right: 0.3em;
        cursor: pointer;

        @media (min-width: 992px) {
          &:hover {
            text-decoration: underline;
            text-underline-offset: 1.5px;
          }
        }
      }

      & > p {
        font-size: 0.6rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primary};
        background-color: #d6e4f8;
        border-radius: 10px;
        padding: 0.3em 0.6em;
      }
    }

    & > p {
      font-size: 0.65rem;
      opacity: 40%;
    }
  }
`;

export const EditCommentImageWrapper = styled.section`
  width: 100%;
  position: relative;
  background-color: white;
`;

export const EditCommentImage = styled(motion.div)`
  position: relative;
  width: fit-content;
  padding: 0.5em;
  height: 120px;
  cursor: pointer;

  & > img {
    width: 120px;
    height: 100%;
    border-radius: 5px;
    ${DarkShadowStyle};
  }

  & > span {
    position: absolute;
    top: 8%;
    right: 7%;
    font-size: 0.9rem;
    opacity: 40%;
    cursor: pointer;
    ${ReverseHoverStyle('&')}
  }

  ${media.tablet} {
    & > span {
      top: 10%;
      right: 8%;
      opacity: 70%;
    }
  }
`;

export const EditCommentEmojiPicker = styled.div`
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
    bottom: -20%;
    right: -5%;
    z-index: 50;
  }

  ${media.tablet} {
    & > div:last-child {
      bottom: -16%;
      left: -15%;
      right: 0;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      bottom: -14%;
      left: -25%;
    }
  }
`;

export const EditCommentBtn = styled.button<{ $active: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  opacity: ${props => (props.$active ? '100%' : '40%')};
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  margin-right: 0.3em;

  span {
    padding: 0em 0.54em;
  }

  ${media.tablet} {
    font-size: 0.8rem;
  }
`;

export const EditCancelBtn = styled.button`
  color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  ${HoverStyle('&')};

  span {
    padding: 0em 0.54em;
  }

  ${media.tablet} {
    font-size: 0.8rem;
  }
`;
