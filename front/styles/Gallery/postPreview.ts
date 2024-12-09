import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const PostPreviewWrapper = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  & > article {
    width: 100%;
    position: relative;

    @media (min-width: 992px) {
      &:hover {
        & > div:first-child > img {
          filter: blur(5px);
        }

        & > div:first-child > span {
          opacity: 100%;
          ${HoverStyle('&')};
        }

        & > div:nth-child(2) {
          opacity: 100%;
        }

        & > div:nth-child(2) > div:first-child,
        & > div:nth-child(2) > div:first-child > div {
          opacity: 100%;
        }
      }
    }
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);

    & > article {
      & > div:first-child > span {
        opacity: 100%;
      }
    }
  }
`;

export const PostPreviewCheckbox = styled(motion.div)`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 20;

  & > input {
    opacity: 70%;
  }
`;

export const PostPreviewImage = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  aspect-ratio: 1/1;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: filter 200ms ease-in-out;
    ${ShadowStyle};
  }

  & > span {
    opacity: 0;
    position: absolute;
    top: 8px;
    right: 8px;
    transition: opacity 200ms ease-in-out;
    cursor: pointer;
  }

  & > div {
    position: absolute;
    bottom: 8px;
    right: 8px;
    ${({ theme }) => theme.flexSet('end')};
    width: 100%;

    & > div {
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
  }
`;

export const PostPreviewContent = styled.div<{ $selectMode: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.7em 1em;
  cursor: pointer;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-clip: padding-box;
  opacity: ${props => (props.$selectMode ? '100%' : '0%')};
  transition: opacity 200ms ease-in-out;

  & > div:first-child {
    & > h1 {
      width: 100%;
      font-size: 0.9rem;
      font-weight: 700;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      margin-bottom: 0.5em;
      white-space: pre-wrap;
    }

    & > p {
      font-size: 0.8rem;
      text-decoration: underline;
      opacity: 70%;
      margin-bottom: 1.5em;
    }
  }

  ${media.tablet} {
    padding: 0.5em 0.8em;
    opacity: 100%;

    & > div:first-child {
      & > h1 {
        font-size: 0.8rem;
        -webkit-line-clamp: 1;
        margin-bottom: 0.25em;
      }

      & > p {
        font-size: 0.7rem;
        margin-bottom: 0.8em;
      }
    }
  }

  ${media.mobile} {
    & > div:first-child {
      & > h1 {
        font-size: 0.75rem;
      }
    }
  }
`;

export const PostPreviewOption = styled.div<{ $liked: boolean; $hasCommented: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  margin-bottom: 1em;
  opacity: 0%;
  transition: opacity 200ms ease-in-out;

  & > div {
    font-size: 0.8rem;

    & > span > svg {
      margin-right: 0.2em;
    }
  }

  & > div:first-child {
    margin-right: 0.5em;
    color: ${props => (props.$liked ? '#EE6B6E' : 'black')};
  }

  & > div:last-child {
    color: ${props => (props.$hasCommented ? '#6BA2E6' : 'black')};
  }

  ${media.tablet} {
    opacity: 100%;
    margin-bottom: 0.5em;

    & > div {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    margin-bottom: 0.3em;

    & > div {
      font-size: 0.65rem;
    }
  }
`;
