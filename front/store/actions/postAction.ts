import { HIDE_COMMENT_LIST, SHOW_COMMENT_LIST } from 'store/types/postType';

export const showCommentList = () => ({
  type: SHOW_COMMENT_LIST
});

export const hideCommentList = () => ({
  type: HIDE_COMMENT_LIST
});
