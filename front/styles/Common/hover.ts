import { css } from 'styled-components';

export const HoverStyle = (selector: string) => css`
  ${selector} {
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 40%;
    }

    &:active {
      opacity: 100%;
    }
  }
`;

export const ReverseHoverStyle = (selector: string) => css`
  ${selector} {
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 100%;
    }

    &:active {
      opacity: 40%;
    }
  }
`;
