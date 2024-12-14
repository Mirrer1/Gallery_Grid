import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const ModalCommentListContainer = styled(motion.div)`
  flex-grow: 1;
  height: 1px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 200;
  }
`;

export const ModalCommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  padding: 0.5em;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkBg};

  & > span {
    ${HoverStyle('&')};
  }

  ${media.tablet} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
    padding: 1em;
  }
`;

export const ModalCommentsLoading = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;

  & > span {
    font-size: 2rem;
    color: #6ba2e6;
  }
`;

export const ModalNoCommentsContainer = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;
  height: 1px;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.25em;
  }

  & > h1 {
    color: ${({ theme }) => theme.colors.font};
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.2em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
  }
`;

export const ModalCommentListItemWrapper = styled.div`
  flex-grow: 1;
  height: 1px;
  padding: 0 0.5em;
  overflow-y: auto;

  & > div {
    border-bottom: 1px solid #eeeff3;
    padding-top: 0.5em;
  }
`;

export const ModalCommentContainer = styled(motion.div)<{ $reply: boolean; $isFocused: boolean }>`
  padding: 0.5em;
  margin-bottom: 0.5em;
  margin-left: ${props => (props.$reply ? '2em' : '0')};
  background-color: ${props => props.$isFocused && '#E6F7FF'};
  border-left: ${props => props.$isFocused && '3px solid #6BA2E6'};
  transition:
    background-color 0.3s ease,
    border-left 0.3s ease;

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};

    & > div:first-child {
      ${({ theme }) => theme.flexSet()};
      margin-bottom: 0.5em;

      & > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 0.4em;
        cursor: pointer;
      }

      & > div {
        & > div {
          ${({ theme }) => theme.flexSet('flex-start')};
          margin-bottom: 0.3em;

          & > a {
            font-size: 0.9rem;
            font-weight: 500;
            margin-right: 0.3em;
            cursor: pointer;
          }

          & > p {
            ${({ theme }) => theme.flexSet()};
            width: 38px;
            height: 18px;
            font-size: 0.6rem;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.primary};
            background-color: #d6e4f8;
            border-radius: 10px;
            line-height: 2;
          }
        }

        & > p {
          font-size: 0.65rem;
          opacity: 40%;
        }
      }
    }

    & > div:last-child {
      font-size: 0.7rem;

      & > button {
        opacity: 40%;
        ${ReverseHoverStyle('&')};
      }

      & > button:first-child {
        margin-right: 0.3em;
      }
    }
  }

  & > p {
    font-size: 0.75rem;
    line-height: 1.5;
    white-space: pre-wrap;
    margin-left: 0.5em;
  }

  & > button {
    font-size: 0.75rem;
    opacity: 40%;
    margin-left: 0.5em;
  }
`;

export const DeleteModalCommentText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 40%;
  padding: 0.5em;
  margin-bottom: 0.5em;
`;

export const ModalCommentListItemImage = styled.div`
  width: 140px;
  height: 140px;
  margin-bottom: 0.5em;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${DarkShadowStyle};
  }
`;

export const ModalCommentFormWrapper = styled.div`
  position: relative;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const ModalCommentExtrasWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1.5px solid ${({ theme }) => theme.colors.darkBg};
`;

export const ModalCommentFormReply = styled(motion.div)`
  ${({ theme }) => theme.flexSet('space-between')};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  padding: 0.5em;

  & > p {
    font-size: 0.75rem;
    opacity: 40%;
  }

  & > span {
    font-size: 0.9rem;
    opacity: 70%;
    margin-right: 0.5em;
    cursor: pointer;
    ${HoverStyle('&')};
  }
`;

export const ModalCommentFormItem = styled.form<{ $active: boolean }>`
  position: relative;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  padding: 0.5em;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkBg};

  & > div:first-child {
    flex-grow: 1;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      font-size: 1rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > span:first-child {
      margin-right: 0.5em;
    }

    & > input:nth-child(2) {
      display: none;
    }

    & > textarea {
      flex-grow: 1;
      min-height: 34px;
      max-height: 700px;
      font-size: 0.8rem;
      line-height: 1.5;
      padding: 0.8em 0.5em;
      margin-left: 0.2em;
      border: none;
      resize: none;
      overflow-y: auto;
      transition: height 0.2s ease-out;

      &:focus {
        outline: none;
      }

      &::placeholder {
        opacity: 60%;
      }
    }
  }

  & > button {
    ${({ theme }) => theme.flexSet('end')}

    & > span {
      font-size: 0.85rem;
      color: white;
      opacity: ${props => (props.$active ? '40%' : '100%')};
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: 0.5em;
      ${HoverStyle('&')};

      & > svg {
        position: relative;
        left: 1px;
      }
    }
  }

  ${media.tablet} {
    & > div:first-child {
      & > span {
        font-size: 1.4rem;
      }

      & > textarea {
        margin-left: 0.5em;
      }
    }

    & > button {
      & > span {
        font-size: 1rem;
      }
    }
  }

  ${media.mobile} {
    & > div:first-child {
      & > span {
        font-size: 1.2rem;
      }
    }
  }
`;

export const ModalCommentFormImage = styled(motion.div)`
  width: fit-content;
  position: relative;
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

export const ModalCommentEmojiPicker = styled.div`
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
    left: -5%;
    bottom: 0;
    z-index: 50;
  }

  ${media.tablet} {
    & > div:last-child {
      left: -2%;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      left: -5%;
    }
  }
`;
