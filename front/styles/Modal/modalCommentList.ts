import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const ModalCommentListWrapper = styled.div`
  height: 73%;
  padding: 0.5em 1em;
  border-bottom: 1px solid #e4e5ec;
  overflow-y: scroll;
`;

export const ModalCommentListHeader = styled.div`
  ${({ theme }) => theme.flexSet('end')};
  height: 3%;
  padding: 0 0.5em;

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
