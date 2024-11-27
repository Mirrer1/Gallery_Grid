import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  CONTACT_FAILURE,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  MailResponse,
  contactRequestAction
} from 'store/types/mailType';

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

function* watchContact() {
  yield takeLatest(CONTACT_REQUEST, contact);
}

export default function* userSaga() {
  yield all([fork(watchContact)]);
}
