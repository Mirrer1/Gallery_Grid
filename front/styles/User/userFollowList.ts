import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';

export const UserFollowListWrapper = styled(motion.section)`
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  padding: 0.7em 1.5em 0.7em 0em;
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
`;

export const UserFollowListItemWrapper = styled.div``;

export const UserFollowListItem = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  margin-bottom: 0.8em;

  &:last-child {
    margin-bottom: 0;
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
        margin-bottom: 0.5em;
      }

      & > div {
        ${({ theme }) => theme.flexSet('start')};
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 0.8em;

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
`;
