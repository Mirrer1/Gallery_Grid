export const INITIALIZE_CONTACT = 'INITIALIZE_CONTACT' as const;
export const CONTACT_REQUEST = 'CONTACT_REQUEST' as const;
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS' as const;
export const CONTACT_FAILURE = 'CONTACT_FAILURE' as const;

export type MailResponse = {
  success: boolean;
};

export type MailState = {
  contactLoading: boolean;
  contactDone: boolean;
  contactError: null | string;
};

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

export type MailAction = initializeContactAction | contactRequestAction | contactSuccessAction | contactFailureAction;
