import {
  LOGIN_REQUEST,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_REQUEST,
  AuthData,
  RESET_LOGIN_MESSAGE,
  LOGOUT_REQUEST
} from 'store/types/userType';

export const loginRequest = (data: AuthData) => ({
  type: LOGIN_REQUEST,
  data
});

export const resetLoginMessage = () => ({
  type: RESET_LOGIN_MESSAGE
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const signUpRequest = (data: AuthData) => ({
  type: SIGNUP_REQUEST,
  data
});

export const resetSignUpMessage = () => ({
  type: RESET_SIGNUP_MESSAGE
});
