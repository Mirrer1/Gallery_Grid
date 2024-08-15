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
    opacity: 100%;
    ${props => (props.$alignleft === 'true' ? 'transform: translate(10%, -10%);' : 'transform: translate(-20%, -10%);')}
  }

  ${media.mobile} {
    ${props => (props.$alignleft === 'true' ? 'transform: translate(10%, 25%);' : 'transform: translate(-20%, 25%);')}

    & > span {
      position: relative;
      right: ${props => (props.$alignleft === 'true' ? '1px' : '-1px')};
    }
  }
`;

export const PopularUserWrapper = styled.div<{ $commentvisible: boolean }>`
  visibility: ${props => (props.$commentvisible ? 'hidden' : 'visible')};
  opacity: ${props => (props.$commentvisible ? '0' : '1')};
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px;
  margin-bottom: 1em;
  overflow: hidden;
  height: 60%;
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
      width: 100%;
      height: 98%;
      position: relative;

      & > img {
        width: 100%;
        height: 60%;
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

    & > div > div {
      display: flex;
      height: 100%;

      & > img {
        width: 35%;
        height: 100%;
      }
    }
  }

  ${media.mobile} {
    & > div > div > img {
      width: 45%;
    }
  }
`;

export const PopularUserContents = styled.div`
  ${({ theme }) => theme.flexColumnSet('space-between', 'start')}
  height: 40%;
  background-color: white;
  border-radius: 0 0 5px 5px;
  padding: 1em;

  & > div:first-child > div {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.7rem;
    font-weight: 500;
    margin-bottom: 0.7em;
  }

  & > div > h1 {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1em;

    @media (min-width: 992px) {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 1.5px;
      }
    }
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
    margin-bottom: 1em;
  }

  ${media.tablet} {
    width: 65%;
    height: 100%;

    & > div > p {
      -webkit-line-clamp: 5;
    }
  }

  ${media.mobile} {
    width: 55%;

    & > div:first-child > div {
      font-size: 0.6rem;
      font-weight: 500;
      margin-bottom: 0.7em;
    }

    & > div > h1 {
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 1em;
    }

    & > div > p {
      -webkit-line-clamp: 3;
      font-size: 0.7rem;
      margin-bottom: 1em;
    }
  }
`;

export const PopularOptions = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    opacity: 60%;
    font-size: 0.7rem;
  }

  & > div:first-child {
    margin-right: 1em;
  }

  & > div > span > svg {
    margin-right: 0.4em;
  }

  ${media.mobile} {
    & > div {
      font-size: 0.6rem;
    }

    & > div:first-child {
      margin-right: 0.7em;
    }

    & > div > span > svg {
      margin-right: 0.3em;
    }
  }
`;
