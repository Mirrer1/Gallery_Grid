export interface Theme {
  colors: {
    primary: string;
    red: string;
    bg: string;
    darkBg: string;
    lightBg: string;
    font: string;
    lightFont: string;
  };
  calcRem: (pxSize: number) => string;
  flexSet: (just?: string, align?: string) => string;
  flexColumnSet: (just?: string, align?: string) => string;
}
