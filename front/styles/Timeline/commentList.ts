import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle, ShadowStyle } from 'styles/Common/shadow';
import media from 'styles/media';

export const CommentListWrapper = styled(motion.article)<{ $isCommentListVisible: boolean }>`
  position: absolute;
  top: 3.9%;
  left: 3.9%;
  display: flex;
  flex-direction: column;
  width: 88%;
  height: 96%;
  background-color: white;
  border-radius: 5px;
  z-index: 200;
  ${ShadowStyle}

  ${media.tablet} {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    transition: bottom 0.15s ease;
  }
`;

export const CommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  border-bottom: 1.5px solid #e4e5ec;
  padding: 0.5em;

  & > span {
    ${HoverStyle('&')};
  }

  & > div {
    display: none;
  }

  ${media.tablet} {
    justify-content: center;
    padding: 1em;

    & > span {
      display: none;
    }

    & > div {
      display: block;
      width: 15%;
      height: 8px;
      background-color: ${({ theme }) => theme.colors.darkBg};
      border-radius: 10px;
    }
  }

  ${media.mobile} {
    & > div {
      width: 30%;
      height: 6px;
    }
  }
`;

export const CommentsLoading = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  height: 95%;

  & > span {
    font-size: 2rem;
    color: #6ba2e6;
  }

  ${media.tablet} {
    height: 94%;
  }
`;

export const NoCommentsContainer = styled.div`
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

export const CommentListItemWrapper = styled.div`
  flex-grow: 1;
  height: 1px;
  padding: 0 1em;
  overflow-y: auto;

  & > div {
    border-bottom: 1px solid #eeeff3;
    padding-top: 1em;
  }
`;

export const DeleteCommentText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1em;
  opacity: 40%;
`;

export const CommentContainer = styled.div<{ $reply: boolean }>`
  padding-left: ${props => (props.$reply ? '2em' : '0')};
  margin-bottom: 1em;

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
    margin-left: 0.5em;
  }

  & > button {
    font-size: 0.75rem;
    opacity: 40%;
    margin-left: 0.5em;
  }
`;

export const CommentListItemImage = styled.div`
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

export const CommentFormWrapper = styled.div`
  position: relative;
`;

export const CommentExtrasWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1.5px solid ${({ theme }) => theme.colors.darkBg};
`;

export const CommentFormImage = styled(motion.div)`
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

export const CommentFormReply = styled(motion.div)`
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

export const CommentFormInput = styled.form<{ $active: boolean }>`
  position: relative;
  height: 100%;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.5em;

  & > div:first-child {
    width: 90%;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      width: 8%;
      font-size: 1rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > input:nth-child(2) {
      display: none;
    }

    & > textarea {
      width: 87%;
      min-height: 34px;
      max-height: 700px;
      font-size: 0.8rem;
      padding: 0.8em 0.5em;
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
    width: 10%;
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
      width: 96%;

      & > span {
        font-size: 1.4rem;
        width: 4.5%;
      }
    }

    & > button {
      width: 4%;

      & > span {
        font-size: 1rem;
      }
    }
  }

  ${media.mobile} {
    & > div:first-child {
      width: 92%;

      & > span {
        font-size: 1.2rem;
        width: 8%;
      }

      & > textarea {
        width: 84%;
      }
    }

    & > button {
      width: 8%;
    }
  }
`;

export const CommentEmojiPicker = styled.div`
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
    left: -25%;
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
      left: -6%;
      bottom: -15%;
    }
  }
`;
