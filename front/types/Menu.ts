export type IMenu = {
  onClickMenu: (menu: string) => void;
};

export type IMenuContents = IMenu & {
  selectMenu: string;
};
