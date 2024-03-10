import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';
import media from 'styles/media';

export const ModalContentWrapper = styled.div`
  width: 25%;
  height: 70%;
  background-color: white;
  border-radius: 0 5px 5px 0;
  z-index: 30;
`;

export const ModalContentHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  height: 10%;
  padding: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  & > div:first-child {
    ${({ theme }) => theme.flexSet()};

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 0.5em;
      cursor: pointer;
    }

    & > div > h1 {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.3em;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 1.5px;
      }
    }

    & > div > p {
      font-size: 0.7rem;
      opacity: 40%;
    }
  }

  & > div:last-child {
    & > button {
      ${HoverStyle('&')}
      font-size: 0.7rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
    }
  }
`;

export const TooltipOutsideArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 29;
`;

export const PostTooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & > span:first-child {
    ${HoverStyle('&')}
  }
`;

export const PostTooltipBtn = styled.div<{ $visible: boolean }>`
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.$visible ? '1' : '0')};
  position: absolute;
  top: -75%;
  right: 100%;
  width: 145px;
  text-align: center;
  border-radius: 6px;
  padding: 7px 0;
  margin-left: -60px;
  transition: opacity 0.3s;
  z-index: 30;
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

export const ModalContentText = styled.div`
  height: 74%;
  font-size: 0.75rem;
  opacity: 60%;
  line-height: 1.5;
  padding: 0.7em 1em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  overflow-y: scroll;
`;

export const ModalContentOptions = styled.div`
  height: 9%;
  opacity: 60%;
  padding: 0.5em 0.7em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  & > div:first-child {
    margin-bottom: 0.5em;

    & > span {
      font-size: 1.1rem;
      cursor: pointer;
    }

    & > span:first-child {
      margin-right: 0.5rem;
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.flexSet('start')};
    font-size: 0.7rem;

    & > p:first-child {
      margin-right: 0.5rem;
    }
  }
`;

export const ModalCommentInput = styled.div<{ $active: boolean }>`
  height: 7%;
  ${({ theme }) => theme.flexSet('space-between')}
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.5em;

  & > div:first-child {
    width: 90%;
    ${({ theme }) => theme.flexSet('start')}

    & > span {
      width: 7%;
      font-size: 1.2rem;
      opacity: 40%;
      ${ReverseHoverStyle('&')}
    }

    & > input {
      width: 95%;
      font-size: 0.8rem;
      padding: 0.5em 1em 0.5em 0.5em;
      border: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        opacity: 60%;
      }
    }
  }

  & > div:last-child {
    width: 10%;
    ${({ theme }) => theme.flexSet('end')}

    & > span {
      font-size: 0.85rem;
      color: white;
      opacity: ${props => (props.$active ? '40%' : '100%')};
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: 0.4em 0.4em 0.4em 0.6em;
      ${HoverStyle('&')};
    }
  }
`;
