import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  CONTACT_FAILURE,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CHECK_CODE_FAILURE,
  CHECK_CODE_REQUEST,
  CHECK_CODE_SUCCESS,
  EMAIL_AUTH_FAILURE,
  EMAIL_AUTH_REQUEST,
  EMAIL_AUTH_SUCCESS,
  MailResponse,
  contactRequestAction,
  emailAuthRequestAction,
  checkCodeRequestAction,
  CHANGE_PASSWORD_REQUEST,
  changePasswordRequestAction,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from 'store/types/mailType';

function emailAuthAPI(email: string) {
  return axios.post('/mail/auth', {
    email
  });
}

function* emailAuth(action: emailAuthRequestAction) {
  try {
    const result: AxiosResponse<MailResponse> = yield call(emailAuthAPI, action.email);

    yield put({
      type: EMAIL_AUTH_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EMAIL_AUTH_FAILURE,
      error: error.response.data.message
    });
  }
}

function checkCodeAPI(email: string, code: string) {
  return axios.post('/mail/check-code', {
    email,
    code
  });
}

function* checkCode(action: checkCodeRequestAction) {
  try {
    const result: AxiosResponse<MailResponse> = yield call(checkCodeAPI, action.email, action.code);

    yield put({
      type: CHECK_CODE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: CHECK_CODE_FAILURE,
      error: error.response.data.message
    });
  }
}

function changePasswordAPI(email: string, password: string) {
  return axios.post('/mail/change-password', {
    email,
    password
  });
}

function* changePassword(action: changePasswordRequestAction) {
  try {
    const result: AxiosResponse<MailResponse> = yield call(changePasswordAPI, action.email, action.password);

    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error: error.response.data.message
    });
  }
}

function contactAPI(sender: string, content: string) {
  return axios.post('/mail/contact', {
    sender,
    content
  });
}

function* contact(action: contactRequestAction) {
  try {
    const result: AxiosResponse<MailResponse> = yield call(contactAPI, action.sender, action.content);

    yield put({
      type: CONTACT_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: CONTACT_FAILURE,
      error: error.response.data.message
    });
  }
}

function* watchEmailAuth() {
  yield takeLatest(EMAIL_AUTH_REQUEST, emailAuth);
}

function* watchCheckCode() {
  yield takeLatest(CHECK_CODE_REQUEST, checkCode);
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchContact() {
  yield takeLatest(CONTACT_REQUEST, contact);
}

export default function* userSaga() {
  yield all([fork(watchEmailAuth), fork(watchCheckCode), fork(watchChangePassword), fork(watchContact)]);
}
