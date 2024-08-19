import { User } from './userType';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST' as const;
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS' as const;
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE' as const;

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST' as const;
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS' as const;
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE' as const;

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST' as const;
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS' as const;
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE' as const;

export const POST_UPLOAD_IMAGES_REQUEST = 'POST_UPLOAD_IMAGES_REQUEST' as const;
export const POST_UPLOAD_IMAGES_SUCCESS = 'POST_UPLOAD_IMAGES_SUCCESS' as const;
export const POST_UPLOAD_IMAGES_FAILURE = 'POST_UPLOAD_IMAGES_FAILURE' as const;
export const POST_REMOVE_UPLOADED_IMAGE = 'POST_REMOVE_UPLOADED_IMAGE' as const;

export const EDIT_POST_UPLOAD_IMAGES_REQUEST = 'EDIT_POST_UPLOAD_IMAGES_REQUEST' as const;
export const EDIT_POST_UPLOAD_IMAGES_SUCCESS = 'EDIT_POST_UPLOAD_IMAGES_SUCCESS' as const;
export const EDIT_POST_UPLOAD_IMAGES_FAILURE = 'EDIT_POST_UPLOAD_IMAGES_FAILURE' as const;
export const EDIT_POST_REMOVE_UPLOADED_IMAGE = 'EDIT_POST_REMOVE_UPLOADED_IMAGE' as const;

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST' as const;
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS' as const;
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE' as const;

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' as const;
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' as const;
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' as const;

export const COMMENT_UPLOAD_IMAGE_REQUEST = 'COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const COMMENT_UPLOAD_IMAGE_SUCCESS = 'COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const COMMENT_UPLOAD_IMAGE_FAILURE = 'COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const COMMENT_REMOVE_UPLOADED_IMAGE = 'COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST' as const;
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS' as const;
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE' as const;

export const EXECUTE_COMMENT_EDIT = 'EXECUTE_COMMENT_EDIT' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_REQUEST = 'EDIT_COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS = 'EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_FAILURE = 'EDIT_COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const EDIT_COMMENT_REMOVE_UPLOADED_IMAGE = 'EDIT_COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const MODAL_COMMENT_UPLOAD_IMAGE_REQUEST = 'MODAL_COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS = 'MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const MODAL_COMMENT_UPLOAD_IMAGE_FAILURE = 'MODAL_COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const MODAL_COMMENT_REMOVE_UPLOADED_IMAGE = 'MODAL_COMMENT_REMOVE_UPLOADED_IMAGE' as const;

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

export interface Image {
  id: number;
  src: string;
}

export interface ResponseComment {
  comment: Comment | IReplyComment;
  parentId?: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  parentId: number | null;
  User: User;
  Post: { UserId: number };
  CommentImage: Image | null;
  Replies: IReplyComment[];
}

export interface IReplyComment extends Comment {
  CommentId: number;
  ReplyImage?: Image | null;
}

export interface PostComment {
  id: number;
  Replies: { id: number }[];
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
  Comments: PostComment[];
}

export type PostState = {
  mainPosts: Post[];
  singlePost: Post | null;
  postImagePaths: string[];
  editPostImagePaths: string[];
  commentImagePath: string[];
  editCommentImagePath: string[];
  modalCommentImagePath: string[];
  postEditMode: boolean;
  deleteId: number | null;
  mainComments: Comment[] | null;
  lastChangedCommentId: number | null;
  commentVisiblePostId: number | null;
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | string;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: null | string;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deletePostError: null | string;
  postUploadImagesLoading: boolean;
  postUploadImagesDone: boolean;
  postUploadImagesError: null | string;
  editPostUploadImagesLoading: boolean;
  editPostUploadImagesDone: boolean;
  editPostUploadImagesError: null | string;
  loadCommentsLoading: boolean;
  loadCommentsDone: boolean;
  loadCommentsError: null | string;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: null | string;
  commentUploadImageLoading: boolean;
  commentUploadImageDone: boolean;
  commentUploadImageError: null | string;
  editCommentLoading: boolean;
  editCommentDone: boolean;
  editCommentError: null | string;
  editCommentUploadImageLoading: boolean;
  editCommentUploadImageDone: boolean;
  editCommentUploadImageError: null | string;
  modalCommentUploadImageLoading: boolean;
  modalCommentUploadImageDone: boolean;
  modalCommentUploadImageError: null | string;
  isCommentListVisible: boolean;
  isCarouselVisible: boolean;
  isPostModalVisible: boolean;
  isDeleteModalVisible: boolean;
};

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

