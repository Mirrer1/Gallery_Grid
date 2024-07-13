import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  Post,
  PostAction,
  PostResponse,
  addPostRequestAction
} from 'store/types/postType';
import { generateDummyPosts } from 'store/reducers/postReducer';

function loadPostsAPI() {
  return axios.get('/api/addPost');
}

function* loadPosts(action: PostAction) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPosts
    });
  } catch (error: any) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data
    });
  }
}

function addPostAPI(data: PostResponse) {
  return axios.post('/post', data);
}

function* addPost(action: addPostRequestAction) {
  try {
    const result: AxiosResponse<Post> = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data.message
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost)]);
}
