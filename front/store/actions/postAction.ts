import {
  HIDE_COMMENT_LIST,
  HIDE_POST_CAROUSEL,
  HIDE_POST_MODAL,
  ADD_POST_REQUEST,
  SHOW_COMMENT_LIST,
  SHOW_POST_CAROUSEL,
  SHOW_POST_MODAL,
  LOAD_POSTS_REQUEST,
  DELETE_POST_REQUEST,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  Post,
  EXECUTE_POST_EDIT,
  CANCEL_POST_EDIT,
  EDIT_POST_REQUEST,
  POST_UPLOAD_IMAGES_REQUEST,
  POST_REMOVE_UPLOADED_IMAGE,
  EDIT_POST_UPLOAD_IMAGES_REQUEST,
  EDIT_POST_REMOVE_UPLOADED_IMAGE
} from 'store/types/postType';

export const loadPostsRequest = (lastId?: number) => ({
  type: LOAD_POSTS_REQUEST,
  lastId
});

export const addPostRequest = (data: FormData) => ({
  type: ADD_POST_REQUEST,
  data
});

export const editPostRequest = (data: FormData) => ({
  type: EDIT_POST_REQUEST,
  data
});

export const deletePostRequest = (data: number) => ({
  type: DELETE_POST_REQUEST,
  data
});

export const postUploadImagesRequest = (data: FormData) => ({
  type: POST_UPLOAD_IMAGES_REQUEST,
  data
});

export const postRemoveUploadedImage = (data: string) => ({
  type: POST_REMOVE_UPLOADED_IMAGE,
  data
});

export const editPostUploadImagesRequest = (data: FormData) => ({
  type: EDIT_POST_UPLOAD_IMAGES_REQUEST,
  data
});

export const editPostRemoveUploadedImage = (data: string) => ({
  type: EDIT_POST_REMOVE_UPLOADED_IMAGE,
  data
});

export const showCommentList = () => ({
  type: SHOW_COMMENT_LIST
});

export const hideCommentList = () => ({
  type: HIDE_COMMENT_LIST
});

export const showPostCarousel = () => ({
  type: SHOW_POST_CAROUSEL
});

export const hidePostCarousel = () => ({
  type: HIDE_POST_CAROUSEL
});

export const showPostModal = (data: Post) => ({
  type: SHOW_POST_MODAL,
  data
});

export const hidePostModal = () => ({
  type: HIDE_POST_MODAL
});

export const executePostEdit = () => ({
  type: EXECUTE_POST_EDIT
});

export const cancelPostEdit = () => ({
  type: CANCEL_POST_EDIT
});

export const showDeleteModal = (data: number) => ({
  type: SHOW_DELETE_MODAL,
  data
});

export const hideDeleteModal = () => ({
  type: HIDE_DELETE_MODAL
});
