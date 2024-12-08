import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const AlertBtn = styled(motion.div)<{ $selectAll: boolean }>`
  width: ${props => !props.$selectAll && '15%'};
  ${({ theme }) => theme.flexSet('end')};
  margin-bottom: ${props => props.$selectAll && '0.5em'};

  & > button {
    ${({ theme }) => theme.flexSet()};
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.5em 1em;
    color: ${props => (props.$selectAll ? 'white' : '#6BA2E6')};
    background-color: ${props => (props.$selectAll ? '#6BA2E6' : 'white')};
    border: ${props => !props.$selectAll && '1px solid #6BA2E6'};
    border-radius: 5px;
    ${HoverStyle('&')};

    & > span {
      margin-right: 0.5em;
    }

    & > span:nth-child(2) {
      display: ${props => !props.$selectAll && 'none'};
    }
  }

  ${media.tablet} {
    width: ${props => !props.$selectAll && '8%'};

    & > button {
      font-size: 0.7rem;
      padding: ${props => !props.$selectAll && '0'};
      border: ${props => !props.$selectAll && 'none'};

      & > span {
        font-size: ${props => !props.$selectAll && '1rem'};
        margin-right: ${props => (props.$selectAll ? '0.3em' : '0')};
      }

      & > span:first-child {
        display: ${props => !props.$selectAll && 'none'};
      }

      & > span:nth-child(2) {
        display: ${props => !props.$selectAll && 'block'};
      }

      & > p {
        display: ${props => !props.$selectAll && 'none'};
      }
    }
  }

  ${media.tablet} {
    position: relative;
    bottom: 2px;
  }
`;

export const AlertWrapper = styled(motion.section)`
  height: 1px;
  flex-grow: 1;
  overflow-y: scroll;
  background-color: white;
  border-radius: 5px 5px 0 0;

  ${media.tablet} {
    min-height: 600px;
    height: 100%;
    overflow-y: visible;
    border-radius: 5px;
  }

  ${media.mobile} {
    min-height: 520px;
  }
`;

export const NoAlertsContainer = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  height: 100%;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.25em;
  }

  & > h1 {
    color: ${({ theme }) => theme.colors.font};
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.2em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
  }

  ${media.tablet} {
    height: 100vh;
  }
`;

export const AlertDivider = styled(motion.div)`
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
`;

export const AlertItemWrapper = styled(motion.section)`
  padding: 1em;

  ${media.tablet} {
    padding: 0.7em 1em;
  }

  ${media.mobile} {
    padding: 0.5em 0.5em 0.8em 0.5em;
  }
`;

export const AlertHeader = styled.div<{ $type: string }>`
  ${({ theme }) => theme.flexSet('space-between')}
  margin-bottom: ${props => (props.$type === 'follow' ? '0' : '0.5em')};
  margin-right: 1em;

  & > div:first-child {
    width: 1px;
    flex-grow: 1;
    ${({ theme }) => theme.flexSet('start')}

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.8em;
      cursor: pointer;
    }

    & > div {
      width: 1px;
      flex-grow: 1;

      & > div {
        ${({ theme }) => theme.flexSet('start')}
        font-size: 0.9rem;
        margin-bottom: 0.2em;

        & > span:first-child,
        & > p:first-child > span {
          font-weight: 600;
          cursor: pointer;
        }

        & > p:first-child {
          margin-right: 0.2em;
        }

        & > p:last-child {
          max-width: 35%;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin-right: 0.2em;
        }
      }

      & > p {
        font-weight: 500;
        font-size: 0.8rem;
        opacity: 40%;
        margin-right: 0.5em;
      }
    }
  }

  ${media.tablet} {
    & > div:first-child {
      & > img {
        width: 46px;
        height: 46px;
        margin-right: 0.5em;
      }

      & > div {
        & > div {
          font-size: 0.75rem;

          & > p:last-child {
            max-width: 23%;
          }
        }

        & > p {
          font-size: 0.75rem;
        }
      }
    }
  }

  ${media.mobile} {
    margin-right: 0;

    & > div:first-child {
      & > img {
        width: 44px;
        height: 44px;
      }

      & > div {
        & > div {
          font-size: 0.7rem;

          & > p:last-child {
            display: none;
          }
        }
      }
    }
  }
`;

export const AlertContentWrapper = styled.div`
  margin: 0 1em 0 3.5em;
  cursor: pointer;

  ${media.mobile} {
    margin: 0;
  }
`;

export const AlertContent = styled.div<{ $type: 'follow' | 'like' | 'comment' }>`
  ${HoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')}
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1em;
  ${ShadowStyle};

  & > img {
    width: 200px;
    height: 150px;
    border-radius: 5px;
    margin-right: 0.8em;
    ${ShadowStyle};
  }

  & > div {
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')};
    width: 1px;
    flex-grow: 1;
    height: 150px;
    padding: 0.2em 0;

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
      & > div {
        display: inline-block;
        opacity: 60%;
        font-size: 0.8rem;
        margin-right: 0.3em;

        & > span {
          margin-right: 0.2em;
        }
      }

      & > div:first-child {
        color: ${props => props.$type === 'like' && '#EE6B6E'};
      }

      & > div:last-child {
        color: ${props => props.$type === 'comment' && '#6BA2E6'};
      }
    }
  }

  ${media.tablet} {
    padding: 0.7em;

    & > img {
      width: 150px;
    }

    & > div {
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
      margin-right: 0;
    }

    & > div {
      width: 100%;
      padding: 0 0.2em;
    }
  }
`;

export const AlertContentBtn = styled.div<{ $isFollowing: boolean }>`
  padding-left: 0.5em;

  & > button {
    width: 89px;
    height: 28px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 5px;
    ${HoverStyle('&')}
  }

  & > button:first-child {
    color: #6ba2e6;
    border: 1px solid #6ba2e6;
    margin-right: 0.3em;
  }

  & > button:last-child {
    background-color: ${props => (props.$isFollowing ? 'white' : '#6BA2E6')};
    color: ${props => (props.$isFollowing ? '#6BA2E6' : 'white')};
    border: ${props => props.$isFollowing && '1px solid #6BA2E6'};
  }

  ${media.tablet} {
    & > button {
      font-size: 0.75rem;
    }
  }

  ${media.mobile} {
    padding-left: 3em;
  }
`;
