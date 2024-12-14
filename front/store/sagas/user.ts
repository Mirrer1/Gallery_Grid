import { all, call, debounce, fork, put, takeLatest } from 'redux-saga/effects';
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
  EDIT_MY_INFO_FAILURE,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
  followUserRequestAction,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  unFollowUserRequestAction,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  LOAD_BEST_USERS_REQUEST,
  LOAD_BEST_USERS_SUCCESS,
  LOAD_BEST_USERS_FAILURE,
  FeaturedUser,
  LOAD_SUGGEST_USERS_REQUEST,
  LOAD_SUGGEST_USERS_SUCCESS,
  LOAD_SUGGEST_USERS_FAILURE,
  loadSuggestUsersRequestAction,
  LOAD_USER_INFO_REQUEST,
  loadUserInfoRequestAction,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  DetailedUserInfo,
  loadUserFollowInfoRequestAction,
  LOAD_USER_FOLLOW_INFO_SUCCESS,
  LOAD_USER_FOLLOW_INFO_FAILURE,
  LOAD_USER_FOLLOW_INFO_REQUEST,
  FollowUser,
  SEARCH_USERS_REQUEST,
  searchUsersRequestAction,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  SearchUsers
} from 'store/types/userType';

function loadBestUsersAPI() {
  return axios.get('/user/best');
}

function* loadBestUsers() {
  try {
    const result: AxiosResponse<FeaturedUser[]> = yield call(loadBestUsersAPI);

    yield put({
      type: LOAD_BEST_USERS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_BEST_USERS_FAILURE,
      error: error.response.data.message
    });
  }
}

function searchUsersAPI(keyword: string, followerCount?: number, lastId?: number) {
  return axios.get(`/user/search?keyword=${keyword}&followerCount=${followerCount || 0}&lastId=${lastId || 0}`);
}

function* searchUsers(action: searchUsersRequestAction) {
  try {
    const result: AxiosResponse<SearchUsers[]> = yield call(
      searchUsersAPI,
      action.keyword,
      action.followerCount,
      action.lastId
    );

    yield put({
      type: SEARCH_USERS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: SEARCH_USERS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadSuggestUsersAPI(excludeIds: number[] = []) {
  return axios.get('/user/suggest', {
    params: { excludeIds: excludeIds.length ? excludeIds.join(',') : undefined }
  });
}

function* loadSuggestUsers(action: loadSuggestUsersRequestAction) {
  try {
    const result: AxiosResponse<FeaturedUser[]> = yield call(loadSuggestUsersAPI, action.excludeIds);

    yield put({
      type: LOAD_SUGGEST_USERS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_SUGGEST_USERS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadUserInfoAPI(data: number) {
  return axios.get(`/user/info/${data}`);
}

function* loadUserInfo(action: loadUserInfoRequestAction) {
  try {
    const result: AxiosResponse<DetailedUserInfo> = yield call(loadUserInfoAPI, action.data);

    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadUserFollowInfoAPI(
  followType: 'follower' | 'following',
  userId: number,
  lastId?: number,
  lastFollowerCount?: number,
  keyword?: string
) {
  return axios.get(
    `/user/follow?followType=${followType}&userId=${userId}&lastId=${lastId || 0}&lastFollowerCount=${lastFollowerCount || 0}&keyword=${keyword || ''}`
  );
}

function* loadUserFollowInfo(action: loadUserFollowInfoRequestAction) {
  try {
    const result: AxiosResponse<FollowUser[]> = yield call(() =>
      loadUserFollowInfoAPI(action.followType, action.userId, action.lastId, action.lastFollowerCount, action.keyword)
    );

    yield put({
      type: LOAD_USER_FOLLOW_INFO_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_USER_FOLLOW_INFO_FAILURE,
      error: error.response.data.message
    });
  }
}

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

function followUserAPI(data: number) {
  return axios.post(`/user/follow/${data}`);
}

function* followUser(action: followUserRequestAction) {
  try {
    const result: AxiosResponse<number> = yield call(followUserAPI, action.data);

    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: error.response.data.message
    });
  }
}

function unFollowUserAPI(data: number) {
  return axios.delete(`/user/follow/${data}`);
}

function* unFollowUser(action: unFollowUserRequestAction) {
  try {
    const result: AxiosResponse<number> = yield call(unFollowUserAPI, action.data);

    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: error.response.data.message
    });
  }
}

function* watchSearchUsers() {
  yield debounce(500, SEARCH_USERS_REQUEST, searchUsers);
}

function* watchLoadBestUsers() {
  yield takeLatest(LOAD_BEST_USERS_REQUEST, loadBestUsers);
}

function* watchLoadSuggestUsers() {
  yield takeLatest(LOAD_SUGGEST_USERS_REQUEST, loadSuggestUsers);
}

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLoadUserFollowInfo() {
  yield debounce(500, LOAD_USER_FOLLOW_INFO_REQUEST, loadUserFollowInfo);
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

function* watchFollowUser() {
  yield takeLatest(FOLLOW_USER_REQUEST, followUser);
}

function* watchUnFollowUser() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unFollowUser);
}

export default function* userSaga() {
  yield all([
    fork(watchSearchUsers),
    fork(watchLoadBestUsers),
    fork(watchLoadSuggestUsers),
    fork(watchLoadUserInfo),
    fork(watchLoadUserFollowInfo),
    fork(watchLogin),
    fork(watchLoginGoogle),
    fork(watchLoadMyInfo),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchEditMyInfo),
    fork(watchUserUploadImage),
    fork(watchFollowUser),
    fork(watchUnFollowUser)
  ]);
}
