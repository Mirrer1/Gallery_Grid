export type BaseMenuProps = {
  onClickMenu: (menu: string) => void;
};

export type MenuContentsProps = BaseMenuProps & {
  selectMenu: string;
};
