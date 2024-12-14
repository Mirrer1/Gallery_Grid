import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';
import { motion } from 'framer-motion';

export const GalleryWrapper = styled(motion.section)`
  background-color: white;
  height: 97%;
  border-radius: 5px 5px 0 0;
  padding: 2% 2% 0 2%;
  margin: 2% 2% 0 2%;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    & > h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1em;
    }
  }

  & > div:last-child {
    height: 1px;
    flex-grow: 1;
    overflow-y: auto;
    padding: 0 1em 0.7em 0em;
  }

  ${media.tablet} {
    height: 100%;
    padding: 1em;
    margin: 0;
    border-radius: 5px;

    & > div:first-child {
      & > h1 {
        font-size: 1.2rem;
        margin-bottom: 0.7em;
      }
    }

    & > div:last-child {
      min-height: 700px;
      height: 100%;
      padding: 0;
      overflow-y: visible;
    }
  }

  ${media.mobile} {
    margin-bottom: 2.5%;
    border-radius: 5px;

    & > div:last-child {
      min-height: 500px;
    }
  }
`;

export const GalleryCategoryWrapper = styled.nav`
  ${({ theme }) => theme.flexSet('start')};
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};
  margin-bottom: 0.5em;
`;

export const GalleryCategoryBtn = styled.button<{ $selected: boolean }>`
  position: relative;
  top: 2px;
  ${({ theme }) => theme.flexColumnSet()};
  ${ReverseHoverStyle('&')};
  cursor: pointer;

  & > p {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: ${props => (props.$selected ? '100%' : '40%')};
    color: ${props => (props.$selected ? '#6BA2E6' : '40%')};
    margin-bottom: 10px;
  }

  & > div {
    visibility: ${props => (props.$selected ? 'visible' : 'hidden')};
    width: 80px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${media.tablet} {
    & > p {
      font-size: 0.8rem;
    }

    & > div {
      width: 70px;
    }
  }
`;

export const GalleryActionBtnWrapper = styled(motion.div)``;

export const GalleryActionBtn = styled.div<{ $selectMode: boolean }>`
  ${({ theme }) => theme.flexSet('end')};
  margin-bottom: 0.5em;

  & > div > button {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.5em 1em;
    color: ${props => (props.$selectMode ? '#EE6B6E' : '#6BA2E6')};
    border: ${props => (props.$selectMode ? '1px solid #EE6B6E' : '1px solid #6BA2E6')};
    border-radius: 5px;
    margin-right: 0.5em;
    transition: opacity 200ms ease-in-out !important;

    &:hover {
      opacity: 40% !important;
    }

    &:active {
      opacity: 100% !important;
    }

    & > span {
      margin-right: 0.5em;
    }
  }

  ${media.tablet} {
    & > div > button {
      font-size: 0.6rem;

      &:hover {
        opacity: 100% !important;
      }

      &:active {
        opacity: 100% !important;
      }

      & > span {
        margin-right: 0.3em;
      }
    }
  }
`;

export const GalleryNoPostsContainer = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;
  height: 90%;

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
    height: 100vh;
  }
`;

export const GalleryLoadingContainer = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;
  height: 90%;

  & > span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
    margin-bottom: 0.25em;
  }

  ${media.tablet} {
    height: 90vh;
  }

  ${media.mobile} {
    height: 70vh;
  }
`;
