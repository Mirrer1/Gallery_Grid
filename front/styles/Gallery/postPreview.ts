import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';

export const PostPreviewWrapper = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  & > article {
    width: 100%;
    position: relative;

    &:hover {
      & > div:first-child > img {
        filter: blur(5px);
      }

      & > div:first-child > span {
        opacity: 100%;
        ${HoverStyle('&')};
      }

      & > div:last-child {
        opacity: 100%;
      }
    }
  }
`;

export const PostPreviewImage = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 250px;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: filter 150ms ease-in-out;
  }

  & > div {
    width: 100%;
    ${({ theme }) => theme.flexSet('end')};
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
    transition: opacity 200ms ease-in-out;
  }
`;

export const PostPreviewContent = styled.div`
  position: absolute;
  bottom: 12%;
  left: 6%;
  opacity: 0%;
  width: fit-content;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;

  & > h1 {
    width: 95%;
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
  }

  & > p {
    font-size: 0.6rem;
    text-decoration: underline;
    opacity: 70%;
    margin-bottom: 1.5em;
  }
`;

export const PostPreviewOption = styled.div`
  ${({ theme }) => theme.flexSet('start')}

  & > div {
    opacity: 60%;
    font-size: 0.6rem;
  }

  & > div:first-child {
    margin-right: 0.5em;
  }

  & > div > span > svg {
    margin-right: 0.2em;
  }
`;
