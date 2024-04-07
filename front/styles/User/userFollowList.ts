import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import media from 'styles/media';

export const UserFollowListWrapper = styled(motion.section)`
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  padding: 0.7em 1.5em 0.7em 0em;

  ${media.tablet} {
    width: 100%;
    padding: 0.7em 0 0.2em 0;
  }
`;

export const UserSearchWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 10px;
  padding: 0.2em 1em;
  margin-bottom: 1em;

  & > label > span {
    font-size: 0.9rem;
    opacity: 40%;
  }

  & > input {
    flex-shrink: 1;
    font-size: 0.9rem;
    padding: 0.5em 0 0.5em 0.5em;
    border: none;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.lightBg};

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  ${media.tablet} {
    padding: 0 0.5em;

    & > label > span {
      font-size: 0.8rem;
    }

    & > input {
      font-size: 0.8rem;
    }
  }

  ${media.mobile} {
    & > label > span {
      font-size: 0.7rem;
    }

    & > input {
      font-size: 0.7rem;
    }
  }
`;

export const UserFollowListItemWrapper = styled.div``;

export const UserFollowListItem = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  margin-bottom: 0.8em;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  & > div:first-child {
    ${({ theme }) => theme.flexSet('start')};
    width: 85%;

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.7em;
    }

    & > div {
      width: 80%;

      & > h1 {
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 0.3em;

        @media (min-width: 992px) {
          &:hover {
            text-decoration: underline;
            text-underline-offset: 1.5px;
          }
        }
      }

      & > p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-size: 0.8rem;
        opacity: 60%;
        margin-bottom: 0.8em;
      }

      & > div {
        ${({ theme }) => theme.flexSet('start')};
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 1em;

        & > img {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-right: 0.2em;
        }

        & > p {
          margin-left: 0.5em;
        }
      }
    }
  }

  & > div:last-child {
    & > button {
      font-size: 0.7rem;
      background-color: #6ba2e6;
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    & > div:first-child {
      & > div {
        & > h1 {
          font-size: 0.9rem;
        }

        & > p {
          font-size: 0.7rem;
        }

        & > div {
          font-size: 0.7rem;
        }
      }
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()};

    & > div:first-child {
      width: 100%;

      & > div {
        & > p {
          -webkit-line-clamp: 2;
        }
      }
    }

    & > div:last-child {
      ${({ theme }) => theme.flexSet()};
      width: 100%;
      margin-bottom: 0.8em;

      & > button {
        width: 65%;
      }
    }
  }
`;
