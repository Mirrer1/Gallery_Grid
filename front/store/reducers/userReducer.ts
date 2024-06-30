import { produce } from 'immer';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UserAction,
  UserState
} from 'store/types/userType';

export const initialState: UserState = {
  me: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  signUpMessage: { type: null, message: null }
};

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
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGNUP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.signUpMessage = { type: 'success', message: action.data };
        break;
      case SIGNUP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        draft.signUpMessage = { type: 'error', message: action.error };
        break;
      case RESET_SIGNUP_MESSAGE:
        draft.signUpMessage = { type: null, message: null };
        break;
      default:
        return state;
    }
  });
};

export default reducer;
