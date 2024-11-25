import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const UserSearchContainer = styled(motion.div)``;

export const UserSearchContent = styled.div`
  margin-bottom: 3em;

  ${media.tablet} {
    margin-bottom: 3em;
  }
`;

export const UserProfileWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')};
  margin-bottom: 0.5em;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 0.5em;
    cursor: pointer;
  }

  & > p {
    font-weight: 700;
    cursor: pointer;
  }
`;

export const UserBio = styled.div`
  ${({ theme }) => theme.flexSet('normal')};

  & > p {
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
  }

  & > div {
    ${({ theme }) => theme.flexSet()};
    width: 10%;

    & > span {
      font-size: 1.5rem;
      cursor: pointer;
      ${HoverStyle('&')};
    }
  }

  ${media.tablet} {
    & > div {
      width: 10%;

      & > span {
        font-size: 1.3rem;
      }
    }
  }
`;

export const UserSearchDivider = styled.hr`
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  margin: 1em 0;
`;

export const UserStatsWrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start')};
  flex-wrap: wrap;

  & > div:first-child {
    ${({ theme }) => theme.flexSet()};

    & > div {
      ${({ theme }) => theme.flexSet()};
      font-size: 0.8rem;
      opacity: 60%;
      margin-right: 0.5em;

      & > span {
        margin-right: 0.3em;
      }
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.flexSet()};
    margin-left: 0.3em;

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-right: 0.3em;
      cursor: pointer;
    }

    & > p {
      max-width: 10vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.9rem;
      font-weight: 700;
      margin-right: 0.3em;
    }

    & > time {
      font-size: 0.8rem;
      opacity: 60%;
    }
  }

  ${media.tablet} {
    flex-direction: column;
    align-items: start;

    & > div:first-child {
      margin-bottom: 1em;
    }

    & > div:last-child {
      width: 100%;
      justify-content: start;
      margin-left: 0;
      padding-left: 1em;

      & > p {
        flex-grow: 1;
        max-width: 30vw;
      }
    }
  }

  ${media.mobile} {
    & > div:last-child {
      padding-left: 0.5em;

      & > p {
        max-width: 40vw;
      }
    }
  }
`;

export const NoSearchUserContainer = styled.div`
  ${({ theme }) => theme.flexSet()};
  color: #aaa;
  height: 35vh;

  & > span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
  }

  ${media.tablet} {
    height: 100%;
    min-height: 500px;
  }

  ${media.mobile} {
    min-height: 450px;
  }
`;
