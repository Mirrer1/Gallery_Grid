import { HIDE_COMMENT_LIST, HIDE_POST_MODAL, SHOW_COMMENT_LIST, SHOW_POST_MODAL } from 'store/types/postType';

export const showCommentList = () => ({
  type: SHOW_COMMENT_LIST
});

export const hideCommentList = () => ({
  type: HIDE_COMMENT_LIST
});

export const showPostModal = () => ({
  type: SHOW_POST_MODAL
});

export const hidePostModal = () => ({
  type: HIDE_POST_MODAL
});
