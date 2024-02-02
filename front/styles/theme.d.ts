export interface Theme {
  colors: {
    primary: string;
    bg: string;
    darkBg: string;
    lightBg: string;
    font: string;
  };
  calcRem: (pxSize: number) => string;
  flexSet: (just?: string, align?: string) => string;
  flexColumnSet: (just?: string, align?: string) => string;
}
