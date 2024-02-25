import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const ChatListWrapper = styled.article<{ $visible: boolean }>`
  ${({ theme }) => theme.flexColumnSet()};
  width: ${props => (props.$visible ? '35%' : '100%')};
  height: 100%;
  padding: 2em 0.75em 2em 1.5em;

  ${media.tablet} {
    display: ${props => (props.$visible ? 'none' : 'flex')};
    width: 100%;
    padding: 0.5em;
  }
`;

export const ChatListHeader = styled.header`
  ${({ theme }) => theme.flexSet('space-between')}
  width: 96%;
  height: 7.5%;
  margin-bottom: 0.7em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > div {
    flex-grow: 1;
    width: 90%;

    & > label > span {
      width: 3%;
      font-size: 1.1rem;
      opacity: 40%;
    }

    & > input {
      width: 94%;
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
    padding-right: 0.5em;
  }

  ${media.tablet} {
    padding-bottom: 0.5em;

    & > div {
      & > label > span {
        width: 4%;
      }

      & > input {
        width: 93%;
      }
    }
  }

  ${media.mobile} {
    width: 100%;
    padding-bottom: 0.3em;
    margin-bottom: 0.7em;

    & > div {
      & > input {
        font-size: 0.8rem;
        padding: 0.5em;

        &::placeholder {
          font-size: 0.8rem;
        }
      }
    }

    & > span {
      font-size: 1rem;
    }
  }
`;

export const ChatListItemWrapper = styled(motion.div)`
  width: 100%;
  height: 95%;
  overflow-y: scroll;
  padding: 0 1em;

  ${media.mobile} {
    padding: 0;
  }
`;

export const ChatListItem = styled.div`
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 5px;
  padding: 1em 0.3em 1em 0.7em;
  margin-bottom: 0.5em;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
  transition: transform 250ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(1);
  }

  & > div:first-child {
    width: 65%;
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

  ${media.tablet} {
    margin-bottom: 0.7em;

    & > div:first-child {
      width: 83%;
    }
  }

  ${media.mobile} {
    padding: 0.8em 0.3em 0.8em 0.7em;

    & > div:first-child {
      & > img {
        margin-right: 0.7em;
      }

      & > div > h1 {
        font-size: 0.8rem;
      }

      & > div > p {
        font-size: 0.7rem;
      }
    }
  }
`;
