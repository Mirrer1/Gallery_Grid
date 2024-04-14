import {
  PostAction,
  PostState,
  SHOW_COMMENT_LIST,
  HIDE_COMMENT_LIST,
  SHOW_POST_MODAL,
  HIDE_POST_MODAL
} from 'store/types/postType';

export const initialState: PostState = {
  isCommentListVisible: false,
  isPostModalVisible: false
};

const reducer = (state: PostState = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case SHOW_COMMENT_LIST:
      return {
        ...state,
        isCommentListVisible: true
      };
    case HIDE_COMMENT_LIST:
      return {
        ...state,
        isCommentListVisible: false
      };
    case SHOW_POST_MODAL:
      return {
        ...state,
        isPostModalVisible: true
      };
    case HIDE_POST_MODAL:
      return {
        ...state,
        isPostModalVisible: false,
        isCommentListVisible: false
      };
    default:
      return state;
  }
};

export default reducer;
