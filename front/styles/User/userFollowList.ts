import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import media from 'styles/media';

export const UserFollowListWrapper = styled.section`
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  padding: 0 1em 0.7em 0;

  ${media.tablet} {
    width: 100%;
    padding: 0;
    overflow-y: visible;
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

export const UserFollowListItemWrapper = styled.div``;

export const UserFollowListItem = styled(motion.div)<{ $isFollowing: boolean }>`
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
    flex: 1;
    margin-right: 1.5em;

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.7em;
      cursor: pointer;
    }

    & > div {
      flex: 1;

      & > a {
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
      }

      & > p {
        font-size: 0.8rem;
        opacity: 60%;
        margin: 0.3em 0 0.8em 0;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
      }

      & > div {
        ${({ theme }) => theme.flexSet('start')};
        flex-wrap: wrap;
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

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()};

    & > div:first-child {
      width: 100%;
      margin-right: 0;
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

export const UserSearchLoading = styled.div<{ $isGridDisabled?: boolean }>`
  ${({ theme }) => theme.flexSet()};
  height: ${props => (props.$isGridDisabled ? '100%' : '85%')};

  & > span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.tablet} {
    height: 100vh;
    align-items: start;
    padding-top: 20%;
  }
`;

export const NoSearchTextContainer = styled.div<{ $isGridDisabled?: boolean }>`
  ${({ theme }) => theme.flexSet()};
  height: ${props => (props.$isGridDisabled ? '100%' : '85%')};

  & > p {
    text-align: center;
    color: #aaa;
  }

  ${media.tablet} {
    height: 40vh;
  }
`;
