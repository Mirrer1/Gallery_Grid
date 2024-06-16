import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, PostAction } from 'store/types/postType';

function addPostAPI(data) {
  return axios.post('/api/addPost', data);
}

function* addPost(action: PostAction) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data
    });
  } catch (error: any) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
