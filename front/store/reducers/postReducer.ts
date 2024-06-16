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
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE
} from 'store/types/postType';

export const initialState: PostState = {
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  isCommentListVisible: false,
  isPostModalVisible: false,
  isCarouselVisible: false
};

const reducer = (state: PostState = initialState, action: PostAction): PostState => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        // mainPosts: action.data
        draft.mainPosts = ['hello', 'world'];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case SHOW_COMMENT_LIST:
        draft.isCommentListVisible = true;
        break;
      case HIDE_COMMENT_LIST:
        draft.isCommentListVisible = false;
        break;
      case SHOW_POST_MODAL:
        draft.isPostModalVisible = true;
        break;
      case HIDE_POST_MODAL:
        draft.isPostModalVisible = false;
        draft.isCommentListVisible = false;
        break;
      case SHOW_POST_CAROUSEL:
        draft.isCarouselVisible = true;
        break;
      case HIDE_POST_CAROUSEL:
        draft.isCarouselVisible = false;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
