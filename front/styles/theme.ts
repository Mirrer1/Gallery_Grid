import { Theme } from './theme.d';

const theme: Theme = {
  colors: {
    primary: '#6BA2E6',
    bg: '#E4E5EC',
    lightBg: '#EEEFF3',
    font: '#222222'
  },
  calcRem: pxSize => {
    return `${pxSize / 16}rem`;
  },
  flexSet: (just = 'center', align = 'center') => {
    return `display: flex;
    justify-content: ${just};
    align-items: ${align};`;
  },
  flexColumnSet: (just = 'center', align = 'center') => {
    return `display: flex;
    flex-direction: column;
    justify-content: ${just};
    align-items: ${align};`;
  }
};

export default theme;
