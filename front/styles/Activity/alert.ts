import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const AlertWrapper = styled(motion.section)`
  height: 1px;
  flex-grow: 1;
  overflow-y: scroll;
  background-color: white;
  border-radius: 5px 5px 0 0;

  ${media.tablet} {
    height: 100%;
    overflow-y: visible;
    border-radius: 5px;
  }
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

  ${media.tablet} {
    border-radius: 5px 5px 0 0;
  }

  ${media.mobile} {
    font-size: 0.65rem;
  }
`;

export const AlertItemWrapper = styled.section`
  padding: 1em 1.5em;

  ${media.mobile} {
    padding: 0.5em 0.5em 0.8em 0.5em;
  }
`;

export const AlertHeader = styled.div<{ $type: string }>`
  ${({ theme }) => theme.flexSet('start')}
  margin-bottom: ${props => (props.$type === 'follow' ? '0' : '0.5em')};

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1em;
    cursor: pointer;
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
    line-height: 1.3;
    padding-bottom: 0.2em;
    word-wrap: break-word;

    & > span:first-child {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
      cursor: pointer;
    }

    & > span:last-child {
      font-weight: 600;
    }
  }

  ${media.mobile} {
    & > img {
      width: 40px;
      height: 40px;
      margin-right: 0.7em;
    }

    & > p {
      display: none;
    }

    & > h1 {
      width: 80%;
      font-size: 0.7rem;
    }
  }
`;

export const AlertContentWrapper = styled.div`
  margin: 0 1em 0 3.5em;

  ${media.mobile} {
    margin: 0;
  }
`;

export const AlertContent = styled.div`
  ${HoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')}
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1em;

  & > img {
    width: 20%;
    height: 150px;
    border-radius: 5px;
  }

  & > div {
    width: 80%;
    padding-left: 1em;

    & > p {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 0.8rem;
      opacity: 60%;
      line-height: 1.5;
      margin-bottom: 0.5em;
    }

    & > div {
      display: inline-block;
      cursor: pointer;
      opacity: 60%;
      font-size: 0.8rem;
      margin-right: 0.5em;

      & > span {
        margin-right: 0.2em;
      }
    }
  }

  ${media.tablet} {
    padding: 0.7em;

    & > img {
      width: 30%;
    }

    & > div {
      width: 70%;

      & > p {
        -webkit-line-clamp: 4;
      }
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()}

    & > img {
      width: 100%;
      height: 230px;
      margin-bottom: 0.3em;
    }

    & > div {
      width: 100%;
      padding: 0 0.2em;
    }
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
    padding: 0.77em 1.7em;
    border-radius: 5px;
  }

  ${media.tablet} {
    & > button:first-child {
      font-size: 0.75rem;
      padding: 0.5em 1.5em;
    }

    & > button:last-child {
      font-size: 0.75rem;
      padding: 0.6em 1.1em;
    }
  }

  ${media.mobile} {
    padding-left: 3em;

    & > button:first-child {
      font-size: 0.65rem;
    }

    & > button:last-child {
      font-size: 0.65rem;
    }
  }
`;
