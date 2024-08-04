import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  Post,
  POST_UPLOAD_IMAGES_FAILURE,
  POST_UPLOAD_IMAGES_REQUEST,
  POST_UPLOAD_IMAGES_SUCCESS,
  EDIT_POST_UPLOAD_IMAGES_FAILURE,
  EDIT_POST_UPLOAD_IMAGES_REQUEST,
  EDIT_POST_UPLOAD_IMAGES_SUCCESS,
  addPostRequestAction,
  deletePostRequestAction,
  editPostRequestAction,
  loadPostsRequestAction,
  postUploadImagesRequestAction
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

function editPostAPI(data: FormData) {
  return axios.patch(`/post/${data.get('postId')}`, data);
}

function* editPost(action: editPostRequestAction) {
  try {
    const result: AxiosResponse<Post> = yield call(editPostAPI, action.data);

    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_POST_FAILURE,
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

function* uploadPostImages(action: postUploadImagesRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: POST_UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: POST_UPLOAD_IMAGES_FAILURE,
      error: error.response.data.message
    });
  }
}

function* uploadEditPostImages(action: postUploadImagesRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: EDIT_POST_UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_POST_UPLOAD_IMAGES_FAILURE,
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

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchPostUploadImages() {
  yield takeLatest(POST_UPLOAD_IMAGES_REQUEST, uploadPostImages);
}

function* watchEditPostUploadImages() {
  yield takeLatest(EDIT_POST_UPLOAD_IMAGES_REQUEST, uploadEditPostImages);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchDeletePost),
    fork(watchPostUploadImages),
    fork(watchEditPostUploadImages)
  ]);
}
