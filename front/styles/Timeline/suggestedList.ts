import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const SuggestedWrapper = styled.div<{ $listvisible: boolean; $commentvisible: boolean }>`
  ${({ theme }) => theme.flexColumnSet('center', 'start')}
  visibility: ${props => (props.$commentvisible ? 'hidden' : 'visible')};
  opacity: ${props => (props.$commentvisible ? '0' : '1')};
  flex-grow: 1;
  background-color: white;
  padding: 6%;
  border-radius: 5px;
  transition: opacity 0.3s;
  ${ShadowStyle}

  ${media.tablet} {
    visibility: ${props => (props.$listvisible ? 'visible' : 'hidden')};
    opacity: ${props => (props.$listvisible ? '1' : '0')};
    position: fixed;
    bottom: 1.5%;
    right: 2%;
    width: 55%;
    height: auto;
    padding: 3%;
    border: 1px solid ${({ theme }) => theme.colors.darkBg};
    z-index: 50;
  }

  ${media.mobile} {
    bottom: 7.5%;
    right: 2%;
    width: 85%;
    padding: 5%;
  }
`;

export const SuggestedOutsideArea = styled.div<{ $listvisible: boolean }>`
  display: none;

  ${media.tablet} {
    display: ${props => (props.$listvisible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 49;
    cursor: pointer;
  }
`;

export const SuggestedHeader = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between')};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5%;

  & > div {
    ${({ theme }) => theme.flexSet()};
  }

  & > div > span {
    position: relative;
    top: 3px;
    font-size: 1rem;
    ${HoverStyle('&')};
  }

  & > div > span:last-child {
    display: none;
  }

  ${media.tablet} {
    & > div > span:last-child {
      display: block;
      margin-left: 0.3em;
    }
  }

  ${media.mobile} {
    margin-bottom: 10%;
  }
`;

export const SuggestedInfoWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  ${({ theme }) => theme.flexColumnSet('space-between')};

  & > div {
    margin-bottom: 2%;
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  ${media.tablet} {
    & > div {
      margin-bottom: 5%;
    }
  }

  ${media.mobile} {
    & > div {
      margin-bottom: 7%;
    }
  }
`;

export const SuggestedInfo = styled.div`
  flex: 1;
  width: 100%;
  ${({ theme }) => theme.flexSet('start')}

  & > div:first-child {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 3%;
    cursor: pointer;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  & > div:last-child {
    width: 1px;
    flex-grow: 1;

    & > div {
      ${({ theme }) => theme.flexSet('space-between')}
      padding-right: 0.5em;
      margin-bottom: 0.3em;

      & > h2 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
      }

      & > span {
        ${ReverseHoverStyle('&')}
        opacity: 40%;
      }
    }
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
    & > img {
      height: 60px;
    }

    & > div > div > h2 {
      font-size: 1rem;
    }

    & > div > div > span {
      font-size: 0.9rem;
    }

    & > div > p {
      font-size: 0.9rem;
    }
  }

  ${media.mobile} {
    & > img {
      height: 50px;
    }

    & > div > div > h2 {
      font-size: 0.9rem;
    }

    & > div > div > span {
      font-size: 0.8rem;
    }

    & > div > p {
      font-size: 0.8rem;
    }
  }
`;
