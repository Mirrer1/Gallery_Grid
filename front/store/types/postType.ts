export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const SHOW_COMMENT_LIST = 'SHOW_COMMENT_LIST' as const;
export const HIDE_COMMENT_LIST = 'HIDE_COMMENT_LIST' as const;

export const SHOW_POST_MODAL = 'SHOW_POST_MODAL' as const;
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL' as const;

export const SHOW_POST_CAROUSEL = 'SHOW_POST_CAROUSEL' as const;
export const HIDE_POST_CAROUSEL = 'HIDE_POST_CAROUSEL' as const;

export type PostState = {
  mainPosts: any[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
  isCommentListVisible: boolean;
  isPostModalVisible: boolean;
  isCarouselVisible: boolean;
};

export interface addPostRequestAction {
  type: typeof ADD_POST_REQUEST;
}

export interface addPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
}

export interface addPostFailureAction {
  type: typeof ADD_POST_FAILURE;
  error: any;
}

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

export interface ShowPostCarouselAction {
  type: typeof SHOW_POST_CAROUSEL;
}

export interface HidePostCarouselAction {
  type: typeof HIDE_POST_CAROUSEL;
}

export type PostAction =
  | ShowCommentListAction
  | HideCommentListAction
  | ShowPostModalAction
  | HidePostModalAction
  | ShowPostCarouselAction
  | HidePostCarouselAction
  | addPostRequestAction
  | addPostSuccessAction
  | addPostFailureAction;
