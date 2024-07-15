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

export type UserState = {
  me: any;
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
  Followings: number[];
  Followers: number[];
  ProfileImage: { id: number; src: string } | null;
}

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
  data: AuthResponse;
}

export interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  data: string;
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
  data: string;
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
  data: string;
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
  | resetSignUpMessageAction;
