import {
  HIDE_COMMENT_LIST,
  HIDE_POST_CAROUSEL,
  HIDE_POST_MODAL,
  ADD_POST_REQUEST,
  SHOW_COMMENT_LIST,
  SHOW_POST_CAROUSEL,
  SHOW_POST_MODAL,
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
  EDIT_POST_REMOVE_UPLOADED_IMAGE,
  COMMENT_UPLOAD_IMAGE_REQUEST,
  COMMENT_REMOVE_UPLOADED_IMAGE,
  MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  MODAL_COMMENT_REMOVE_UPLOADED_IMAGE,
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  EXECUTE_COMMENT_EDIT,
  EDIT_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_COMMENT_REMOVE_UPLOADED_IMAGE,
  EDIT_COMMENT_REQUEST,
  DeleteInfo,
  DELETE_COMMENT_REQUEST,
  LOAD_MODAL_COMMENTS_REQUEST,
  ADD_MODAL_COMMENT_REQUEST,
  SHOW_MODAL_COMMENT_LIST,
  HIDE_MODAL_COMMENT_LIST,
  DELETE_MODAL_COMMENT_REQUEST,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE,
  EXECUTE_MODAL_COMMENT_EDIT,
  EDIT_MODAL_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LOAD_NEW_POSTS_REQUEST,
  LOAD_MY_INTERACTIONS_POSTS_REQUEST,
  DELETE_MY_INTERACTIONS_POSTS_REQUEST,
  LOAD_MY_ACTIVITY_POSTS_REQUEST,
  SET_ACTIVITY_FOCUSED_COMMENT_ID,
  LOAD_MY_ACTIVITY_COUNTS_REQUEST,
  READ_ACTIVITY_REQUEST,
  INITIALIZE_POST_LIST,
  LOAD_BEST_POSTS_REQUEST,
  LOAD_FOLLOWING_POSTS_REQUEST,
  DELETE_FOLLOWING_USER_POSTS,
  LOAD_USER_POSTS_REQUEST
} from 'store/types/postType';

export const initializePostList = () => ({
  type: INITIALIZE_POST_LIST
});

export const loadNewPostsRequest = (lastId?: number) => ({
  type: LOAD_NEW_POSTS_REQUEST,
  lastId
});

export const loadBestPostsRequest = (lastId?: number, lastLikeCount?: number, lastCommentCount?: number) => ({
  type: LOAD_BEST_POSTS_REQUEST,
  lastId,
  lastLikeCount,
  lastCommentCount
});

export const loadFollowingPostsRequest = (lastCreatedAt?: string, limit: number = 10) => ({
  type: LOAD_FOLLOWING_POSTS_REQUEST,
  lastCreatedAt,
  limit
});

export const loadUserPostsRequest = (userId: number, lastId?: number) => ({
  type: LOAD_USER_POSTS_REQUEST,
  userId,
  lastId
});

export const deleteFollowingUserPostsRequest = (data: number) => ({
  type: DELETE_FOLLOWING_USER_POSTS,
  data
});

export const loadMyActivityCountsRequest = () => ({
  type: LOAD_MY_ACTIVITY_COUNTS_REQUEST
});

export const loadMyActivityPostsRequest = (lastId?: number) => ({
  type: LOAD_MY_ACTIVITY_POSTS_REQUEST,
  lastId
});

export const readActivityRequest = (targetId: 'all' | number) => ({
  type: READ_ACTIVITY_REQUEST,
  targetId
});

export const loadMyInteractionsPostsRequest = (menu: 'all' | 'like' | 'comment', sortBy: 'best' | 'new') => ({
  type: LOAD_MY_INTERACTIONS_POSTS_REQUEST,
  menu,
  sortBy
});

export const deleteMyInteractionsPostsRequest = (menu: 'all' | 'like' | 'comment', id: number[]) => ({
  type: DELETE_MY_INTERACTIONS_POSTS_REQUEST,
  menu,
  id
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

export const loadCommentsRequest = (data: number) => ({
  type: LOAD_COMMENTS_REQUEST,
  data
});

export const addCommentRequest = (data: FormData) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

export const commentUploadImageRequest = (data: FormData) => ({
  type: COMMENT_UPLOAD_IMAGE_REQUEST,
  data
});

export const commentRemoveUploadedImage = () => ({
  type: COMMENT_REMOVE_UPLOADED_IMAGE
});

export const editCommentRequest = (data: FormData) => ({
  type: EDIT_COMMENT_REQUEST,
  data
});

export const editCommentUploadImageRequest = (data: FormData) => ({
  type: EDIT_COMMENT_UPLOAD_IMAGE_REQUEST,
  data
});

export const editCommentRemoveUploadedImage = () => ({
  type: EDIT_COMMENT_REMOVE_UPLOADED_IMAGE
});

export const deleteCommentRequest = (data: DeleteInfo) => ({
  type: DELETE_COMMENT_REQUEST,
  data
});

export const loadModalCommentsRequest = (data: number) => ({
  type: LOAD_MODAL_COMMENTS_REQUEST,
  data
});

export const addModalCommentRequest = (data: FormData) => ({
  type: ADD_MODAL_COMMENT_REQUEST,
  data
});

export const modalCommentUploadImageRequest = (data: FormData) => ({
  type: MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  data
});

export const modalCommentRemoveUploadedImage = () => ({
  type: MODAL_COMMENT_REMOVE_UPLOADED_IMAGE
});

export const editModalCommentUploadImageRequest = (data: FormData) => ({
  type: EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  data
});

export const editModalCommentRequest = (data: FormData) => ({
  type: EDIT_MODAL_COMMENT_REQUEST,
  data
});

export const editModalCommentRemoveUploadedImage = () => ({
  type: EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE
});

export const deleteModalCommentRequest = (data: DeleteInfo) => ({
  type: DELETE_MODAL_COMMENT_REQUEST,
  data
});

export const likePostRequest = (data: number) => ({
  type: LIKE_POST_REQUEST,
  data
});

export const unLikePostRequest = (data: number) => ({
  type: UNLIKE_POST_REQUEST,
  data
});

export const showCommentList = (data: number) => ({
  type: SHOW_COMMENT_LIST,
  data
});

export const hideCommentList = () => ({
  type: HIDE_COMMENT_LIST
});

export const showModalCommentList = () => ({
  type: SHOW_MODAL_COMMENT_LIST
});

export const hideModalCommentList = () => ({
  type: HIDE_MODAL_COMMENT_LIST
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

export const showDeleteModal = (data: DeleteInfo) => ({
  type: SHOW_DELETE_MODAL,
  data
});

export const hideDeleteModal = () => ({
  type: HIDE_DELETE_MODAL
});

export const executeCommentEdit = (data: string) => ({
  type: EXECUTE_COMMENT_EDIT,
  data
});

export const executeModalCommentEdit = (data: string) => ({
  type: EXECUTE_MODAL_COMMENT_EDIT,
  data
});

export const setActivityFocusedCommentId = (data: number) => ({
  type: SET_ACTIVITY_FOCUSED_COMMENT_ID,
  data
});
