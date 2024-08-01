import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';

import media from 'styles/media';

export const EditModalContentWrapper = styled.div`
  width: 45%;
  height: 100%;
  background-color: white;
  border-radius: 0 5px 5px 0;
  z-index: 30;

  ${media.mobile} {
    width: 100%;
    border-radius: 0 0 5px 5px;
  }
`;

export const EditModalContentHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  height: 10%;
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};

  & > div {
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

      @media (min-width: 992px) {
        &:hover {
          text-decoration: underline;
          text-underline-offset: 1.5px;
        }
      }
    }

    & > div > p {
      font-size: 0.7rem;
      opacity: 40%;
    }
  }

  ${media.tablet} {
    padding: 0.6em;

    & > div {
      & > img {
        width: 38px;
        height: 38px;
      }

      & > div > h1 {
        font-size: 0.8rem;
      }

      & > div > p {
        font-size: 0.65rem;
      }
    }
  }

  ${media.mobile} {
    height: 17%;
    padding: 0.5em;
  }
`;

export const EditModalForm = styled.form`
  height: 82%;
  padding: 0.7em 1em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  overflow-y: scroll;

  & > textarea {
    width: 100%;
    height: 96%;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 0.5em;
    border: none;
    outline: none;
    resize: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > p {
    height: 3%;
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 40%;
    text-align: end;
  }

  ${media.tablet} {
    height: 81%;

    & > textarea {
      font-size: 0.75rem;
    }

    & > p {
      font-size: 0.75rem;
    }
  }

  ${media.mobile} {
    height: 71%;
    padding: 0.5em;

    & > textarea {
      font-size: 0.7rem;
      margin-bottom: 0;
    }

    & > p {
      font-size: 0.7rem;
    }
  }
`;

export const EditModalBtn = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  height: 8%;
  padding: 0.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  border-radius: 0 0 5px 0;

  & > div:first-child {
    position: relative;

    & > span {
      opacity: 70%;
      margin-right: 0.8em;
      cursor: pointer;
      ${HoverStyle('&')}
    }

    & > div {
      position: relative;
      top: -1px;
      display: inline-block;
      opacity: 70%;
      ${HoverStyle('&')}
      cursor: pointer;

      & > p {
        font-size: 0.8rem;
      }

      & > span {
        position: absolute;
        top: -35%;
        right: -13%;
        font-size: 0.5rem;
      }
    }
  }

  & > div:last-child {
    & > button {
      ${HoverStyle('&')}
      font-size: 0.7rem;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      margin-right: 0.5em;
    }

    & > button:first-child {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }

    & > button:last-child {
      border: 1px solid ${({ theme }) => theme.colors.red};
      color: ${({ theme }) => theme.colors.red};
    }
  }

  ${media.tablet} {
    height: 9%;
    padding: 0.6em;

    & > div:last-child {
      & > button {
        font-size: 0.6rem;
      }
    }
  }

  ${media.mobile} {
    height: 12%;
    padding: 0.6em;
    border-radius: 0 0 5px 5px;

    & > div:first-child {
      & > div {
        top: -2px;

        & > p {
          font-size: 0.7rem;
        }
      }
    }
  }
`;

export const EditModalEmojiPicker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  transform: translate(-50%, -50%);
  z-index: 99;

  & > div:first-child {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  & > div:last-child {
    position: absolute;
    bottom: 19%;
    right: 25%;
    z-index: 100;
  }

  ${media.tablet} {
    & > div:last-child {
      right: 24%;
    }
  }

  ${media.mobile} {
    height: 450%;

    & > div:last-child {
      bottom: 19.5%;
    }
  }
`;
