import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostContainer = styled.div`
  height: 75%;
  overflow-y: scroll;
`;

export const PostCategory = styled.div`
  position: sticky;
  top: 0;
  ${({ theme }) => theme.flexSet('end')}
  padding: 1em 1em 0 0;
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

export const PostContents = styled.div`
  width: 100%;

  ${({ theme }) => theme.flexSet('space-between', 'start')}

  & >  img {
    width: 50%;
    height: 200px;
    margin-right: 1em;
  }

  & > div {
    width: 45%;
    height: 200px;
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
  }

  & > div > p {
    font-size: 0.8rem;
    opacity: 60%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
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
