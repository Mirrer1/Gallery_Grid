import {
  CHANGE_PASSWORD_REQUEST,
  CHECK_CODE_REQUEST,
  CONTACT_REQUEST,
  EMAIL_AUTH_REQUEST,
  INITIALIZE_CHANGE_PASSWORD,
  INITIALIZE_CONTACT
} from 'store/types/mailType';

export const emailAuthRequest = (selectMenu: 'signup' | 'recovery', email: string) => ({
  type: EMAIL_AUTH_REQUEST,
  selectMenu,
  email
});

export const checkCodeRequest = (email: string, code: string) => ({
  type: CHECK_CODE_REQUEST,
  email,
  code
});

export const initializeChangePassword = () => ({
  type: INITIALIZE_CHANGE_PASSWORD
});

export const changePasswordRequest = (email: string, password: string) => ({
  type: CHANGE_PASSWORD_REQUEST,
  email,
  password
});

export const initializeContact = () => ({
  type: INITIALIZE_CONTACT
});

export const contactRequest = (sender: string, content: string) => ({
  type: CONTACT_REQUEST,
  sender,
  content
});
