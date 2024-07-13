import {
  HIDE_COMMENT_LIST,
  HIDE_POST_CAROUSEL,
  HIDE_POST_MODAL,
  ADD_POST_REQUEST,
  SHOW_COMMENT_LIST,
  SHOW_POST_CAROUSEL,
  SHOW_POST_MODAL,
  LOAD_POSTS_REQUEST,
  PostResponse
} from 'store/types/postType';

export const loadPostsRequest = () => ({
  type: LOAD_POSTS_REQUEST
});

export const addPostRequest = (data: PostResponse) => ({
  type: ADD_POST_REQUEST,
  data
});

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

export const showPostCarousel = () => ({
  type: SHOW_POST_CAROUSEL
});

export const hidePostCarousel = () => ({
  type: HIDE_POST_CAROUSEL
});
