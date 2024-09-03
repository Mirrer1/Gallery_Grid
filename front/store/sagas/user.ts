import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  AuthResponse,
  ResponseMessage,
  signUpRequestAction,
  loginRequestAction,
  User,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_FAILURE,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  USER_UPLOAD_IMAGE_REQUEST,
  userUploadImageRequestAction,
  USER_UPLOAD_IMAGE_SUCCESS,
  USER_UPLOAD_IMAGE_FAILURE,
  EDIT_MY_INFO_REQUEST,
  editMyInfoRequestAction,
  EDIT_MY_INFO_SUCCESS,
  EDIT_MY_INFO_FAILURE
} from 'store/types/userType';

function signUpAPI(data: AuthResponse) {
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

function loginAPI(data: AuthResponse) {
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

function loginGoogleAPI() {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
}

function* loginGoogle() {
  try {
    yield call(() => {
      window.location.href = loginGoogleAPI();
    });
  } catch (error: any) {
    yield put({
      type: LOGIN_GOOGLE_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse<User> = yield call(loadMyInfoAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data.message
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);

    yield put({
      type: LOGOUT_SUCCESS
    });
  } catch (error: any) {
    yield put({
      type: LOGOUT_FAILURE,
      error: error.response.data.message
    });
  }
}

function editMyInfoAPI(data: FormData) {
  return axios.patch('/user/edit', data);
}

function* editMyInfo(action: editMyInfoRequestAction) {
  try {
    const result: AxiosResponse<User> = yield call(editMyInfoAPI, action.data);

    yield put({
      type: EDIT_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_MY_INFO_FAILURE,
      error: error.response.data.message
    });
  }
}

function uploadImagesAPI(data: FormData) {
  return axios.post('/post/images', data);
}

function* uploadUserImage(action: userUploadImageRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: USER_UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: USER_UPLOAD_IMAGE_FAILURE,
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

function* watchLoginGoogle() {
  yield takeLatest(LOGIN_GOOGLE_REQUEST, loginGoogle);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchEditMyInfo() {
  yield takeLatest(EDIT_MY_INFO_REQUEST, editMyInfo);
}

function* watchUserUploadImage() {
  yield takeLatest(USER_UPLOAD_IMAGE_REQUEST, uploadUserImage);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLoginGoogle),
    fork(watchLoadMyInfo),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchEditMyInfo),
    fork(watchUserUploadImage)
  ]);
}
