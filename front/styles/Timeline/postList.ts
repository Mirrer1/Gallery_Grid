import styled from 'styled-components';

import media from 'styles/media';
import { DarkShadowStyle } from 'styles/Common/shadow';
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
  z-index: 9;
  background-color: white;
`;

export const CategoryItem = styled.p<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')};
  font-weight: 500;
  font-size: 0.7rem;
  cursor: pointer;
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }
`;

export const PostWrapper = styled.article<{ $firstpost: boolean }>`
  background-color: white;
  padding: ${props => (props.$firstpost ? '0 2.5em 2.5em 2.5em' : '2.5em')};

  ${media.tablet} {
    padding: ${props => (props.$firstpost ? '0 1.5em 1.5em 1.5em' : '1.5em')};
  }
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

export const PostFollowBtn = styled.button`
  ${HoverStyle('&')}
  font-size: 0.6rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  padding: 0.7em 1.5em;
  border-radius: 5px;
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
  width: 145px;
  text-align: center;
  border-radius: 6px;
  padding: 7px 0;
  margin-left: -60px;
  transition: opacity 0.3s;
  z-index: 10;
  background-color: #fff;
  ${DarkShadowStyle}

  & > button {
    ${HoverStyle('&')}
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.7em 1em;
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

  & > button > span {
    margin-right: 0.5em;
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
    width: 100%;
    height: fit-content;
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
    padding: 1em 0;
  }

  & > div > p {
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
    margin-bottom: 1em;
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
