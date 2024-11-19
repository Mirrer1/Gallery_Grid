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
  LOAD_NEW_POSTS_FAILURE,
  LOAD_NEW_POSTS_REQUEST,
  LOAD_NEW_POSTS_SUCCESS,
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
  loadNewPostsRequestAction,
  postUploadImagesRequestAction,
  COMMENT_UPLOAD_IMAGE_REQUEST,
  commentUploadImageRequestAction,
  COMMENT_UPLOAD_IMAGE_SUCCESS,
  COMMENT_UPLOAD_IMAGE_FAILURE,
  MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  modalCommentUploadImageRequestAction,
  MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
  MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
  ADD_COMMENT_REQUEST,
  addCommentRequestAction,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  loadCommentsRequestAction,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  ResponseComment,
  EDIT_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS,
  EDIT_COMMENT_UPLOAD_IMAGE_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  deleteCommentRequestAction,
  ResponseDeleteComment,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DeleteInfo,
  LOAD_MODAL_COMMENTS_REQUEST,
  LOAD_MODAL_COMMENTS_FAILURE,
  LOAD_MODAL_COMMENTS_SUCCESS,
  ADD_MODAL_COMMENT_REQUEST,
  addModalCommentRequestAction,
  ADD_MODAL_COMMENT_SUCCESS,
  ADD_MODAL_COMMENT_FAILURE,
  DELETE_MODAL_COMMENT_REQUEST,
  DELETE_MODAL_COMMENT_SUCCESS,
  DELETE_MODAL_COMMENT_FAILURE,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
  EDIT_MODAL_COMMENT_REQUEST,
  EDIT_MODAL_COMMENT_SUCCESS,
  EDIT_MODAL_COMMENT_FAILURE,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  likePostRequestAction,
  ResponseLike,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  unLikePostRequestAction,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LOAD_MY_INTERACTIONS_POSTS_REQUEST,
  loadMyInteractionsPostsRequestAction,
  LOAD_MY_INTERACTIONS_POSTS_SUCCESS,
  LOAD_MY_INTERACTIONS_POSTS_FAILURE,
  UserHistoryPost,
  DELETE_MY_INTERACTIONS_POSTS_REQUEST,
  deleteMyInteractionsPostsRequestAction,
  DELETE_MY_INTERACTIONS_POSTS_FAILURE,
  DELETE_MY_INTERACTIONS_POSTS_SUCCESS,
  LOAD_MY_ACTIVITY_POSTS_REQUEST,
  loadMyActivityPostsRequestAction,
  LOAD_MY_ACTIVITY_POSTS_SUCCESS,
  LOAD_MY_ACTIVITY_POSTS_FAILURE,
  LOAD_MY_ACTIVITY_COUNTS_REQUEST,
  ActivityCounts,
  LOAD_MY_ACTIVITY_COUNTS_SUCCESS,
  LOAD_MY_ACTIVITY_COUNTS_FAILURE,
  READ_ACTIVITY_REQUEST,
  readActivityRequestAction,
  READ_ACTIVITY_SUCCESS,
  READ_ACTIVITY_FAILURE,
  LOAD_BEST_POSTS_REQUEST,
  loadBestPostsRequestAction,
  LOAD_BEST_POSTS_SUCCESS,
  LOAD_BEST_POSTS_FAILURE,
  LOAD_FOLLOWING_POSTS_REQUEST,
  loadFollowingPostsRequestAction,
  LOAD_FOLLOWING_POSTS_SUCCESS,
  LOAD_FOLLOWING_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  loadUserPostsRequestAction,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE
} from 'store/types/postType';
import {
  DECREMENT_BEST_USERS_COMMENT,
  DECREMENT_BEST_USERS_LIKE,
  INCREMENT_BEST_USERS_COMMENT,
  INCREMENT_BEST_USERS_LIKE
} from 'store/types/userType';

function loadNewPostsAPI(lastId?: number) {
  return axios.get(`/posts/new?lastId=${lastId || 0}`);
}

