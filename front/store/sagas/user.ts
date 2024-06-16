import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, UserAction } from 'store/types/userType';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action: UserAction) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
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

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin)]);
}
