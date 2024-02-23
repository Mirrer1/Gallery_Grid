import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const GalleryWrapper = styled.section`
  background-color: white;
  height: 96%;
  border-radius: 5px;
  padding: 1.5em 1.5em 0.5em 1.5em;
  margin: 1em;

  & > div:first-child {
    height: 11%;

    & > h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1em;
    }
  }

  & > div:last-child {
    height: 89%;
    overflow-y: scroll;
    padding: 1em 1em 1em 0em;
  }
`;

export const GalleryCategoryWrapper = styled.nav`
  ${({ theme }) => theme.flexSet('space-between')}
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};
  padding-bottom: 1em;

  & > div:last-child {
    font-size: 0.75rem;
    ${HoverStyle('&')}

    & > button {
      margin-right: 0.2em;
    }
  }
`;

export const GalleryCategoryBtn = styled.button<{ $selected: boolean }>`
  opacity: 40%;
  font-size: 0.9rem;
  margin-right: 2em;
  ${ReverseHoverStyle('&')};
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  color: ${props => (props.$selected ? '#6BA2E6' : '40%')};
  font-weight: ${props => (props.$selected ? '500' : '0')};
  text-decoration: ${props => (props.$selected ? 'underline' : 'none')};
  text-decoration-thickness: ${props => (props.$selected ? '2px' : '0')};
  text-underline-offset: ${props => (props.$selected ? '5px' : '0')};
`;
