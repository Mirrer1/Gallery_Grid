import styled from 'styled-components';
import Link from 'next/link';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const LayoutWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')};
  background-color: ${({ theme }) => theme.colors.darkBg};
  width: 100%;
  height: 100%;
  flex-grow: 1;
  padding: 3em 13%;

  & > aside {
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')};
    width: 20%;
    height: 100%;
    background-color: white;
    padding: 1.2em 1.8em 1.5em 1.8em;
    border-radius: 5px 0 0 5px;
  }

  & > aside > div {
    width: 100%;
  }

  & > main {
    width: 80%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 0 5px 5px 0;
  }

  ${media.tablet} {
    padding: 0;
    height: auto;

    & > aside {
      position: fixed;
      top: 0%;
      left: 0%;
      width: 25%;
      padding: 1.5em 1.2em 2em 1.2em;
    }

    & > div {
      width: 25%;
      visibility: hidden;
    }

    & > main {
      width: 75%;
      padding: 1em;
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet('start')};

    & > aside {
      display: none;
    }

    & > div {
      display: none;
    }

    & > main {
      width: 100%;
      padding: 0.5em 0.5em 60px 0.5em;
    }
  }
`;

export const NavbarProfile = styled.div`
  margin-bottom: 3em;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 1.5em;
  }

  & > h1 {
    color: ${({ theme }) => theme.colors.font};
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  & > p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.75rem;
    line-height: 1.3;
    opacity: 40%;
  }

  ${media.tablet} {
    padding: 0;

    & > img {
      width: 45px;
      height: 45px;
      margin-bottom: 1em;
    }

    & > h1 {
      font-size: 1.2rem;
      margin-bottom: 0.3em;
    }

    & > p {
      font-size: 0.7rem;
    }
  }
`;

export const NavbarItems = styled.div<{ $firstmargin: string }>`
  width: 100%;
  margin-bottom: ${props => props.$firstmargin === 'true' && '6em'};
`;

export const NavbarItem = styled(Link)<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')};
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  color: ${props => props.$selected && '#6BA2E6'};
  font-weight: ${props => (props.$selected ? '700' : '500')};
  font-size: 0.9rem;
  margin-bottom: 1.8em;

  & > span {
    margin-right: 0.7em;
  }
`;

export const NavbarMessage = styled.div<{ $selected: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};

  & > a {
    flex-grow: 1;
  }

  & > div {
    ${ReverseHoverStyle('&')}
    padding-bottom: 20px;
    opacity: ${props => (props.$selected ? '100%' : '40%')};
  }

  & > div > button {
    width: 23px;
    height: 23px;
    color: white;
    font-size: 0.8rem;
    border-radius: 50%;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${media.tablet} {
    & > div > button {
      width: 20px;
      height: 20px;
      font-size: 0.6rem;
    }
  }
`;

export const NavbarLogout = styled.button`
  ${ReverseHoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')};
  font-size: 0.9rem;
  opacity: 40%;
  font-weight: 500;

  & > span {
    margin-right: 0.7em;
  }

  ${media.tablet} {
    font-size: 0.8rem;
  }
`;
