import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import media from 'styles/media';

export const UserFollowListWrapper = styled.section`
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
  ${({ theme }) => theme.flexSet('normal')}
  background-color: ${({ theme }) => theme.colors.lightBg};
  border: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 10px;
  padding: 0.2em 1em;
  margin-bottom: 1em;

  & > label > span {
    opacity: 40%;
    cursor: pointer;
  }

  & > input {
    flex-grow: 1;
    font-size: 0.9rem;
    padding: 0.5em 0 0.5em 0.5em;
    border: none;
    background-color: ${({ theme }) => theme.colors.lightBg};

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  & > span {
    opacity: 60%;
    cursor: pointer;
  }

  ${media.mobile} {
    & > label > span {
      font-size: 0.8rem;
    }

    & > input {
      font-size: 0.8rem;
    }
  }
`;

export const UserFollowListItemWrapper = styled(motion.div)``;

export const UserFollowListItem = styled.div<{ $isFollowing: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  margin-bottom: 0.8em;
  padding: 0.3em 0;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  & > div:first-child {
    ${({ theme }) => theme.flexSet('start')};
    flex-grow: 1;

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.7em;
      cursor: pointer;
    }

    & > div {
      flex-grow: 1;

      & > h1 {
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 0.3em;
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
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 0.2em;
          cursor: pointer;
        }

        & > p {
          margin-right: 0.5em;
        }
      }
    }
  }

  & > div:last-child {
    & > button {
      width: 80px;
      height: 30px;
      font-size: 0.7rem;
      font-weight: 500;
      border-radius: 5px;
      background-color: ${props => (props.$isFollowing ? 'white' : '#6BA2E6')};
      color: ${props => (props.$isFollowing ? '#6BA2E6' : 'white')};
      border: ${props => props.$isFollowing && '1px solid #6BA2E6'};
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    & > div:first-child {
      & > div {
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
        width: 100%;
      }
    }
  }
`;

export const UserSearchLoading = styled.div`
  ${({ theme }) => theme.flexSet()};
  height: 85%;

  & > span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.tablet} {
    height: 100vh;
  }
`;

export const NoSearchTextContainer = styled.div`
  ${({ theme }) => theme.flexSet()};
  height: 85%;

  & > p {
    text-align: center;
    color: #aaa;
  }

  ${media.tablet} {
    height: 40vh;
  }
`;
