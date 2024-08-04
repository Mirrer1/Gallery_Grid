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
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_UPLOADED_IMAGE,
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
  imagePaths: [],
  editImagePaths: [],
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
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
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
        draft.imagePaths = [];
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
        draft.imagePaths = [];
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
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        const combinedImages = [...draft.imagePaths, ...action.data];
        draft.imagePaths = combinedImages.slice(0, 5);
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case REMOVE_UPLOADED_IMAGE:
        draft.imagePaths = draft.imagePaths.filter(path => path !== action.data);
        break;
      case SHOW_COMMENT_LIST:
        draft.isCommentListVisible = true;
        break;
      case HIDE_COMMENT_LIST:
        draft.isCommentListVisible = false;
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
        draft.imagePaths = [];
        break;
      case EXECUTE_POST_EDIT:
        draft.postEditMode = true;
        draft.imagePaths = draft.singlePost?.Images?.map(v => v.src) || [];
        break;
      case CANCEL_POST_EDIT:
        draft.postEditMode = false;
        draft.imagePaths = [];
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
