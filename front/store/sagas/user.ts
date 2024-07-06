import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  AuthData,
  ResponseMessage,
  signUpRequestAction,
  loginRequestAction,
  User
} from 'store/types/userType';

function signUpAPI(data: AuthData) {
  return axios.post('/user', data);
}

function* signUp(action: signUpRequestAction) {
  try {
    const result: AxiosResponse<ResponseMessage> = yield call(signUpAPI, action.data);

    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data.message
    });
  } catch (error: any) {
    yield put({
      type: SIGNUP_FAILURE,
      error: error.response.data.message
    });
  }
}

function loginAPI(data: AuthData) {
  return axios.post('/user/login', data);
}

function* login(action: loginRequestAction) {
  try {
    const result: AxiosResponse<User> = yield call(loginAPI, action.data);

    yield put({
      type: LOGIN_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data.message
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
