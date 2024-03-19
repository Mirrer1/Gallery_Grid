import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';
import media from 'styles/media';

export const BigPostPreviewWrapper = styled(motion.section)`
  width: 100%;
  position: relative;
  margin-bottom: 1em;
  cursor: pointer;
  ${ShadowStyle};

  &:hover {
    & > div:first-child > span {
      opacity: 100%;
      ${HoverStyle('&')}
    }
  }
`;

export const BigPostPreviewImage = styled.div`
  position: relative;
  width: 100%;
  height: 350px;

  & > img {
    width: 60%;
    height: 100%;
    border-radius: 5px;
  }

  & > div {
    ${({ theme }) => theme.flexSet()};
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  & > div > div {
    width: 7px;
    height: 7px;
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
    top: 0;
    right: 0;
    font-size: 1.4rem;
    transition: opacity 200ms ease-in-out;
  }

  ${media.tablet} {
    & > img {
      width: 75%;
    }
  }

  ${media.mobile} {
    height: 250px;

    & > span {
      font-size: 1.1rem;
      top: 5px;
    }
  }
`;

export const BigPostPreviewContent = styled.div`
  position: absolute;
  bottom: 12%;
  left: 54%;
  width: 32%;

  & > h1 {
    width: 95%;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin-bottom: 0.5em;
  }

  & > p {
    font-size: 0.7rem;
    text-decoration: underline;
    opacity: 70%;
    margin-bottom: 1.5em;
  }

  ${media.tablet} {
    left: 66%;

    & > h1 {
      font-size: 1.3rem;
    }

    & > p {
      font-size: 0.6rem;
    }
  }

  ${media.mobile} {
    width: 35%;
    left: 65%;

    & > h1 {
      font-size: 1rem;
      -webkit-line-clamp: 3;
    }

    & > p {
      font-size: 0.6rem;
    }
  }
`;

export const BigPostPreviewOption = styled.div`
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    opacity: 60%;
    font-size: 0.7rem;
  }

  & > div:first-child {
    margin-right: 0.5em;
  }

  & > div > span > svg {
    margin-right: 0.2em;
  }

  ${media.tablet} {
    & > div {
      font-size: 0.65rem;
    }
  }

  ${media.mobile} {
    & > div {
      font-size: 0.6rem;
    }
  }
`;
