import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const ModalCommentListWrapper = styled.div`
  height: 73%;
  padding: 0.8em;
  border-bottom: 1px solid #e4e5ec;
  overflow-y: scroll;

  ${media.tablet} {
    height: 66%;
    padding: 0.6em;
  }

  ${media.mobile} {
    height: 61%;
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

  & > div {
    margin-bottom: 1em;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

export const ModalCommentListItem = styled.div<{ $reply: boolean }>`
  padding-left: ${props => (props.$reply ? '2em' : '0')};

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
