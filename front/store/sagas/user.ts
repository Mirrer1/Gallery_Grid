import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SignUpData,
  SignUpResponse,
  UserAction,
  signUpRequestAction
} from 'store/types/userType';

function signUpAPI(data: SignUpData) {
  return axios.post('http://localhost:3065/user', data);
}

function* signUp(action: signUpRequestAction) {
  try {
    const result: AxiosResponse<SignUpResponse> = yield call(signUpAPI, action.data);

    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data.message
    });
  } catch (error: any) {
    console.log(error);

    yield put({
      type: SIGNUP_FAILURE,
      error: error.response.data.message
    });
  }
}

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action: UserAction) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data
    });
  } catch (error: any) {
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data
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
