import { ResponseComment, ResponseDeleteComment, ResponseLike } from 'store/types/postType';
import {
  LOGIN_REQUEST,
  RESET_SIGNUP_MESSAGE,
  SIGNUP_REQUEST,
  AuthResponse,
  RESET_LOGIN_MESSAGE,
  LOGOUT_REQUEST,
  LOGIN_GOOGLE_REQUEST,
  LOAD_MY_INFO_REQUEST,
  USER_UPLOAD_IMAGE_REQUEST,
  USER_REMOVE_UPLOADED_IMAGE,
  EDIT_MY_INFO_REQUEST,
  EXECUTE_USER_EDIT,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
  LOAD_BEST_USERS_REQUEST,
  DECREMENT_BEST_USERS_LIKE,
  INCREMENT_BEST_USERS_LIKE,
  INCREMENT_BEST_USERS_COMMENT,
  DECREMENT_BEST_USERS_COMMENT,
  LOAD_SUGGEST_USERS_REQUEST,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_FOLLOW_INFO_REQUEST,
  SEARCH_USERS_REQUEST,
  INITIALIZE_SEARCH_USERS,
  INITIALIZE_USER_FOLLOW_INFO
} from 'store/types/userType';

export const loadBestUsersRequest = () => ({
  type: LOAD_BEST_USERS_REQUEST
});

export const loadSuggestUsersRequest = (excludeIds: number[] = []) => ({
  type: LOAD_SUGGEST_USERS_REQUEST,
  excludeIds
});

export const loadUserInfoRequest = (data: number) => ({
  type: LOAD_USER_INFO_REQUEST,
  data
});

export const InitializeUserFollowInfoAction = () => ({
  type: INITIALIZE_USER_FOLLOW_INFO
});

export const loadUserFollowInfoRequest = (
  followType: 'follower' | 'following',
  userId: number,
  lastId?: number,
  lastFollowerCount?: number,
  keyword?: string
) => ({
  type: LOAD_USER_FOLLOW_INFO_REQUEST,
  followType,
  userId,
  lastId,
  lastFollowerCount,
  keyword
});

export const initializeSearchUsers = () => ({
  type: INITIALIZE_SEARCH_USERS
});

export const searchUsersRequest = (keyword: string, followerCount?: number, lastId?: number) => ({
  type: SEARCH_USERS_REQUEST,
  keyword,
  followerCount,
  lastId
});

export const loginRequest = (data: AuthResponse) => ({
  type: LOGIN_REQUEST,
  data
});

export const loginGoogleRequest = () => ({
  type: LOGIN_GOOGLE_REQUEST
});

export const loadMyInfoRequest = () => ({
  type: LOAD_MY_INFO_REQUEST
});

export const resetLoginMessage = () => ({
  type: RESET_LOGIN_MESSAGE
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const signUpRequest = (data: AuthResponse) => ({
  type: SIGNUP_REQUEST,
  data
});

export const resetSignUpMessage = () => ({
  type: RESET_SIGNUP_MESSAGE
});

export const executeUserEdit = () => ({
  type: EXECUTE_USER_EDIT
});

export const editMyInfoRequest = (data: FormData) => ({
  type: EDIT_MY_INFO_REQUEST,
  data
});

export const userUploadImageRequest = (data: FormData) => ({
  type: USER_UPLOAD_IMAGE_REQUEST,
  data
});

export const userRemoveUploadedImage = () => ({
  type: USER_REMOVE_UPLOADED_IMAGE
});

export const followUserRequest = (data: number) => ({
  type: FOLLOW_USER_REQUEST,
  data
});

export const unFollowUserRequest = (data: number) => ({
  type: UNFOLLOW_USER_REQUEST,
  data
});

export const incrementBestUsersLikeRequest = (data: ResponseLike) => ({
  type: INCREMENT_BEST_USERS_LIKE,
  data
});

export const decrementBestUsersLikeRequest = (data: ResponseLike) => ({
  type: DECREMENT_BEST_USERS_LIKE,
  data
});

export const incrementBestUsersCommentRequest = (data: ResponseComment) => ({
  type: INCREMENT_BEST_USERS_COMMENT,
  data
});

export const decrementBestUsersCommentRequest = (data: ResponseDeleteComment) => ({
  type: DECREMENT_BEST_USERS_COMMENT,
  data
});
