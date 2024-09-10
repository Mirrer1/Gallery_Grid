import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const GalleryWrapper = styled.section`
  background-color: white;
  height: 97%;
  border-radius: 5px 5px 0 0;
  padding: 2% 2% 0 2%;
  margin: 2% 2% 0 2%;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    & > h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1em;
    }
  }

  & > div:last-child {
    height: 1px;
    flex-grow: 1;
    overflow-y: auto;
    padding: 0.7em 1em 0.7em 0em;
  }

  ${media.tablet} {
    height: 100%;
    padding: 1.5em 1.5em 0.5em 1.5em;
    margin: 0;

    & > div:first-child {
      & > h1 {
        font-size: 1.2rem;
        margin-bottom: 0.7em;
      }
    }

    & > div:last-child {
      padding: 0.7em 0 0.2em 0;
      overflow-y: visible;
      height: 100%;
    }
  }

  ${media.mobile} {
    padding: 0;
    margin-bottom: 0.5em;

    & > div:first-child {
      padding: 1em 1em 0.7em 1em;

      & > h1 {
        margin-bottom: 0.3em;
      }
    }

    & > div:last-child {
      padding: 0 1em 0.7em 1em;
    }
  }
`;

export const GalleryCategoryWrapper = styled.nav`
  ${({ theme }) => theme.flexSet('space-between')}
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > div:last-child {
    position: relative;
    top: 2px;
    font-size: 0.75rem;
    ${HoverStyle('&')}

    & > button {
      margin-right: 0.5em;
    }
  }

  ${media.tablet} {
    & > div:last-child {
      font-size: 0.65rem;
    }
  }
`;

export const GalleryCategoryBtn = styled.button<{ $selected: boolean }>`
  position: relative;
  top: 2px;
  opacity: 40%;
  font-size: 0.9rem;
  ${ReverseHoverStyle('&')};
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  color: ${props => (props.$selected ? '#6BA2E6' : '40%')};
  font-weight: ${props => (props.$selected ? '500' : '0')};
  border-bottom: ${props => props.$selected && '2px solid #6BA2E6'};
  font-weight: 500;
  padding: 0.7em 1em;
  cursor: pointer;

  ${media.tablet} {
    font-size: 0.8rem;
  }
`;
