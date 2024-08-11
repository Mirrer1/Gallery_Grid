import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const ModalCommentListContainer = styled(motion.div)`
  height: 80%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  ${media.tablet} {
    height: 78%;
  }

  ${media.mobile} {
    height: 73%;
  }
`;

export const ModalCommentListWrapper = styled.div<{ $uploading: boolean }>`
  height: ${props => (props.$uploading ? '67%' : '90%')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  padding: 0.8em 0.8em 0 0.8em;
  overflow-y: auto;

  ${media.mobile} {
    height: ${props => (props.$uploading ? '36%' : '85%')};
  }
`;

export const ModalCommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  height: 3%;

  & > span {
    ${HoverStyle('&')};
  }
`;

export const ModalCommentListItemWrapper = styled.div`
  height: 97%;
  padding: 0 0.5em;

  & > div {
    border-bottom: 1px solid #eeeff3;
    padding: 1em 0;
  }

  & > div:last-child {
    border-bottom: none;
  }
`;

export const ModalCommentListItem = styled.div<{ $reply: boolean }>`
  padding-left: ${props => (props.$reply ? '2em' : '0')};
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }

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
        & > h1 {
          color: ${({ theme }) => theme.colors.primary};
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.3em;
          cursor: pointer;

          @media (min-width: 992px) {
            &:hover {
              text-decoration: underline;
              text-underline-offset: 1.5px;
            }
          }
        }

        & > p {
          font-size: 0.7rem;
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

  ${media.tablet} {
    & > div {
      & > div:first-child {
        & > img {
          width: 38px;
          height: 38px;
        }

        & > div {
          & > h1 {
            font-size: 0.8rem;
          }

          & > p {
            font-size: 0.65rem;
          }
        }
      }
    }

    & > p {
      font-size: 0.7rem;
    }
  }
`;

export const ModalCommentForm = styled.form<{ $active: boolean }>`
  position: relative;
  ${({ theme }) => theme.flexSet('space-between')}
  height: 10%;
  background-color: white;
  padding: 0.7em;

  & > div:first-child {
    width: 95%;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      width: 6%;
      font-size: 1rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > input:nth-child(2) {
      display: none;
    }

    & > input {
      width: 88%;
      font-size: 0.8rem;
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

  & > button {
    width: 5%;
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
      width: 89%;

      & > span {
        font-size: 0.9rem;
        width: 8%;
      }

      & > input {
        width: 88%;
      }
    }
  }

  ${media.mobile} {
    height: 15%;
  }
`;

export const ModalCommentInputImageWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
  border-top: 1.5px solid #e4e5ec;
`;

export const ModalCommentInputImage = styled(motion.div)`
  width: fit-content;
  position: relative;
  padding: 0.5em;
  height: 120px;

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
    position: absolute;
    left: -25%;
    bottom: 85%;
    z-index: 50;
  }

  ${media.tablet} {
    & > div:last-child {
      left: -40%;
    }
  }

  ${media.mobile} {
    & > div:last-child {
      left: -6%;
      bottom: 100%;
    }
  }
`;
