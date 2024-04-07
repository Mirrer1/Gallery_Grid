import { css } from 'styled-components';

export const HoverStyle = (selector: string) => css`
  @media (min-width: 992px) {
    ${selector} {
      transition: opacity 200ms ease-in-out;

      &:hover {
        opacity: 40%;
      }

      &:active {
        opacity: 100%;
      }
    }
  }
`;

export const ReverseHoverStyle = (selector: string) => css`
  @media (min-width: 992px) {
    ${selector} {
      transition: opacity 200ms ease-in-out;

      &:hover {
        opacity: 100%;
      }

      &:active {
        opacity: 40%;
      }
    }
  }
`;
