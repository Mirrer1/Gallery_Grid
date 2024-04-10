export const SHOW_COMMENT_LIST = 'SHOW_COMMENT_LIST' as const;
export const HIDE_COMMENT_LIST = 'HIDE_COMMENT_LIST' as const;

export const SHOW_POST_MODAL = 'SHOW_POST_MODAL' as const;
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL' as const;

export type PostState = {
  isCommentListVisible: boolean;
  isPostModalVisible: boolean;
};

export interface ShowCommentListAction {
  type: typeof SHOW_COMMENT_LIST;
}

export interface HideCommentListAction {
  type: typeof HIDE_COMMENT_LIST;
}

export interface ShowPostModalAction {
  type: typeof SHOW_POST_MODAL;
}

export interface HidePostModalAction {
  type: typeof HIDE_POST_MODAL;
}

export type PostAction = ShowCommentListAction | HideCommentListAction | ShowPostModalAction | HidePostModalAction;
