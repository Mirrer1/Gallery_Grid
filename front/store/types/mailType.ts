export const EMAIL_AUTH_REQUEST = 'EMAIL_AUTH_REQUEST' as const;
export const EMAIL_AUTH_SUCCESS = 'EMAIL_AUTH_SUCCESS' as const;
export const EMAIL_AUTH_FAILURE = 'EMAIL_AUTH_FAILURE' as const;

export const CHECK_CODE_REQUEST = 'CHECK_CODE_REQUEST' as const;
export const CHECK_CODE_SUCCESS = 'CHECK_CODE_SUCCESS' as const;
export const CHECK_CODE_FAILURE = 'CHECK_CODE_FAILURE' as const;

export const INITIALIZE_CHANGE_PASSWORD = 'INITIALIZE_CHANGE_PASSWORD' as const;
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST' as const;
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS' as const;
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE' as const;

export const INITIALIZE_CONTACT = 'INITIALIZE_CONTACT' as const;
export const CONTACT_REQUEST = 'CONTACT_REQUEST' as const;
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS' as const;
export const CONTACT_FAILURE = 'CONTACT_FAILURE' as const;

export type MailResponse = {
  success: boolean;
};

export type MailState = {
  checkCodeLoading: boolean;
  checkCodeDone: boolean;
  checkCodeError: null | string;
  emailAuthLoading: boolean;
  emailAuthDone: boolean;
  emailAuthError: null | string;
  changePasswordLoading: boolean;
  changePasswordDone: boolean;
  changePasswordError: null | string;
  contactLoading: boolean;
  contactDone: boolean;
  contactError: null | string;
};

export interface emailAuthRequestAction {
  type: typeof EMAIL_AUTH_REQUEST;
  email: string;
}

export interface emailAuthSuccessAction {
  type: typeof EMAIL_AUTH_SUCCESS;
  data: MailResponse;
}

export interface emailAuthFailureAction {
  type: typeof EMAIL_AUTH_FAILURE;
  error: string;
}

export interface checkCodeRequestAction {
  type: typeof CHECK_CODE_REQUEST;
  email: string;
  code: string;
}

export interface checkCodeSuccessAction {
  type: typeof CHECK_CODE_SUCCESS;
  data: MailResponse;
}

export interface checkCodeFailureAction {
  type: typeof CHECK_CODE_FAILURE;
  error: string;
}

export interface initializeChangePasswordAction {
  type: typeof INITIALIZE_CHANGE_PASSWORD;
}

export interface changePasswordRequestAction {
  type: typeof CHANGE_PASSWORD_REQUEST;
  email: string;
  password: string;
}

export interface changePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  data: MailResponse;
}

export interface changePasswordFailureAction {
  type: typeof CHANGE_PASSWORD_FAILURE;
  error: string;
}

export interface initializeContactAction {
  type: typeof INITIALIZE_CONTACT;
}

export interface contactRequestAction {
  type: typeof CONTACT_REQUEST;
  sender: string;
  content: string;
}

export interface contactSuccessAction {
  type: typeof CONTACT_SUCCESS;
  data: MailResponse;
}

export interface contactFailureAction {
  type: typeof CONTACT_FAILURE;
  error: string;
}

export type MailAction =
  | emailAuthRequestAction
  | emailAuthSuccessAction
  | emailAuthFailureAction
  | checkCodeRequestAction
  | checkCodeSuccessAction
  | checkCodeFailureAction
  | initializeChangePasswordAction
  | changePasswordRequestAction
  | changePasswordSuccessAction
  | changePasswordFailureAction
  | initializeContactAction
  | contactRequestAction
  | contactSuccessAction
  | contactFailureAction;
