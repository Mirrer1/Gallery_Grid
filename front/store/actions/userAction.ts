import {
  LOGIN_REQUEST,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_REQUEST,
  AuthData,
  RESET_LOGIN_MESSAGE
} from 'store/types/userType';

export const loginRequest = (data: AuthData) => ({
  type: LOGIN_REQUEST,
  data
});

export const resetLoginMessage = () => ({
  type: RESET_LOGIN_MESSAGE
});

export const signUpRequest = (data: AuthData) => ({
  type: SIGNUP_REQUEST,
  data
});

export const resetSignUpMessage = () => ({
  type: RESET_SIGNUP_MESSAGE
});
