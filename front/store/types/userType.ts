export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE' as const;
export const RESET_SIGNUP_MESSAGE = 'RESET_SIGNUP_MESSAGE' as const;

export type UserState = {
  me: any;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: null | string;
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

export interface AuthData {
  email: string;
  password: string;
  nickname?: string;
}

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
  data: AuthData;
}

export interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  data: string;
}

export interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export interface signUpRequestAction {
  type: typeof SIGNUP_REQUEST;
  data: AuthData;
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
  | signUpRequestAction
  | signUpSuccessAction
  | signUpFailureAction
  | resetSignUpMessageAction;
