import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const PopularFollowingWrapper = styled.div`
  ${({ theme }) => theme.flexColumnSet('center', 'start')}
  height: 38%;
  background-color: white;
  padding: 2em 1.5em;

  ${media.tablet} {
    width: 49%;
    height: 100%;
    padding: 1.5em 1em;
    border-radius: 5px;
  }
`;

export const PopularFollowingHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')}
  position: relative;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2em;

  & > p {
    position: absolute;
    font-size: 10px;
    bottom: 150%;
    right: -5%;
    width: 55px;
    opacity: 0;
    background-color: black;
    color: #ffffff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    z-index: 1;
    margin-left: -60px;
    transition: opacity 0.3s;
  }

  & > span {
    ${HoverStyle('&')}
    cursor: pointer;
  }

  & > p::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  & > span:hover + p {
    opacity: 1;
  }
`;

export const PopularFollowingInfo = styled.div<{ $islast: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  margin-bottom: ${props => (props.$islast ? '0' : '1.2em')};

  & > img {
    width: 14%;
    height: 50px;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > div {
    width: 86%;
  }

  & > div > h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.3em;
  }

  & > div > h2:hover {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 1.5px;
  }

  & > div > p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
  }

  ${media.tablet} {
    margin-bottom: ${props => (props.$islast ? '0' : '1.5em')};

    & > img {
      width: 20%;
      height: 50px;
      border-radius: 50%;
      margin-right: 1em;
    }

    & > div {
      width: 80%;
    }
  }
`;
