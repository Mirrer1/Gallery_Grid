import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const CommentListWrapper = styled.article`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  ${ShadowStyle}
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
