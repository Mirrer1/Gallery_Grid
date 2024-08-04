import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';
import media from 'styles/media';

export const CommentListWrapper = styled(motion.article)<{ $isCommentListVisible: boolean }>`
  position: absolute;
  top: 3.9%;
  left: 3.9%;
  width: 88%;
  height: 93%;
  background-color: white;
  border-radius: 5px;
  z-index: 45;
  ${ShadowStyle}

  ${media.tablet} {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    border-radius: 5px 5px 0 0;
  }
`;

export const CommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  height: 5%;
  border-bottom: 1.5px solid #e4e5ec;
  padding: 0 0.5em;

  & > span {
    ${HoverStyle('&')};
  }

  ${media.tablet} {
    height: 6%;
  }
`;

export const CommentListItemWrapper = styled.div`
  height: 88%;
  padding: 0 1em;
  overflow-y: scroll;

  & > div {
    border-bottom: 1px solid #eeeff3;
    padding: 1em 0;
  }

  ${media.tablet} {
    height: 87%;
  }
`;

export const CommentListItem = styled.div<{ $reply: boolean }>`
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
`;

export const CommentInput = styled.div<{ $active: boolean }>`
  height: 7%;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 0 0 5px 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.7em;

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

    & > input {
      width: 87%;
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

  & > div:last-child {
    width: 10%;
    ${({ theme }) => theme.flexSet('end')}

    & > span {
      font-size: 0.85rem;
      color: white;
      opacity: ${props => (props.$active ? '40%' : '100%')};
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: 0.4em 0.4em 0.4em 0.6em;
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    height: 7%;
    border-radius: 0 0 5px 5px;

    & > div:first-child {
      & > span {
        width: 5%;
      }

      & > input {
        width: 96%;
      }
    }
  }

  ${media.mobile} {
    & > div:first-child {
      & > span {
        width: 8%;
        font-size: 0.9rem;
      }

      & > input {
        width: 87%;
      }
    }
  }
`;
