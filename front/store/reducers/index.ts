import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from 'store/reducers/userReducer';
import post from 'store/reducers/postReducer';

// // 이 타입을 state의 any로 대체
// interface RootState {
//   user: UserState;
//   post: PostState;
//   // 다른 상태들...
// }

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
