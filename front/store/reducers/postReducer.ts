import { produce } from 'immer';

import {
  PostAction,
  PostState,
  SHOW_COMMENT_LIST,
  HIDE_COMMENT_LIST,
  SHOW_POST_MODAL,
  HIDE_POST_MODAL,
  SHOW_POST_CAROUSEL,
  HIDE_POST_CAROUSEL,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  POST_UPLOAD_IMAGES_REQUEST,
  POST_UPLOAD_IMAGES_SUCCESS,
  POST_UPLOAD_IMAGES_FAILURE,
  POST_REMOVE_UPLOADED_IMAGE,
  EDIT_POST_UPLOAD_IMAGES_REQUEST,
  EDIT_POST_UPLOAD_IMAGES_SUCCESS,
  EDIT_POST_UPLOAD_IMAGES_FAILURE,
  EDIT_POST_REMOVE_UPLOADED_IMAGE,
  COMMENT_UPLOAD_IMAGE_REQUEST,
  COMMENT_UPLOAD_IMAGE_SUCCESS,
  COMMENT_UPLOAD_IMAGE_FAILURE,
  COMMENT_REMOVE_UPLOADED_IMAGE,
  MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
  MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
  MODAL_COMMENT_REMOVE_UPLOADED_IMAGE,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  EXECUTE_POST_EDIT,
  CANCEL_POST_EDIT,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE
} from 'store/types/postType';

export const initialState: PostState = {
  mainPosts: [],
  singlePost: null,
  postImagePaths: [],
  editPostImagePaths: [],
  commentImagePath: [],
  modalCommentImagePath: [],
  postEditMode: false,
  deleteId: null,
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  postUploadImagesLoading: false,
  postUploadImagesDone: false,
  postUploadImagesError: null,
  editPostUploadImagesLoading: false,
  editPostUploadImagesDone: false,
  editPostUploadImagesError: null,
  commentUploadImageLoading: false,
  commentUploadImageDone: false,
  commentUploadImageError: null,
  modalCommentUploadImageLoading: false,
  modalCommentUploadImageDone: false,
  modalCommentUploadImageError: null,
  isCommentListVisible: false,
  isCarouselVisible: false,
  isPostModalVisible: false,
  isDeleteModalVisible: false
};

const reducer = (state: PostState = initialState, action: PostAction): PostState => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.postImagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS:
        draft.editPostLoading = false;
        draft.editPostDone = true;
        draft.postEditMode = false;
        draft.singlePost = action.data;
        const postIndex = draft.mainPosts.findIndex(post => post.id === action.data.id);
        if (postIndex !== -1) draft.mainPosts[postIndex] = action.data;
        break;
      case EDIT_POST_FAILURE:
        draft.editPostLoading = false;
        draft.editPostError = action.error;
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        const index = draft.mainPosts.findIndex(post => post.id === action.data);
        if (index !== -1) draft.mainPosts.splice(index, 1);
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
        break;
      case POST_UPLOAD_IMAGES_REQUEST:
        draft.postUploadImagesLoading = true;
        draft.postUploadImagesDone = false;
        draft.postUploadImagesError = null;
        break;
      case POST_UPLOAD_IMAGES_SUCCESS:
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesDone = true;
        const combinedImages = [...draft.postImagePaths, ...action.data];
        draft.postImagePaths = combinedImages.slice(0, 5);
        break;
      case POST_UPLOAD_IMAGES_FAILURE:
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesError = action.error;
        break;
      case POST_REMOVE_UPLOADED_IMAGE:
        draft.postImagePaths = draft.postImagePaths.filter(path => path !== action.data);
        break;
      case EDIT_POST_UPLOAD_IMAGES_REQUEST:
        draft.editPostUploadImagesLoading = true;
        draft.editPostUploadImagesDone = false;
        draft.editPostUploadImagesError = null;
        break;
      case EDIT_POST_UPLOAD_IMAGES_SUCCESS:
        draft.editPostUploadImagesLoading = false;
        draft.editPostUploadImagesDone = true;
        const combinedEditImages = [...draft.editPostImagePaths, ...action.data];
        draft.editPostImagePaths = combinedEditImages.slice(0, 5);
        break;
      case EDIT_POST_UPLOAD_IMAGES_FAILURE:
        draft.editPostUploadImagesLoading = false;
        draft.editPostUploadImagesError = action.error;
        break;
      case EDIT_POST_REMOVE_UPLOADED_IMAGE:
        draft.editPostImagePaths = draft.editPostImagePaths.filter(path => path !== action.data);
        break;
      case COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.commentUploadImageLoading = true;
        draft.commentUploadImageDone = false;
        draft.commentUploadImageError = null;
        break;
      case COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.commentUploadImageLoading = false;
        draft.commentUploadImageDone = true;
        draft.commentImagePath = action.data;
        break;
      case COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.commentUploadImageLoading = false;
        draft.commentUploadImageError = action.error;
        break;
      case COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.commentImagePath = [];
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.modalCommentUploadImageLoading = true;
        draft.modalCommentUploadImageDone = false;
        draft.modalCommentUploadImageError = null;
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.modalCommentUploadImageLoading = false;
        draft.modalCommentUploadImageDone = true;
        draft.modalCommentImagePath = action.data;
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.modalCommentUploadImageLoading = false;
        draft.modalCommentUploadImageError = action.error;
        break;
      case MODAL_COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.modalCommentImagePath = [];
        break;
      case SHOW_COMMENT_LIST:
        draft.isCommentListVisible = true;
        break;
      case HIDE_COMMENT_LIST:
        draft.isCommentListVisible = false;
        draft.commentImagePath = [];
        break;
      case SHOW_POST_CAROUSEL:
        draft.isCarouselVisible = true;
        break;
      case HIDE_POST_CAROUSEL:
        draft.isCarouselVisible = false;
        break;
      case SHOW_POST_MODAL:
        draft.isPostModalVisible = true;
        draft.singlePost = action.data;
        break;
      case HIDE_POST_MODAL:
        draft.isPostModalVisible = false;
        draft.postEditMode = false;
        draft.singlePost = null;
        draft.modalCommentImagePath = [];
        break;
      case EXECUTE_POST_EDIT:
        draft.postEditMode = true;
        draft.editPostImagePaths = draft.singlePost?.Images?.map(v => v.src) || [];
        break;
      case CANCEL_POST_EDIT:
        draft.postEditMode = false;
        break;
      case SHOW_DELETE_MODAL:
        draft.isDeleteModalVisible = true;
        draft.deleteId = action.data;
        break;
      case HIDE_DELETE_MODAL:
        draft.isDeleteModalVisible = false;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