function* loadNewPosts(action: loadNewPostsRequestAction) {
  try {
    const result: AxiosResponse<Post[]> = yield call(() => loadNewPostsAPI(action.lastId));

    yield put({
      type: LOAD_NEW_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_NEW_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadBestPostsAPI(lastId?: number, lastLikeCount?: number, lastCommentCount?: number) {
  return axios.get(
    `/posts/best?lastId=${lastId || 0}&lastLikeCount=${lastLikeCount || 0}&lastCommentCount=${lastCommentCount || 0}`
  );
}

function* loadBestPosts(action: loadBestPostsRequestAction) {
  try {
    const result: AxiosResponse<Post[]> = yield call(() =>
      loadBestPostsAPI(action.lastId, action.lastLikeCount, action.lastCommentCount)
    );

    yield put({
      type: LOAD_BEST_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_BEST_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadUserPostsAPI(userId: number, lastId?: number) {
  return axios.get(`/posts/user?userId=${userId}&lastId=${lastId || 0}`);
}

function* loadUserPosts(action: loadUserPostsRequestAction) {
  try {
    const result: AxiosResponse<Post[]> = yield call(() => loadUserPostsAPI(action.userId, action.lastId));

    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadFollowingPostsAPI(lastCreatedAt?: string, limit: number = 10) {
  return axios.get(`/posts/following?lastCreatedAt=${encodeURIComponent(lastCreatedAt || '')}&limit=${limit}`);
}

function* loadFollowingPosts(action: loadFollowingPostsRequestAction) {
  try {
    const result: AxiosResponse<Post[]> = yield call(() => loadFollowingPostsAPI(action.lastCreatedAt, action.limit));

    yield put({
      type: LOAD_FOLLOWING_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_FOLLOWING_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadMyActivityCountsAPI() {
  return axios.get('/post/activities');
}

function* loadMyActivityCounts() {
  try {
    const result: AxiosResponse<ActivityCounts> = yield call(loadMyActivityCountsAPI);

    yield put({
      type: LOAD_MY_ACTIVITY_COUNTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MY_ACTIVITY_COUNTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadMyActivityPostsAPI(lastId?: number) {
  return axios.get(`/posts/activities?lastId=${lastId || 0}`);
}

function* loadMyActivityPosts(action: loadMyActivityPostsRequestAction) {
  try {
    const result: AxiosResponse<UserHistoryPost[]> = yield call(() => loadMyActivityPostsAPI(action.lastId));

    yield put({
      type: LOAD_MY_ACTIVITY_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MY_ACTIVITY_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function readActivityAPI(targetId: 'all' | number) {
  return axios.post('/post/activities', { targetId });
}

function* readActivity(action: readActivityRequestAction) {
  try {
    const result: AxiosResponse<'all' | number> = yield call(() => readActivityAPI(action.targetId));

    yield put({
      type: READ_ACTIVITY_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: READ_ACTIVITY_FAILURE,
      error: error.response.data.message
    });
  }
}

function loadMyInteractionsPostsAPI(menu: 'all' | 'like' | 'comment', sortBy: 'best' | 'new') {
  return axios.get(`/posts/interactions?menu=${menu}&sortBy=${sortBy}`);
}

function* loadMyInteractionsPosts(action: loadMyInteractionsPostsRequestAction) {
  try {
    const result: AxiosResponse<UserHistoryPost[]> = yield call(() =>
      loadMyInteractionsPostsAPI(action.menu, action.sortBy)
    );

    yield put({
      type: LOAD_MY_INTERACTIONS_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MY_INTERACTIONS_POSTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function deleteMyInteractionsPostsAPI(menu: 'all' | 'like' | 'comment', id: number[]) {
  return axios.patch('/posts/interactions', { menu, id });
}

function* deleteMyInteractionsPosts(action: deleteMyInteractionsPostsRequestAction) {
  try {
    const result: AxiosResponse<number[]> = yield call(() => deleteMyInteractionsPostsAPI(action.menu, action.id));

    yield put({
      type: DELETE_MY_INTERACTIONS_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: DELETE_MY_INTERACTIONS_POSTS_FAILURE,
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

function loadCommentsAPI(data: number) {
  return axios.get(`/post/comment/${data}`);
}

function* loadComments(action: loadCommentsRequestAction) {
  try {
    const result: AxiosResponse<Post> = yield call(() => loadCommentsAPI(action.data));

    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function addCommentAPI(data: FormData) {
  return axios.post('/post/comment', data);
}

function* addComment(action: addCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseComment> = yield call(addCommentAPI, action.data);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });

    yield put({
      type: INCREMENT_BEST_USERS_COMMENT,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function editCommentAPI(data: FormData) {
  return axios.patch('/post/comment/edit', data);
}

function* editComment(action: addCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseComment> = yield call(editCommentAPI, action.data);

    yield put({
      type: EDIT_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function deleteCommentAPI(data: DeleteInfo) {
  return axios.post('/post/comment/delete', data);
}

function* deleteComment(action: deleteCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseDeleteComment> = yield call(deleteCommentAPI, action.data);

    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: result.data
    });
    yield put({
      type: DECREMENT_BEST_USERS_COMMENT,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: DELETE_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function* uploadCommentImage(action: commentUploadImageRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: COMMENT_UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: COMMENT_UPLOAD_IMAGE_FAILURE,
      error: error.response.data.message
    });
  }
}

function* uploadEditCommentImage(action: commentUploadImageRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_COMMENT_UPLOAD_IMAGE_FAILURE,
      error: error.response.data.message
    });
  }
}

function* loadModalComments(action: loadCommentsRequestAction) {
  try {
    const result: AxiosResponse<Post> = yield call(() => loadCommentsAPI(action.data));

    yield put({
      type: LOAD_MODAL_COMMENTS_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LOAD_MODAL_COMMENTS_FAILURE,
      error: error.response.data.message
    });
  }
}

function addModalCommentAPI(data: FormData) {
  return axios.post('/post/comment', data);
}

function* addModalComment(action: addModalCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseComment> = yield call(addModalCommentAPI, action.data);

    yield put({
      type: ADD_MODAL_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: ADD_MODAL_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function* uploadModalCommentImage(action: modalCommentUploadImageRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
      error: error.response.data.message
    });
  }
}

function* editModalComment(action: addCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseComment> = yield call(editCommentAPI, action.data);

    yield put({
      type: EDIT_MODAL_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_MODAL_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function* uploadEditModalCommentImage(action: commentUploadImageRequestAction) {
  try {
    const result: AxiosResponse<string[]> = yield call(uploadImagesAPI, action.data);

    yield put({
      type: EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
      error: error.response.data.message
    });
  }
}

function* deleteModalComment(action: deleteCommentRequestAction) {
  try {
    const result: AxiosResponse<ResponseDeleteComment> = yield call(deleteCommentAPI, action.data);

    yield put({
      type: DELETE_MODAL_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: DELETE_MODAL_COMMENT_FAILURE,
      error: error.response.data.message
    });
  }
}

function likePostAPI(data: number) {
  return axios.patch(`/post/like/${data}`);
}

function* likePost(action: likePostRequestAction) {
  try {
    const result: AxiosResponse<ResponseLike> = yield call(likePostAPI, action.data);

    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: INCREMENT_BEST_USERS_LIKE,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data.message
    });
  }
}

function unLikePostAPI(data: number) {
  return axios.delete(`/post/like/${data}`);
}

function* unLikePost(action: unLikePostRequestAction) {
  try {
    const result: AxiosResponse<ResponseLike> = yield call(unLikePostAPI, action.data);

    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: DECREMENT_BEST_USERS_LIKE,
      data: result.data
    });
  } catch (error: any) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data.message
    });
  }
}

function* watchLoadNewPosts() {
  yield takeLatest(LOAD_NEW_POSTS_REQUEST, loadNewPosts);
}

function* watchLoadBestPosts() {
  yield takeLatest(LOAD_BEST_POSTS_REQUEST, loadBestPosts);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadFollowingPosts() {
  yield takeLatest(LOAD_FOLLOWING_POSTS_REQUEST, loadFollowingPosts);
}

function* watchLoadMyActivityCounts() {
  yield takeLatest(LOAD_MY_ACTIVITY_COUNTS_REQUEST, loadMyActivityCounts);
}

function* watchLoadMyActivityPosts() {
  yield takeLatest(LOAD_MY_ACTIVITY_POSTS_REQUEST, loadMyActivityPosts);
}

function* watchReadActivity() {
  yield takeLatest(READ_ACTIVITY_REQUEST, readActivity);
}

function* watchLoadMyInteractionsPosts() {
  yield takeLatest(LOAD_MY_INTERACTIONS_POSTS_REQUEST, loadMyInteractionsPosts);
}

function* watchDeleteMyInteractionsPosts() {
  yield takeLatest(DELETE_MY_INTERACTIONS_POSTS_REQUEST, deleteMyInteractionsPosts);
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

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchCommentUploadImage() {
  yield takeLatest(COMMENT_UPLOAD_IMAGE_REQUEST, uploadCommentImage);
}

function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}

function* watchEditCommentUploadImage() {
  yield takeLatest(EDIT_COMMENT_UPLOAD_IMAGE_REQUEST, uploadEditCommentImage);
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchLoadModalComments() {
  yield takeLatest(LOAD_MODAL_COMMENTS_REQUEST, loadModalComments);
}

function* watchAddModalComment() {
  yield takeLatest(ADD_MODAL_COMMENT_REQUEST, addModalComment);
}

function* watchModalCommentUploadImage() {
  yield takeLatest(MODAL_COMMENT_UPLOAD_IMAGE_REQUEST, uploadModalCommentImage);
}

function* watchEditModalComment() {
  yield takeLatest(EDIT_MODAL_COMMENT_REQUEST, editModalComment);
}

function* watchEditModalCommentUploadImage() {
  yield takeLatest(EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST, uploadEditModalCommentImage);
}

function* watchDeleteModalComment() {
  yield takeLatest(DELETE_MODAL_COMMENT_REQUEST, deleteModalComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadNewPosts),
    fork(watchLoadBestPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadFollowingPosts),
    fork(watchLoadMyActivityCounts),
    fork(watchLoadMyActivityPosts),
    fork(watchReadActivity),
    fork(watchLoadMyInteractionsPosts),
    fork(watchDeleteMyInteractionsPosts),
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchDeletePost),
    fork(watchPostUploadImages),
    fork(watchEditPostUploadImages),
    fork(watchLoadComments),
    fork(watchAddComment),
    fork(watchCommentUploadImage),
    fork(watchEditComment),
    fork(watchEditCommentUploadImage),
    fork(watchDeleteComment),
    fork(watchLoadModalComments),
    fork(watchAddModalComment),
    fork(watchModalCommentUploadImage),
    fork(watchEditModalComment),
    fork(watchEditModalCommentUploadImage),
    fork(watchDeleteModalComment),
    fork(watchLikePost),
    fork(watchUnLikePost)
  ]);
}
