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
  z-index: 50;
  ${ShadowStyle}

  ${media.tablet} {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65%;
    border-radius: 5px 5px 0 0;
  }
`;

export const CommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  height: 5%;
  border-bottom: 1.5px solid #e4e5ec;
  padding: 0 0.5em;

  & > span {
    font-size: 0.9rem;
    ${HoverStyle('&')};
  }

  ${media.tablet} {
    height: 8%;
  }
`;

export const CommentListItemWrapper = styled.div`
  height: 95%;
  padding: 0.8em 1em;
  overflow-y: scroll;

  & > div {
    margin-bottom: 1em;
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  ${media.tablet} {
    height: 92%;
  }
`;

export const CommentListItem = styled.div`
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
