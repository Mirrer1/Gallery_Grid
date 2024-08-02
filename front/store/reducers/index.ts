import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';

import user from 'store/reducers/userReducer';
import post from 'store/reducers/postReducer';
import { UserState } from 'store/types/userType';
import { PostState } from 'store/types/postType';

type AppState = {
  user: UserState;
  post: PostState;
};

const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
