import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { InputShadowStyle } from 'styles/Common/shadow';

export const SearchContainer = styled(motion.section)`
  background-color: white;
  height: 97%;
  border-radius: 5px 5px 0 0;
  padding: 2% 2% 0 2%;
  margin: 2% 2% 0 2%;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    height: 100%;
    padding: 1em;
    margin: 0;
    border-radius: 5px;
  }

  ${media.mobile} {
    margin-bottom: 2.5%;
  }
`;

export const SearchBackButton = styled.div`
  margin-bottom: 1em;

  & > span {
    font-size: 1.3rem;
    opacity: 60%;
    ${HoverStyle('&')};
  }
`;

export const SearchHeader = styled.header`
  text-align: center;

  & > p:first-child {
    font-size: 3.5rem;
    letter-spacing: 2px;
    margin-bottom: 0.8em;

    & > span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  & > p:last-child {
    color: ${({ theme }) => theme.colors.lightFont};
    font-size: 0.85rem;
    margin-bottom: 1.5em;

    & > span {
      color: ${({ theme }) => theme.colors.font};
      font-weight: 700;
      opacity: 100%;
    }
  }

  ${media.tablet} {
    & > p:first-child {
      font-size: 3rem;
      margin-bottom: 0.6em;
    }

    & > p:last-child {
      font-size: 0.8rem;
      margin-bottom: 1.2em;
    }
  }
`;

export const SearchMain = styled.div`
  flex-grow: 1;
  ${({ theme }) => theme.flexColumnSet('normal', 'normal')};
  padding: 0 10%;

  ${media.tablet} {
    padding: 0 5%;
  }

  ${media.mobile} {
    padding: 0;
  }
`;

export const SearchInputWrapper = styled.div`
  ${({ theme }) => theme.flexSet('normal')};
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  ${InputShadowStyle};
  padding: 0.5em 1em;

  & > input {
    flex-grow: 1;
    font-size: 0.9rem;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  & > button {
    ${({ theme }) => theme.flexSet()};
    border-radius: 5px;
    ${HoverStyle('&')};
  }

  & > button:nth-child(2) {
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.bg};
    margin: 0 0.5em;

    & > span {
      font-size: 0.7rem;
      opacity: 40%;
    }
  }

  & > button:last-child {
    width: 90px;
    height: 30px;
    font-size: 0.9rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};

    & > span {
      margin-right: 0.3em;
    }
  }

  ${media.tablet} {
    padding: 0.5em;

    & > button:last-child {
      width: 80px;
      font-size: 0.8rem;
    }
  }
`;

export const SearchDivider = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.bg};
  margin: 2em 0;

  ${media.tablet} {
    margin: 1.5em 0;
  }
`;

export const ContentsWrapper = styled(motion.div)`
  height: 1px;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 1em;

  ${media.tablet} {
    height: 100vh;
    overflow-y: visible;
  }
`;

export const RecentSearchWrapper = styled.div``;

export const RecentSearchHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  font-weight: 700;
  margin-bottom: 1.5em;

  & > p {
    opacity: 80%;
  }

  & > button {
    font-size: 0.9rem;
    line-height: 2px;
    color: ${({ theme }) => theme.colors.lightFont};
    ${HoverStyle('&')};
  }

  ${media.tablet} {
    font-size: 0.9rem;

    & > button {
      font-size: 0.8rem;
      line-height: 1px;
    }
  }
`;

export const RecentSearchList = styled.ul`
  & > li {
    ${({ theme }) => theme.flexSet('space-between')};
    margin-bottom: 1em;

    & > div:first-child {
      ${({ theme }) => theme.flexSet()};
      ${HoverStyle('&')};

      & > span {
        ${({ theme }) => theme.flexSet()};
        width: 30px;
        height: 30px;
        color: ${({ theme }) => theme.colors.lightFont};
        background-color: ${({ theme }) => theme.colors.bg};
        border-radius: 5px;
        margin-right: 0.5em;
      }
    }

    & > div:last-child {
      ${({ theme }) => theme.flexSet()};
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.lightFont};

      & > p {
        margin-right: 0.5em;
      }

      & > span {
        ${HoverStyle('&')};
      }
    }
  }

  ${media.tablet} {
    & > li {
      & > div:first-child {
        font-size: 0.9rem;

        & > span {
          width: 25px;
          height: 25px;
          margin-right: 0.5em;
        }
      }

      & > div:last-child {
        font-size: 0.8rem;

        & > p {
          line-height: 1px;
          margin-right: 0.3em;
        }
      }
    }
  }
`;
