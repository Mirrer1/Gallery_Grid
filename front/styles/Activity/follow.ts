import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const FollowTableWrapper = styled.section<{ $type: string; $visible: boolean }>`
  position: relative;
  flex-grow: 1;
  width: 47%;
  background-color: white;
  border-radius: ${props => (props.$visible ? '5px 5px 0 0' : '5px')};
  margin-right: ${props => (props.$type === 'follower' ? '1em' : '0')};
  margin-bottom: 1em;
  z-index: 35;
  ${ShadowStyle}

  ${media.tablet} {
    margin-bottom: 0.5em;
  }

  ${media.mobile} {
    width: 100%;
    margin-right: 0;
    margin-bottom: ${props => (props.$type === 'follower' ? '0.3em' : '0.5em')};
    z-index: ${props => (props.$type === 'follower' && props.$visible ? '35' : '30')};
  }
`;

export const FollowTableInfo = styled.div`
  ${({ theme }) => theme.flexSet('space-between')}
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  padding: 1em 1.5em;

  & > h1 {
    font-size: 0.9rem;
    font-weight: 700;
    opacity: 80%;
  }

  & > div > span {
    ${HoverStyle('&')}
    opacity: 80%;

    &:first-child {
      margin-right: 0.3em;
    }
  }

  ${media.tablet} {
    padding: 0.8em 1em;

    & > h1 {
      font-size: 0.8rem;
    }

    & > div > span {
      font-size: 0.9rem;

      &:first-child {
        margin-right: 0.2em;
      }
    }
  }
`;

export const FollowTable = styled.table`
  position: absolute;
  top: 99%;
  width: 100%;
  text-align: center;
  background-color: white;
  border-top: 1.5px solid #e4e5ec;
  border-radius: 0 0 5px 5px;
  ${ShadowStyle}
`;

export const FollowTableHeader = styled.thead<{ $visible: boolean }>`
  display: block;
  max-height: ${props => (props.$visible ? '34px' : '0')};
  overflow: hidden;
  transition: max-height 300ms ease-in-out;

  & > tr {
    display: table;
    width: 100%;
  }

  & > tr > td {
    width: 20%;
    font-weight: 500;
    font-size: 0.6rem;
    opacity: 40%;
    padding: 1.5em 1.2em 0.5em 1.2em;
  }

  ${media.tablet} {
    & > tr > td {
      font-size: 0.6rem;
      padding: 1em 0.5em 0em 0.5em;

      &:nth-child(3),
      &:nth-child(4) {
        display: none;
      }
    }
  }
`;

export const FollowTableBody = styled.tbody<{ $visible: boolean }>`
  display: block;
  max-height: ${props => (props.$visible ? '225px' : '0')};
  overflow-y: scroll;
  transition: max-height 300ms ease-in-out;

  & > tr {
    display: table;
    width: 100%;
  }

  & > tr > td {
    vertical-align: middle;
    font-size: 0.8rem;
    padding: 0.7em 1.2em;
    width: 20%;

    &:first-child {
      padding-right: 0;

      & > img {
        margin: 0 auto;
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
    }

    &:nth-child(2) {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 700;

      @media (min-width: 992px) {
        &:hover {
          text-decoration: underline;
          text-underline-offset: 1.5px;
        }
      }
    }

    &:last-child > button {
      font-size: 0.7rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      ${HoverStyle('&')}
    }
  }

  ${media.tablet} {
    max-height: ${props => (props.$visible ? '205px' : '0')};

    & > tr > td {
      font-size: 0.8rem;
      padding: 0.7em;

      &:first-child {
        & > img {
          width: 50px;
          height: 50px;
        }
      }

      &:nth-child(3),
      &:nth-child(4) {
        display: none;
      }

      &:last-child > button {
        font-size: 0.6rem;
        padding: 0.7em 1.2em;
      }
    }
  }
`;

export const FollowSearch = styled.div<{ $visible: boolean }>`
  display: ${props => (props.$visible ? 'block' : 'none')};
  position: absolute;
  top: 102%;
  width: 100%;
  padding: 0.3em 0.4em;
  background-color: white;
  ${ShadowStyle}

  & > input {
    width: 90%;
    font-size: 0.8rem;
    padding: 0.3em;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  & > span {
    width: 5%;
    font-size: 0.8rem;
    opacity: 60%;
    ${ReverseHoverStyle('&')};
  }

  ${media.tablet} {
    & > input {
      width: 84%;
    }

    & > span {
      width: 8%;
    }
  }

  ${media.mobile} {
    & > input {
      width: 90%;
    }

    & > span {
      width: 5%;
    }
  }
`;