export interface editPostRequestAction {
  type: typeof EDIT_POST_REQUEST;
  data: FormData;
}

export interface editPostSuccessAction {
  type: typeof EDIT_POST_SUCCESS;
  data: Post;
}

export interface editPostFailureAction {
  type: typeof EDIT_POST_FAILURE;
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

export interface postUploadImagesRequestAction {
  type: typeof POST_UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface postUploadImagesSuccessAction {
  type: typeof POST_UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface postUploadImagesFailureAction {
  type: typeof POST_UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface postRemoveUploadedImageAction {
  type: typeof POST_REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface editPostUploadImagesRequestAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface editPostUploadImagesSuccessAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface editPostUploadImagesFailureAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface editPostRemoveUploadedImageAction {
  type: typeof EDIT_POST_REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface loadCommentsRequestAction {
  type: typeof LOAD_COMMENTS_REQUEST;
  data: number;
}

export interface loadCommentsSuccessAction {
  type: typeof LOAD_COMMENTS_SUCCESS;
  data: Comment[];
}

export interface loadCommentsFailureAction {
  type: typeof LOAD_COMMENTS_FAILURE;
  error: string;
}

export interface addCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST;
  data: FormData;
}

export interface addCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface addCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE;
  error: string;
}

export interface commentUploadImageRequestAction {
  type: typeof COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface commentUploadImageSuccessAction {
  type: typeof COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface commentUploadImageFailureAction {
  type: typeof COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface commentRemoveUploadedImageAction {
  type: typeof COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface editCommentRequestAction {
  type: typeof EDIT_COMMENT_REQUEST;
  data: FormData;
}

export interface editCommentSuccessAction {
  type: typeof EDIT_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface editCommentFailureAction {
  type: typeof EDIT_COMMENT_FAILURE;
  error: string;
}

export interface editCommentUploadImageRequestAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface editCommentUploadImageSuccessAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface editCommentUploadImageFailureAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface editCommentRemoveUploadedImageAction {
  type: typeof EDIT_COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface modalCommentUploadImageRequestAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface modalCommentUploadImageSuccessAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface modalCommentUploadImageFailureAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface modalCommentRemoveUploadedImageAction {
  type: typeof MODAL_COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface ShowCommentListAction {
  type: typeof SHOW_COMMENT_LIST;
  data: number;
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

export interface executeCommentEditAction {
  type: typeof EXECUTE_COMMENT_EDIT;
  data: string;
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
  | addPostRequestAction
  | addPostSuccessAction
  | addPostFailureAction
  | editPostRequestAction
  | editPostSuccessAction
  | editPostFailureAction
  | deletePostRequestAction
  | deletePostSuccessAction
  | deletePostFailureAction
  | postUploadImagesRequestAction
  | postUploadImagesSuccessAction
  | postUploadImagesFailureAction
  | postRemoveUploadedImageAction
  | editPostUploadImagesRequestAction
  | editPostUploadImagesSuccessAction
  | editPostUploadImagesFailureAction
  | editPostRemoveUploadedImageAction
  | loadCommentsRequestAction
  | loadCommentsSuccessAction
  | loadCommentsFailureAction
  | addCommentRequestAction
  | addCommentSuccessAction
  | addCommentFailureAction
  | commentUploadImageRequestAction
  | commentUploadImageSuccessAction
  | commentUploadImageFailureAction
  | commentRemoveUploadedImageAction
  | modalCommentUploadImageRequestAction
  | modalCommentUploadImageSuccessAction
  | modalCommentUploadImageFailureAction
  | modalCommentRemoveUploadedImageAction
  | editCommentRequestAction
  | editCommentSuccessAction
  | editCommentFailureAction
  | editCommentUploadImageRequestAction
  | editCommentUploadImageSuccessAction
  | editCommentUploadImageFailureAction
  | editCommentRemoveUploadedImageAction
  | ShowDeleteModalAction
  | HideDeleteModalAction
  | executePostEditAction
  | cancelPostEditAction
  | executeCommentEditAction;
