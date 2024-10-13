export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const RESET_LOGIN_MESSAGE = 'RESET_LOGIN_MESSAGE' as const;

export const LOGIN_GOOGLE_REQUEST = 'LOGIN_GOOGLE_REQUEST' as const;
export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS' as const;
export const LOGIN_GOOGLE_FAILURE = 'LOGIN_GOOGLE_FAILURE' as const;

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST' as const;
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS' as const;
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE' as const;

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE' as const;

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE' as const;
export const RESET_SIGNUP_MESSAGE = 'RESET_SIGNUP_MESSAGE' as const;

export const EDIT_MY_INFO_REQUEST = 'EDIT_MY_INFO_REQUEST' as const;
export const EDIT_MY_INFO_SUCCESS = 'EDIT_MY_INFO_SUCCESS' as const;
export const EDIT_MY_INFO_FAILURE = 'EDIT_MY_INFO_FAILURE' as const;

export const EXECUTE_USER_EDIT = 'EXECUTE_USER_EDIT' as const;
export const USER_UPLOAD_IMAGE_REQUEST = 'USER_UPLOAD_IMAGE_REQUEST' as const;
export const USER_UPLOAD_IMAGE_SUCCESS = 'USER_UPLOAD_IMAGE_SUCCESS' as const;
export const USER_UPLOAD_IMAGE_FAILURE = 'USER_UPLOAD_IMAGE_FAILURE' as const;
export const USER_REMOVE_UPLOADED_IMAGE = 'USER_REMOVE_UPLOADED_IMAGE' as const;

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST' as const;
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS' as const;
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE' as const;

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST' as const;
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS' as const;
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE' as const;

export type UserState = {
  me: User | null;
  userImagePath: string[];
  loginLoading: boolean;
  loginDone: boolean;
  loginError: null | string;
  loginGoogleLoading: boolean;
  loginGoogleDone: boolean;
  loginGoogleError: null | string;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: null | string;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: null | string;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: null | string;
  signUpMessage: {
    message: string | null;
    type: 'success' | 'error' | null;
  };
  editMyInfoLoading: boolean;
  editMyInfoDone: boolean;
  editMyInfoError: null | string;
  userUploadImageLoading: boolean;
  userUploadImageDone: boolean;
  userUploadImageError: null | string;
  followUserLoading: boolean;
  followUserDone: boolean;
  followUserError: null | string;
  unFollowUserLoading: boolean;
  unFollowUserDone: boolean;
  unFollowUserError: null | string;
};

export interface ResponseMessage {
  message: string;
}

export interface AuthResponse {
  email: string;
  password: string;
  nickname?: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  desc?: string;
  createdAt: string;
  updatedAt: string;
  Posts: number[];
  Followings: { id: number }[];
  Followers: { id: number }[];
  ProfileImage: { id: number; src: string } | null;
}

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
  data: AuthResponse;
}

export interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  data: User;
}

export interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export interface loginGoogleRequestAction {
  type: typeof LOGIN_GOOGLE_REQUEST;
}

export interface loginGoogleSuccessAction {
  type: typeof LOGIN_GOOGLE_SUCCESS;
  data: User;
}

export interface loginGoogleFailureAction {
  type: typeof LOGIN_GOOGLE_FAILURE;
  error: string;
}

export interface loadMyInfoRequestAction {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface loadMyInfoSuccessAction {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: User;
}

export interface loadMyInfoFailureAction {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string;
}

export interface resetLoginMessageAction {
  type: typeof RESET_LOGIN_MESSAGE;
}

export interface logoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface logoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface logoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: string;
}

export interface signUpRequestAction {
  type: typeof SIGNUP_REQUEST;
  data: AuthResponse;
}

export interface signUpSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  data: string;
}

export interface signUpFailureAction {
  type: typeof SIGNUP_FAILURE;
  error: string;
}

export interface resetSignUpMessageAction {
  type: typeof RESET_SIGNUP_MESSAGE;
}

export interface executeUserEditAction {
  type: typeof EXECUTE_USER_EDIT;
}

export interface editMyInfoRequestAction {
  type: typeof EDIT_MY_INFO_REQUEST;
  data: FormData;
}

export interface editMyInfoSuccessAction {
  type: typeof EDIT_MY_INFO_SUCCESS;
  data: User;
}

export interface editMyInfoFailureAction {
  type: typeof EDIT_MY_INFO_FAILURE;
  error: string;
}

export interface userUploadImageRequestAction {
  type: typeof USER_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface userUploadImageSuccessAction {
  type: typeof USER_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface userUploadImageFailureAction {
  type: typeof USER_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface userRemoveUploadedImageAction {
  type: typeof USER_REMOVE_UPLOADED_IMAGE;
}

export interface followUserRequestAction {
  type: typeof FOLLOW_USER_REQUEST;
  data: number;
}

export interface followUserSuccessAction {
  type: typeof FOLLOW_USER_SUCCESS;
  data: number;
}

export interface followUserFailureAction {
  type: typeof FOLLOW_USER_FAILURE;
  error: string;
}

export interface unFollowUserRequestAction {
  type: typeof UNFOLLOW_USER_REQUEST;
  data: number;
}

export interface unFollowUserSuccessAction {
  type: typeof UNFOLLOW_USER_SUCCESS;
  data: number;
}

export interface unFollowUserFailureAction {
  type: typeof UNFOLLOW_USER_FAILURE;
  error: string;
}

export type UserAction =
  | loginRequestAction
  | loginSuccessAction
  | loginFailureAction
  | loginGoogleRequestAction
  | loginGoogleSuccessAction
  | loginGoogleFailureAction
  | loadMyInfoRequestAction
  | loadMyInfoSuccessAction
  | loadMyInfoFailureAction
  | logoutRequestAction
  | logoutSuccessAction
  | logoutFailureAction
  | resetLoginMessageAction
  | signUpRequestAction
  | signUpSuccessAction
  | signUpFailureAction
  | resetSignUpMessageAction
  | executeUserEditAction
  | editMyInfoRequestAction
  | editMyInfoSuccessAction
  | editMyInfoFailureAction
  | userUploadImageRequestAction
  | userUploadImageRequestAction
  | userUploadImageSuccessAction
  | userUploadImageFailureAction
  | userRemoveUploadedImageAction
  | followUserRequestAction
  | followUserSuccessAction
  | followUserFailureAction
  | unFollowUserRequestAction
  | unFollowUserSuccessAction
  | unFollowUserFailureAction;
