import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const PostContainer = styled.div`
  height: 75%;
  overflow-y: scroll;
`;

export const PostCategory = styled.div`
  position: sticky;
  top: 0;
  ${({ theme }) => theme.flexSet('end')}
  padding: 0.5em 1em 0.5em 0;
  z-index: 10;
  background-color: white;
`;

export const CategoryItem = styled.p<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')};
  font-weight: 500;
  font-size: 0.7rem;
  opacity: ${props => (props.$selected ? '100%' : '40%')};

  &:first-child {
    margin-right: 1em;
  }
`;

export const PostWrapper = styled.article`
  background-color: white;
  padding: 1em;
`;

export const PostHeader = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between')}
  margin-bottom: 1em;

  & > div {
    ${({ theme }) => theme.flexSet()}
  }

  & > div > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > div > div > h1 {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.3em;
  }

  & > div > div > p {
    font-size: 0.6rem;
    opacity: 40%;
  }

  & > span {
    ${HoverStyle('&')}
  }
`;

export const PostTooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const PostTooltipBtn = styled.span<{ $visible: boolean }>`
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.$visible ? '1' : '0')};
  position: absolute;
  top: -80%;
  right: 140%;
  width: 135px;
  text-align: center;
  border-radius: 6px;
  padding: 7px 0;
  margin-left: -60px;
  transition: opacity 0.3s;
  z-index: 10;
  ${ShadowStyle}

  & > button {
    ${HoverStyle('&')}
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.7em 1.5em;
  }

  & > button:first-child {
    margin-right: 0.3em;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px ${({ theme }) => theme.colors.primary} solid;
  }

  & > button:last-child {
    color: ${({ theme }) => theme.colors.red};
    border: 1px ${({ theme }) => theme.colors.red} solid;
  }
`;

export const PostContents = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between', 'start')}

  & > div:first-child {
    position: relative;
    cursor: pointer;
    width: 50%;
    height: 200px;
  }

  & > div:first-child > img {
    width: 100%;
    height: 100%;
    margin-right: 1em;
    border-radius: 5px;
  }

  & > div:first-child > div {
    ${({ theme }) => theme.flexSet()};
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  & > div:first-child > div > div {
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

  & > div:last-child {
    width: 45%;
    height: 200px;
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
  }

  & > div > p {
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
  }
`;

export const PostOptions = styled.div`
  ${({ theme }) => theme.flexSet('start')}

  & > div {
    opacity: 60%;
    font-size: 0.7rem;
    ${ReverseHoverStyle('&')}
  }

  & > div:first-child {
    margin-right: 1em;
  }

  & > div > span > svg {
    margin-right: 0.4em;
  }
`;
