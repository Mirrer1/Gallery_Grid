export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;

export type UserState = {
  me: any;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: null | string;
};

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

export interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: any;
}

export type UserAction = loginRequestAction | loginSuccessAction | loginFailureAction;
