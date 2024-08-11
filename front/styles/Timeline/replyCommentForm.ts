import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const ReplyCommentWrapper = styled(motion.form)`
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
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.darkBg};
    padding: 0.5em;

    & > div:first-child {
      position: relative;
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

export const ReplyCommentImageWrapper = styled.section`
  width: 100%;
  position: relative;
  background-color: white;
`;

export const ReplyCommentImage = styled(motion.div)`
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

export const ReplyCommentEmojiPicker = styled.div`
  & > div:first-child {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 49;
  }

  & > div:last-child {
    position: absolute;
    top: 1%;
    right: 25%;
    z-index: 50;
  }

  ${media.tablet} {
    & > div:last-child {
      width: fit-content;
      top: 2.5%;
      left: 1%;
      right: 0;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      top: 1%;
      left: 2%;
    }
  }
`;

export const ReplyCommentBtn = styled.button<{ $active: boolean }>`
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

export const ReplyCancelBtn = styled.button`
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
