import { css } from 'styled-components';

export const ShadowStyle = css`
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const DarkShadowStyle = css`
  box-shadow:
    0px 0px 0px 1px rgb(0 0 0 / 0.06),
    0px 1px 1px -0.5px rgb(0 0 0 / 0.06),
    0px 3px 3px -1.5px rgb(0 0 0 / 0.06),
    0px 6px 6px -3px rgb(0 0 0 / 0.06),
    0px 12px 12px -6px rgb(0 0 0 / 0.06),
    0px 24px 24px -12px rgb(0 0 0 / 0.06);
`;

export const ImageShadowStyle = css`
  -webkit-box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -ms-box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -o-box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
`;
