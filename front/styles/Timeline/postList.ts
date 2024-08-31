import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostContainer = styled.div<{ $uploading: boolean }>`
  height: ${props => (props.$uploading ? '60%' : '69%')};
  overflow-y: scroll;
  background-color: white;

  ${media.tablet} {
    overflow-y: visible;
  }
`;

export const PostCategory = styled.div`
  position: sticky;
  top: 0;
  ${({ theme }) => theme.flexSet('end')}
  padding: 0.7em 1em;
  z-index: 9;
  background-color: white;
`;

export const CategoryItem = styled.p<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')};
  font-weight: 500;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }

  ${media.mobile} {
    font-size: 0.65rem;
    margin-right: 0.8em;
  }
`;

export const PostWrapper = styled(motion.article)`
  background-color: white;
  padding: 1em 1.5em;

  ${media.tablet} {
    padding: 1em 2em;
  }

  ${media.mobile} {
    padding: 0.8em;
  }
`;

export const PostHeader = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between')}
  margin-bottom: 1em;

  & > div {
    ${({ theme }) => theme.flexSet()}

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1em;
      cursor: pointer;
    }

    & > div > h1 {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.4em;
      cursor: pointer;

      @media (min-width: 992px) {
        &:hover {
          text-decoration: underline;
          text-underline-offset: 1.5px;
        }
      }
    }

    & > div > p {
      font-size: 0.65rem;
      opacity: 40%;
    }
  }

  ${media.mobile} {
    & > div {
      & > img {
        margin-right: 0.5em;
      }

      & > div > h1 {
        font-size: 0.8rem;
      }
    }
  }
`;

export const PostFollowBtn = styled.button`
  ${HoverStyle('&')}
  font-size: 0.7rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  padding: 0.7em 1.5em;
  border-radius: 5px;
  margin-right: 0.5em;

  ${media.mobile} {
    font-size: 0.6rem;
  }
`;

export const PostContents = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexColumnSet()};

  & > div:first-child {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 350px;

    @media (min-width: 992px) {
      &:hover {
        & > span {
          opacity: 100%;
        }
      }
    }

    & > img {
      width: 100%;
      height: 100%;
      margin-right: 1em;
      border-radius: 5px;
    }

    & > div {
      ${({ theme }) => theme.flexSet()};
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    & > div > div {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 4px;
      background-color: #b5b5b5;

      &:first-child {
        background-color: ${({ theme }) => theme.colors.primary};
      }

      &:last-child {
        margin-right: 0;
      }
    }

    & > span {
      opacity: 0;
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 1.2rem;
      transition: opacity 200ms ease-in-out;
      ${HoverStyle('&')}
    }
  }

  & > div:last-child {
    width: 100%;
    height: fit-content;
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
    padding: 1em 0;
  }

  & > div > p {
    color: ${({ theme }) => theme.colors.font};
    font-size: 0.8rem;
    line-height: 1.5;
    margin-bottom: 1em;
    padding: 0 0.3em;
  }

  ${media.tablet} {
    & > div:first-child {
      & > span {
        opacity: 100%;
        font-size: 1rem;
      }
    }
  }
`;

export const PostOptions = styled.div<{ $commentVisiblePostId: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  padding: 0 0.3em;

  & > div {
    font-size: 0.85rem;
    ${HoverStyle('&')}
    cursor: pointer;
  }

  & > div:first-child {
    margin-right: 1em;
  }

  & > div:last-child {
    color: ${props => (props.$commentVisiblePostId ? '#6BA2E6' : 'black')};
  }

  & > div > span > svg {
    margin-right: 0.3em;
  }

  ${media.mobile} {
    & > div:first-child {
      margin-right: 0.7em;
    }
  }
`;
