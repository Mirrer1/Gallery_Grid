import {
  HIDE_COMMENT_LIST,
  HIDE_POST_CAROUSEL,
  HIDE_POST_MODAL,
  ADD_POST_REQUEST,
  SHOW_COMMENT_LIST,
  SHOW_POST_CAROUSEL,
  SHOW_POST_MODAL,
  LOAD_POSTS_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_UPLOADED_IMAGE
} from 'store/types/postType';

export const loadPostsRequest = (lastId?: number) => ({
  type: LOAD_POSTS_REQUEST,
  lastId
});

export const addPostRequest = (data: FormData) => ({
  type: ADD_POST_REQUEST,
  data
});

export const uploadImagesRequest = (data: FormData) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data
});

export const removeUploadedImage = (data: string) => ({
  type: REMOVE_UPLOADED_IMAGE,
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
