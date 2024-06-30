import { LOGIN_REQUEST, RESET_SIGNUP_MESSAGE, SIGNUP_REQUEST, SignUpData } from 'store/types/userType';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const signUpRequest = (data: SignUpData) => ({
  type: SIGNUP_REQUEST,
  data
});

export const resetSignUpMessage = () => ({
  type: RESET_SIGNUP_MESSAGE
});
