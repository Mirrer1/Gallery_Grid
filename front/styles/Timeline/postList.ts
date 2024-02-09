import styled from 'styled-components';

import media from 'styles/media';
import { ShadowStyle } from 'styles/Common/shadow';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostContainer = styled.div`
  height: 80%;
  overflow-y: scroll;

  ${media.tablet} {
    overflow-y: visible;
  }
`;

export const PostCategory = styled.div`
  position: sticky;
  top: 0;
  ${({ theme }) => theme.flexSet('end')}
  padding: 0.7em 1em;
  z-index: 10;
  background-color: white;
`;

export const CategoryItem = styled.p<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')};
  font-weight: 500;
  font-size: 0.7rem;
  cursor: pointer;
  opacity: ${props => (props.$selected ? '100%' : '40%')};

  &:first-child {
    margin-right: 1em;
  }
`;

export const PostWrapper = styled.article<{ $firstpost: boolean }>`
  background-color: white;
  padding: ${props => (props.$firstpost ? '0 1em 1em 1em' : '1em')};
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
    cursor: pointer;
  }

  & > div > div > h1:hover {
    text-decoration: underline;
    text-underline-offset: 1.5px;
  }

  & > div > div > p {
    font-size: 0.6rem;
    opacity: 40%;
  }
`;

export const PostTooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & > span:first-child {
    ${HoverStyle('&')}
  }
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
    cursor: pointer;
  }

  & > div:first-child {
    margin-right: 1em;
  }

  & > div > span > svg {
    margin-right: 0.4em;
  }
`;
