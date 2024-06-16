import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from 'store/reducers/userReducer';
import post from 'store/reducers/postReducer';

const rootReducer = combineReducers({
  index: (state: any = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
