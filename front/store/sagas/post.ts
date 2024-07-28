import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  Post,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  addPostRequestAction,
  deletePostRequestAction,
  loadPostsRequestAction,
  uploadImagesRequestAction
} from 'store/types/postType';

function loadPostsAPI(lastId?: number) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action: loadPostsRequestAction) {
  try {
    const result: AxiosResponse<Post[]> = yield call(() => loadPostsAPI(action.lastId));

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function addPostAPI(data: FormData) {
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

function deletePostAPI(data: number) {
  return axios.delete(`/post/${data}`);
}

function* deletePost(action: deletePostRequestAction) {
  try {
    const result: AxiosResponse<number> = yield call(deletePostAPI, action.data);

    yield put({
      type: DELETE_POST_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: DELETE_POST_FAILURE,
      error: error.response.data.message
    });
  }
}

function uploadImagesAPI(data: FormData) {
  return axios.post('/post/images', data);
}

function* uploadImages(action: uploadImagesRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
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

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchDeletePost), fork(watchUploadImages)]);
}
