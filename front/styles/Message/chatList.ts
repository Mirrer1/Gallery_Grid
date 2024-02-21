import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const ChatListWrapper = styled.article`
  width: 40%;
  height: 100%;
  padding: 1.5em;
`;

export const ChatListHeader = styled.header`
  ${({ theme }) => theme.flexSet('space-between')}
  height: 5%;
  margin-bottom: 0.7em;
  padding-bottom: 0.7em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > div > label > span {
    font-size: 1.1rem;
    opacity: 40%;
  }

  & > div > input {
    font-size: 0.9rem;
    padding: 0.5em;
    border: none;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.bg};

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-size: 0.9rem;
      opacity: 60%;
    }
  }

  & > span {
    ${ReverseHoverStyle('&')}
    font-size: 1.1rem;
    opacity: 40%;
  }
`;

export const ChatListItemWrapper = styled.div`
  height: 95%;
  overflow-y: scroll;
  padding: 0 0.5em;
`;

export const ChatListItem = styled.div`
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 5px;
  padding: 1em 0.7em;
  margin-bottom: 0.5em;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
  transition: transform 200ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(1);
  }

  & > div:first-child {
    width: 80%;
    ${({ theme }) => theme.flexSet('start')}

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1em;
    }

    & > div {
      width: 80%;
    }

    & > div > h1 {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.5em;
    }

    & > div > p {
      font-size: 0.75rem;
      opacity: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  & > div:last-child {
    width: 20%;
    ${({ theme }) => theme.flexColumnSet()}

    & > p {
      font-size: 0.65rem;
      opacity: 70%;
      margin-bottom: 0.7em;
    }

    & > div {
      ${({ theme }) => theme.flexSet()}
      width: 15px;
      height: 15px;
      font-size: 0.7rem;
      font-weight: 700;
      color: white;
      background-color: #df6464;
      border-radius: 50%;
    }
  }
`;
