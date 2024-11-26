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
  padding: 2.5% 12%;

  & > aside {
    ${({ theme }) => theme.flexColumnSet('space-between', 'start')};
    width: 20%;
    height: 100%;
    background-color: white;
    padding: 1.5em 0;
    border-radius: 5px 0 0 5px;

    & > div {
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & > div:first-child {
        flex-grow: 1;
      }
    }
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
      padding: 1.2em 0;
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
  padding: 0 2em;
  margin-bottom: 10%;

  & > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 1.5em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
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
    padding: 0 1em;
    margin-bottom: 17%;

    & > img {
      width: 50px;
      height: 50px;
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

export const NavbarItems = styled.div`
  width: 100%;
`;

export const NavbarItem = styled(Link)<{ $selected: boolean; $message: boolean }>`
  ${ReverseHoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')};
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  color: ${props => props.$selected && '#6BA2E6'};
  font-weight: ${props => (props.$selected ? '700' : '500')};
  font-size: 0.9rem;
  margin-bottom: ${props => (props.$message ? '0' : '1em')};

  & > div {
    visibility: ${props => (props.$selected ? 'visible' : 'hidden')};
    width: 4px;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.primary};
    margin-right: 2em;
  }

  & > span {
    margin-right: 0.7em;
  }

  ${media.tablet} {
    font-size: 0.8rem;

    & > div {
      margin-right: 1em;
    }
  }
`;

export const NavbarMessage = styled.div<{ $selected: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};
  margin: 0 1em 1em 0;

  & > a {
    flex-grow: 1;
  }

  & > div > button {
    ${({ theme }) => theme.flexSet()};
    width: 22px;
    height: 22px;
    color: white;
    font-size: 0.8rem;
    border-radius: 50%;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.primary};

    & > p {
      line-height: 0;
    }
  }

  ${media.tablet} {
    margin-right: 0.5em;

    & > div > button {
      transform: scale(0.95);
    }
  }
`;

export const NavbarLogout = styled.button`
  ${ReverseHoverStyle('&')}
  ${({ theme }) => theme.flexSet('start')};
  font-size: 0.9rem;
  opacity: 40%;
  font-weight: 500;

  & > div {
    width: 4px;
    height: 25px;
    margin-right: 2em;
  }

  & > span {
    margin-right: 0.7em;
  }

  ${media.tablet} {
    font-size: 0.8rem;

    & > div {
      margin-right: 1em;
    }
  }
`;

export const SearchWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')}
  width: fit-content;
  padding: 1em 2em;
  margin-bottom: 15%;
  opacity: 40%;
  cursor: pointer;

  & > span {
    font-size: 1rem;
    margin-right: 0.5em;
  }

  & > p {
    font-size: 0.9rem;
  }

  ${media.tablet} {
    padding: 0.5em 1em;
    margin-bottom: 17%;

    & > span {
      font-size: 0.95rem;
      margin-right: 0.4em;
    }

    & > p {
      font-size: 0.85rem;
    }
  }
`;
