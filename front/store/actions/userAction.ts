import {
  LOGIN_REQUEST,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_REQUEST,
  AuthResponse,
  RESET_LOGIN_MESSAGE,
  LOGOUT_REQUEST,
  LOGIN_GOOGLE_REQUEST,
  LOAD_MY_INFO_REQUEST
} from 'store/types/userType';

export const loginRequest = (data: AuthResponse) => ({
  type: LOGIN_REQUEST,
  data
});

export const loginGoogleRequest = () => ({
  type: LOGIN_GOOGLE_REQUEST
});

export const loadMyInfoRequest = () => ({
  type: LOAD_MY_INFO_REQUEST
});

export const resetLoginMessage = () => ({
  type: RESET_LOGIN_MESSAGE
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const signUpRequest = (data: AuthResponse) => ({
  type: SIGNUP_REQUEST,
  data
});

export const resetSignUpMessage = () => ({
  type: RESET_SIGNUP_MESSAGE
});
