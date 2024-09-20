import { produce } from 'immer';

import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_GOOGLE_FAILURE,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESET_LOGIN_MESSAGE,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REMOVE_UPLOADED_IMAGE,
  EDIT_MY_INFO_FAILURE,
  EDIT_MY_INFO_REQUEST,
  EDIT_MY_INFO_SUCCESS,
  USER_UPLOAD_IMAGE_FAILURE,
  USER_UPLOAD_IMAGE_REQUEST,
  USER_UPLOAD_IMAGE_SUCCESS,
  UserAction,
  UserState,
  EXECUTE_USER_EDIT,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS
} from 'store/types/userType';

export const initialState: UserState = {
  me: null,
  userImagePath: [],
  loginLoading: false,
  loginDone: false,
  loginError: null,
  loginGoogleLoading: false,
  loginGoogleDone: false,
  loginGoogleError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  signUpMessage: { type: null, message: null },
  editMyInfoLoading: false,
  editMyInfoDone: false,
  editMyInfoError: null,
  userUploadImageLoading: false,
  userUploadImageDone: false,
  userUploadImageError: null,
  followUserLoading: false,
  followUserDone: false,
  followUserError: null,
  unFollowUserLoading: false,
  unFollowUserDone: false,
  unFollowUserError: null
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
        draft.me = action.data;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      case LOGIN_GOOGLE_REQUEST:
        draft.loginGoogleLoading = true;
        draft.loginGoogleDone = false;
        draft.loginGoogleError = null;
        break;
      case LOGIN_GOOGLE_SUCCESS:
        draft.loginGoogleLoading = false;
        draft.loginGoogleDone = true;
        break;
      case LOGIN_GOOGLE_FAILURE:
        draft.loginGoogleLoading = false;
        draft.loginGoogleError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case RESET_LOGIN_MESSAGE:
        draft.loginError = null;
        break;
      case LOGOUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOGOUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        break;
      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
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
      case EXECUTE_USER_EDIT:
        if (draft.me?.ProfileImage) draft.userImagePath = [draft.me.ProfileImage.src];
        else draft.userImagePath = [];
        break;
      case EDIT_MY_INFO_REQUEST:
        draft.editMyInfoLoading = true;
        draft.editMyInfoDone = false;
        draft.editMyInfoError = null;
        break;
      case EDIT_MY_INFO_SUCCESS:
        draft.editMyInfoLoading = false;
        draft.editMyInfoDone = true;
        draft.me = action.data;
        if (draft.me?.ProfileImage) draft.userImagePath = [draft.me.ProfileImage.src];
        else draft.userImagePath = [];
        break;
      case EDIT_MY_INFO_FAILURE:
        draft.editMyInfoLoading = false;
        draft.editMyInfoError = action.error;
        break;
      case USER_UPLOAD_IMAGE_REQUEST:
        draft.userUploadImageLoading = true;
        draft.userUploadImageDone = false;
        draft.userUploadImageError = null;
        break;
      case USER_UPLOAD_IMAGE_SUCCESS:
        draft.userUploadImageLoading = false;
        draft.userUploadImageDone = true;
        draft.userImagePath = action.data;
        break;
      case USER_UPLOAD_IMAGE_FAILURE:
        draft.userUploadImageLoading = false;
        draft.userUploadImageError = action.error;
        break;
      case USER_REMOVE_UPLOADED_IMAGE:
        draft.userImagePath = [];
        break;
      case FOLLOW_USER_REQUEST:
        draft.followUserLoading = true;
        draft.followUserDone = false;
        draft.followUserError = null;
        break;
      case FOLLOW_USER_SUCCESS:
        draft.followUserLoading = false;
        draft.followUserDone = true;
        if (draft.me) draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_USER_FAILURE:
        draft.followUserLoading = false;
        draft.followUserError = action.error;
        break;
      case UNFOLLOW_USER_REQUEST:
        draft.unFollowUserLoading = true;
        draft.unFollowUserDone = false;
        draft.unFollowUserError = null;
        break;
      case UNFOLLOW_USER_SUCCESS:
        draft.unFollowUserLoading = false;
        draft.unFollowUserDone = true;
        if (draft.me) draft.me.Followings = draft.me.Followings.filter(following => following.id !== action.data);
        break;
      case UNFOLLOW_USER_FAILURE:
        draft.unFollowUserLoading = false;
        draft.unFollowUserError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
