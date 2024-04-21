import {
  PostAction,
  PostState,
  SHOW_COMMENT_LIST,
  HIDE_COMMENT_LIST,
  SHOW_POST_MODAL,
  HIDE_POST_MODAL,
  SHOW_POST_CAROUSEL,
  HIDE_POST_CAROUSEL
} from 'store/types/postType';

export const initialState: PostState = {
  isCommentListVisible: false,
  isPostModalVisible: false,
  isCarouselVisible: false
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
    case SHOW_POST_CAROUSEL:
      return {
        ...state,
        isCarouselVisible: true
      };
    case HIDE_POST_CAROUSEL:
      return {
        ...state,
        isCarouselVisible: false
      };
    default:
      return state;
  }
};

export default reducer;
