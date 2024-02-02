import styled from 'styled-components';
import Link from 'next/link';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const LayoutWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')};
  height: 100%;

  & > aside {
    ${({ theme }) => theme.flexColumnSet('start', 'start')};
    width: 250px;
    height: 100%;
    padding: 1.2em 1.8em;
  }

  & > main {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bg};
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
    font-size: 0.7rem;
    opacity: 40%;
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
  text-decoration: ${props => (props.$selected ? 'underline' : 'none')};
  text-decoration-thickness: ${props => (props.$selected ? '2px' : '0')};
  text-underline-offset: ${props => (props.$selected ? '5px' : '0')};
  font-size: 0.9rem;
  margin-bottom: 1.8em;
  font-weight: 500;

  & > span {
    margin-right: 0.7em;
  }

  & > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
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
    padding-bottom: 1.6px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.primary};
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
`;
