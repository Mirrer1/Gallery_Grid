import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const EditCommentWrapper = styled(motion.div)``;

export const EditCommentFormSection = styled.form`
  border: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 5px;
  width: 100%;

  & > textarea {
    width: 100%;
    font-size: 0.7rem;
    line-height: 1.5;
    padding: 1em 0.8em;
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
    border-top: 1px solid ${({ theme }) => theme.colors.darkBg};
    padding: 0.5em;

    & > div:first-child {
      ${({ theme }) => theme.flexSet()};

      & > input {
        display: none;
      }

      & > span {
        font-size: 0.95rem;
        opacity: 40%;
        margin-right: 0.5em;
        cursor: pointer;
        ${ReverseHoverStyle('&')}
      }

      & > p {
        font-size: 0.75rem;
        font-weight: 500;
        opacity: 40%;
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
