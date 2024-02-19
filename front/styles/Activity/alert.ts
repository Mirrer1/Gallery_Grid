import styled from 'styled-components';

import { HoverStyle } from 'styles/Common/hover';

export const AlertWrapper = styled.section`
  height: 81%;
  overflow-y: scroll;
  background-color: white;
  border-radius: 5px;
`;

export const AlertDivider = styled.div`
  position: sticky;
  top: 0.01px;
  z-index: 20;
  background-color: white;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:before,
  &:after {
    flex: 1;
    content: '';
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    margin: 15px 10px;
  }
`;

export const AlertItemWrapper = styled.section`
  padding: 1em 1.5em;
`;

export const AlertHeader = styled.div`
  ${({ theme }) => theme.flexSet('start')}

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 0.5em;
  }

  & > p {
    font-weight: 500;
    font-size: 0.8rem;
    opacity: 40%;
    margin-right: 0.5em;
  }

  & > h1 {
    width: 80%;
    font-size: 0.9rem;
    padding-bottom: 0.2em;
    word-wrap: break-word;

    & > span:first-child {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
      ${HoverStyle('&')}
      cursor: pointer;
    }

    & > span:last-child {
      font-weight: 600;
    }
  }
`;

export const AlertContentWrapper = styled.div`
  margin: 0 1em 0 3.5em;
`;

export const AlertContent = styled.div`
  ${HoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')}
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 0.5em 1em;

  & > img {
    width: 12%;
    height: 100px;
    border-radius: 5px;
  }

  & > div {
    width: 88%;
    padding-left: 1em;
  }

  & > div > p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
    margin-bottom: 0.5em;
  }

  & > div > div {
    display: inline-block;
    cursor: pointer;
    opacity: 60%;
    font-size: 0.7rem;
    margin-right: 0.7em;
  }

  & > div > div > span {
    margin-right: 0.3em;
  }
`;

export const AlertContentBtn = styled.div`
  padding-left: 0.5em;

  & > button:first-child {
    ${HoverStyle('&')}
    font-size: 0.8rem;
    color: #6ba2e6;
    font-weight: 500;
    padding: 0.7em 2em;
    border: 1px solid #6ba2e6;
    border-radius: 5px;
    margin-right: 0.3em;
  }

  & > button:last-child {
    ${HoverStyle('&')}
    background-color: #6ba2e6;
    font-size: 0.8rem;
    color: white;
    font-weight: 500;
    padding: 0.8em 1.7em;
    border-radius: 5px;
  }
`;
