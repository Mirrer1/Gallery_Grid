import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const ChatListWrapper = styled.article<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => (props.$visible ? '35%' : '100%')};

  ${media.tablet} {
    display: ${props => (props.$visible ? 'none' : 'flex')};
    width: 100%;
    height: 100%;
    padding: 0;
  }
`;

export const ChatListHeader = styled.header<{ $visible: boolean }>`
  width: ${props => (props.$visible ? '88%' : '95%')};
  ${({ theme }) => theme.flexSet('space-between')}
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > div {
    flex-grow: 1;
    display: flex;
    align-items: center;

    & > label > span {
      position: relative;
      top: 2px;
      font-size: 1.1rem;
      opacity: 40%;
      cursor: pointer;
    }

    & > input {
      flex-grow: 1;
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
  }

  & > span {
    ${ReverseHoverStyle('&')}
    font-size: 1.1rem;
    opacity: 40%;
  }

  ${media.tablet} {
    width: 98%;
    margin-bottom: 0.8em;

    & > div {
      & > label > span {
        top: 0;
      }
    }
  }
  ${media.mobile} {
    width: 97%;
    margin-bottom: 0.5em;
  }
`;

export const ChatListItemWrapper = styled(motion.div)`
  width: 100%;
  height: 1px;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0.5em 1em;

  & > div:last-child {
    margin-bottom: 0;
  }

  ${media.tablet} {
    padding: 0;
    height: 100%;
  }

  ${media.mobile} {
    margin-bottom: 2%;
  }
`;

export const ChatListItem = styled.div<{ $visible: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 5px;
  padding: 1em 0.3em 1em 0.7em;
  margin-bottom: 0.5em;
  transition: transform 250ms ease-in-out;
  ${ShadowStyle}

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1);
  }

  & > div:first-child {
    width: ${props => (props.$visible ? '75%' : '93%')};
    ${({ theme }) => theme.flexSet('start')}
    flex-shrink: 1;

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1em;
    }

    & > div {
      flex-shrink: 1;

      & > h1 {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5em;
      }

      & > p {
        font-size: 0.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        opacity: 60%;
        line-height: 1.5;
        width: 100%;
      }
    }
  }

  & > div:last-child {
    width: ${props => (props.$visible ? '25%' : '7%')};
    ${({ theme }) => theme.flexColumnSet()}

    & > p {
      font-size: 0.7rem;
      opacity: 70%;
      margin-bottom: 0.7em;
    }

    & > div {
      ${({ theme }) => theme.flexSet()}
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
      font-weight: 700;
      color: white;
      background-color: #df6464;
      border-radius: 50%;
    }
  }

  ${media.tablet} {
    margin-bottom: 0.7em;

    & > div:first-child {
      width: 85%;
    }

    & > div:last-child {
      width: 15%;
    }
  }

  ${media.mobile} {
    margin-bottom: 0.7em;

    & > div:first-child {
      width: 75%;
    }

    & > div:last-child {
      width: 25%;
    }
  }
`;
