import { produce } from 'immer';

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, UserAction, UserState } from 'store/types/userType';

export const initialState: UserState = {
  me: null,
  loginLoading: false,
  loginDone: false,
  loginError: null
};

const dummyUser = (data: any) => ({
  ...data,
  id: 1,
  nickname: 'mirrer'
});

const reducer = (state: UserState = initialState, action: UserAction): UserState => {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
