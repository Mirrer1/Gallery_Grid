import styled from 'styled-components';

import media from 'styles/media';
import { ShadowStyle } from 'styles/Common/shadow';

export const PopularBtn = styled.div<{ $alignleft: string }>`
  opacity: 0;
  position: absolute;
  bottom: 50%;
  ${props => (props.$alignleft === 'true' ? 'left: 0;' : 'right: 0;')}
  ${props => (props.$alignleft === 'true' ? 'transform: translate(10%, -50%);' : 'transform: translate(-20%, -50%);')}  
  font-size: 0.7rem;
  padding: 0.5em;
  color: gray;
  background-color: white;
  border-radius: 50%;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 250ms ease-in-out;

  ${media.tablet} {
    display: none;
  }
`;

export const PopularUserWrapper = styled.div<{ $commentvisible: boolean }>`
  visibility: ${props => (props.$commentvisible ? 'hidden' : 'visible')};
  opacity: ${props => (props.$commentvisible ? '0' : '1')};
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px;
  overflow: hidden;
  height: 55%;
  margin-bottom: 1em;
  transition: opacity 0.3s;
  ${ShadowStyle}

  & > div {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    transition: transform 400ms ease-in-out;
    height: 100%;

    @media (min-width: 992px) {
      &:hover ${PopularBtn} {
        opacity: 100%;
      }
    }

    & > div {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 98%;

      & > img {
        width: 100%;
        height: 1px;
        flex-grow: 1;
        border-radius: 5px 5px 0 0;
      }
    }
  }

  ${media.tablet} {
    visibility: visible;
    opacity: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    overflow-x: scroll;

    & > div {
      & > div {
        position: relative;
        display: flex;
        width: 40%;
        height: 100%;
        margin-right: 0.5em;

        & > img {
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 5px;
        }
      }
    }
  }

  ${media.mobile} {
    & > div {
      & > div {
        width: 45%;
      }
    }
  }
`;

export const PopularUserContents = styled.div`
  ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
  height: 40%;
  background-color: white;
  border-radius: 0 0 5px 5px;
  padding: 4%;

  & > div:first-child > div {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.7rem;
    font-weight: 500;
    margin-bottom: 4px;
  }

  & > div > a {
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
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
    margin-top: 10px;
  }

  ${media.tablet} {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-clip: padding-box;

    & > div > a {
      color: white;
    }

    & > div > p {
      color: white;
      -webkit-line-clamp: 1;
      margin-top: 1%;
    }
  }

  ${media.mobile} {
    & > div:first-child > div {
      font-size: 0.6rem;
      margin-bottom: 0.7em;
    }

    & > div > a {
      font-size: 0.8rem;
    }

    & > div > p {
      font-size: 0.7rem;
    }
  }
`;

export const PopularOptions = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    font-size: 0.8rem;

    &:first-child {
      margin-right: 0.7em;
      opacity: 60%;
    }

    &:nth-child(2) {
      margin-right: 0.7em;
      color: ${({ theme }) => theme.colors.red};
    }

    &:last-child {
      color: ${({ theme }) => theme.colors.primary};
    }

    & > span > svg {
      margin-right: 0.2em;
    }
  }

  ${media.tablet} {
    opacity: 60%;

    & > div {
      font-size: 0.7rem;

      &:first-child {
        opacity: 100%;
        color: white;
      }
    }
  }
`;
