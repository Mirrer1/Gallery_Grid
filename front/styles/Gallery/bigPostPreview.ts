import styled from 'styled-components';

import { HoverStyle } from 'styles/Common/hover';

export const BigPostPreviewWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const BigPostPreviewImage = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 350px;

  &:hover {
    & > span {
      opacity: 100%;
    }
  }

  & > img {
    width: 70%;
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
    right: 31%;
    font-size: 1.2rem;
    transition: opacity 200ms ease-in-out;
    ${HoverStyle('&')}
  }
`;

export const BigPostPreviewContent = styled.div`
  position: absolute;
  bottom: 12%;
  left: 62%;
  width: fit-content;

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
  }
`;
