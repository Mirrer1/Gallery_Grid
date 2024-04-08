import { HIDE_COMMENT_LIST, PostAction, PostState, SHOW_COMMENT_LIST } from 'store/types/postType';

export const initialState: PostState = {
  isCommentListVisible: false
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
    default:
      return state;
  }
};

export default reducer;
