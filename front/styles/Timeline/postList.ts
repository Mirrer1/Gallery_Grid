import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ShadowStyle } from 'styles/Common/shadow';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostContainer = styled.div<{ $uploading: boolean }>`
  height: ${props => (props.$uploading ? '60%' : '69%')};
  overflow-y: scroll;
  background-color: white;

  ${media.tablet} {
    overflow-y: visible;
    border-radius: 0 0 5px 5px;
  }
`;

export const PostCategory = styled.div`
  position: sticky;
  top: 0;
  ${({ theme }) => theme.flexSet('end')}
  z-index: 9;
  background-color: white;
  border-bottom: 1px solid #eeeff3;

  ${media.mobile} {
    justify-content: center;
    margin: 0 0.5em;
  }
`;

export const CategoryItem = styled.button<{ $selected: boolean }>`
  position: relative;
  top: 1px;
  ${({ theme }) => theme.flexColumnSet()};
  ${ReverseHoverStyle('&')};
  cursor: pointer;

  & > p {
    font-weight: 500;
    font-size: 0.75rem;
    opacity: ${props => (props.$selected ? '100%' : '40%')};
    margin: 10px 0;
  }

  & > div {
    visibility: ${props => (props.$selected ? 'visible' : 'hidden')};
    width: 80px;
    height: 2px;
    background-color: black;
  }

  ${media.mobile} {
    flex: 1;

    & > p {
      font-size: 0.8rem;
      margin: 12px 0;
    }

    & > div {
      width: 100%;
    }
  }
`;

export const PostWrapper = styled(motion.article)`
  background-color: white;
  padding: 1em 1.5em;

  ${media.tablet} {
    padding: 1em 2em;
    border-radius: 0 0 5px 5px;
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

    & > div > a {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.4em;
      cursor: pointer;
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

      & > div > a {
        font-size: 0.8rem;
      }
    }
  }
`;

export const PostFollowBtn = styled.button<{ $isFollowing: boolean }>`
  ${HoverStyle('&')}
  font-size: 0.7rem;
  background-color: ${props => (props.$isFollowing ? 'white' : '#6BA2E6')};
  color: ${props => (props.$isFollowing ? '#6BA2E6' : 'white')};
  border: ${props => props.$isFollowing && '1px solid #6BA2E6'};
  font-weight: 500;
  border-radius: 5px;
  margin-right: 0.5em;
  line-height: 2.4;
  width: 67px;

  ${media.mobile} {
    font-size: 0.6rem;
    width: 58px;
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
      ${ShadowStyle};
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

export const PostOptions = styled.div<{ $liked: boolean; $commentVisiblePostId: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  padding: 0 0.3em;

  & > div {
    font-size: 0.85rem;
    ${HoverStyle('&')}
    cursor: pointer;
  }

  & > div:first-child {
    color: ${props => (props.$liked ? '#EE6B6E' : 'black')};
    margin-right: 0.7em;
  }

  & > div:last-child {
    color: ${props => (props.$commentVisiblePostId ? '#6BA2E6' : 'black')};
  }

  & > div > span > svg {
    margin-right: 0.3em;
  }
`;

export const NoFollowingPostsContainer = styled.div`
  ${({ theme }) => theme.flexColumnSet()}
  height: 85%;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.25em;
  }

  & > h1 {
    color: ${({ theme }) => theme.colors.font};
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.2em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
  }

  ${media.tablet} {
    height: 500px;
  }
`;
