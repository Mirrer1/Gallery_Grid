import { User } from './userType';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST' as const;
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS' as const;
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE' as const;

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST' as const;
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS' as const;
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE' as const;

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const;
export const REMOVE_UPLOADED_IMAGE = 'REMOVE_UPLOADED_IMAGE' as const;

export const SHOW_COMMENT_LIST = 'SHOW_COMMENT_LIST' as const;
export const HIDE_COMMENT_LIST = 'HIDE_COMMENT_LIST' as const;

export const SHOW_POST_CAROUSEL = 'SHOW_POST_CAROUSEL' as const;
export const HIDE_POST_CAROUSEL = 'HIDE_POST_CAROUSEL' as const;

export const SHOW_POST_MODAL = 'SHOW_POST_MODAL' as const;
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL' as const;

export const EXECUTE_POST_EDIT = 'EXECUTE_POST_EDIT' as const;
export const CANCEL_POST_EDIT = 'CANCEL_POST_EDIT' as const;

export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL' as const;
export const HIDE_DELETE_MODAL = 'HIDE_DELETE_MODAL' as const;

export type PostState = {
  mainPosts: Post[];
  singlePost: Post | null;
  imagePaths: string[];
  editImagePaths: string[];
  postEditMode: boolean;
  deleteId: number | null;
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | string;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deletePostError: null | string;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: null | string;
  isCommentListVisible: boolean;
  isCarouselVisible: boolean;
  isPostModalVisible: boolean;
  isDeleteModalVisible: boolean;
};

export interface Image {
  id: number;
  src: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  parentId: number | null;
}

export interface Post {
  id: number;
  content: string;
  location: string | null;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  User: User;
  Images: Image[];
  Comments: Comment[];
}

export interface loadPostsRequestAction {
  type: typeof LOAD_POSTS_REQUEST;
  lastId?: number;
}

export interface loadPostsSuccessAction {
  type: typeof LOAD_POSTS_SUCCESS;
  data: Post[];
}

export interface loadPostsFailureAction {
  type: typeof LOAD_POSTS_FAILURE;
  error: string;
}

export interface addPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: FormData;
}

export interface addPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  data: Post;
}

export interface addPostFailureAction {
  type: typeof ADD_POST_FAILURE;
  error: string;
}

export interface deletePostRequestAction {
  type: typeof DELETE_POST_REQUEST;
  data: number;
}

export interface deletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  data: number;
}

export interface deletePostFailureAction {
  type: typeof DELETE_POST_FAILURE;
  error: string;
}

export interface uploadImagesRequestAction {
  type: typeof UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface uploadImagesSuccessAction {
  type: typeof UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface uploadImagesFailureAction {
  type: typeof UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface showImagePreviewAction {
  type: typeof REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface hideImagePreviewAction {
  type: typeof REMOVE_UPLOADED_IMAGE;
}

export interface removeUploadedImageAction {
  type: typeof REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface ShowCommentListAction {
  type: typeof SHOW_COMMENT_LIST;
}

export interface HideCommentListAction {
  type: typeof HIDE_COMMENT_LIST;
}

export interface ShowPostCarouselAction {
  type: typeof SHOW_POST_CAROUSEL;
}

export interface HidePostCarouselAction {
  type: typeof HIDE_POST_CAROUSEL;
}

export interface ShowPostModalAction {
  type: typeof SHOW_POST_MODAL;
  data: Post;
}

export interface HidePostModalAction {
  type: typeof HIDE_POST_MODAL;
}

export interface executePostEditAction {
  type: typeof EXECUTE_POST_EDIT;
}

export interface cancelPostEditAction {
  type: typeof CANCEL_POST_EDIT;
}

export interface ShowDeleteModalAction {
  type: typeof SHOW_DELETE_MODAL;
  data: number;
}

export interface HideDeleteModalAction {
  type: typeof HIDE_DELETE_MODAL;
}

export type PostAction =
  | ShowCommentListAction
  | HideCommentListAction
  | ShowPostModalAction
  | HidePostModalAction
  | ShowPostCarouselAction
  | HidePostCarouselAction
  | loadPostsRequestAction
  | loadPostsSuccessAction
  | loadPostsFailureAction
  | removeUploadedImageAction
  | addPostRequestAction
  | addPostSuccessAction
  | addPostFailureAction
  | deletePostRequestAction
  | deletePostSuccessAction
  | deletePostFailureAction
  | uploadImagesRequestAction
  | uploadImagesSuccessAction
  | uploadImagesFailureAction
  | ShowDeleteModalAction
  | HideDeleteModalAction
  | executePostEditAction
  | cancelPostEditAction;
