import { Post, ResponseComment, ResponseDeleteComment, ResponseLike } from './postType';

export const LOAD_BEST_USERS_REQUEST = 'LOAD_BEST_USERS_REQUEST' as const;
export const LOAD_BEST_USERS_SUCCESS = 'LOAD_BEST_USERS_SUCCESS' as const;
export const LOAD_BEST_USERS_FAILURE = 'LOAD_BEST_USERS_FAILURE' as const;

export const LOAD_SUGGEST_USERS_REQUEST = 'LOAD_SUGGEST_USERS_REQUEST' as const;
export const LOAD_SUGGEST_USERS_SUCCESS = 'LOAD_SUGGEST_USERS_SUCCESS' as const;
export const LOAD_SUGGEST_USERS_FAILURE = 'LOAD_SUGGEST_USERS_FAILURE' as const;

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST' as const;
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS' as const;
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE' as const;

export const INITIALIZE_USER_FOLLOW_INFO = 'INITIALIZE_USER_FOLLOW_INFO' as const;
export const LOAD_USER_FOLLOW_INFO_REQUEST = 'LOAD_USER_FOLLOW_INFO_REQUEST' as const;
export const LOAD_USER_FOLLOW_INFO_SUCCESS = 'LOAD_USER_FOLLOW_INFO_SUCCESS' as const;
export const LOAD_USER_FOLLOW_INFO_FAILURE = 'LOAD_USER_FOLLOW_INFO_FAILURE' as const;

export const INITIALIZE_SEARCH_USERS = 'INITIALIZE_SEARCH_USERS' as const;
export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST' as const;
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS' as const;
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE' as const;

export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const RESET_LOGIN_MESSAGE = 'RESET_LOGIN_MESSAGE' as const;

export const LOGIN_GOOGLE_REQUEST = 'LOGIN_GOOGLE_REQUEST' as const;
export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS' as const;
export const LOGIN_GOOGLE_FAILURE = 'LOGIN_GOOGLE_FAILURE' as const;

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST' as const;
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS' as const;
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE' as const;

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE' as const;

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE' as const;
export const RESET_SIGNUP_MESSAGE = 'RESET_SIGNUP_MESSAGE' as const;

export const EDIT_MY_INFO_REQUEST = 'EDIT_MY_INFO_REQUEST' as const;
export const EDIT_MY_INFO_SUCCESS = 'EDIT_MY_INFO_SUCCESS' as const;
export const EDIT_MY_INFO_FAILURE = 'EDIT_MY_INFO_FAILURE' as const;

export const EXECUTE_USER_EDIT = 'EXECUTE_USER_EDIT' as const;
export const USER_UPLOAD_IMAGE_REQUEST = 'USER_UPLOAD_IMAGE_REQUEST' as const;
export const USER_UPLOAD_IMAGE_SUCCESS = 'USER_UPLOAD_IMAGE_SUCCESS' as const;
export const USER_UPLOAD_IMAGE_FAILURE = 'USER_UPLOAD_IMAGE_FAILURE' as const;
export const USER_REMOVE_UPLOADED_IMAGE = 'USER_REMOVE_UPLOADED_IMAGE' as const;

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST' as const;
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS' as const;
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE' as const;

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST' as const;
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS' as const;
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE' as const;

export const INCREMENT_BEST_USERS_LIKE = 'INCREMENT_BEST_USERS_LIKE' as const;
export const DECREMENT_BEST_USERS_LIKE = 'DECREMENT_BEST_USERS_LIKE' as const;
export const INCREMENT_BEST_USERS_COMMENT = 'INCREMENT_BEST_USERS_COMMENT' as const;
export const DECREMENT_BEST_USERS_COMMENT = 'DECREMENT_BEST_USERS_COMMENT' as const;

export interface ResponseMessage {
  message: string;
}

export interface AuthResponse {
  email: string;
  password: string;
  nickname?: string;
}

export interface BaseUser {
  id: number;
  nickname: string;
  desc?: string | null;
  ProfileImage: { id: number; src: string } | null;
}

export interface FeaturedUser extends BaseUser {
  followerCount: number;
  likeCount: number;
  commentCount: number;
  replyCommentCount: number;
}

export interface DetailedUserInfo extends BaseUser {
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}

export interface User extends BaseUser {
  email: string;
  createdAt: string;
  updatedAt: string;
  Posts: number[];
  Followings: { id: number }[];
  Followers: { id: number }[];
}

export interface FollowUser extends BaseUser {
  followerCount: number;
  Followers: {
    id: number;
    nickname: string;
    ProfileImage: string | null;
  }[];
}

export interface SearchUsers extends BaseUser {
  followerCount: number;
  followingCount: number;
  Posts: Post[];
}

export type UserState = {
  me: User | null;
  userInfo: DetailedUserInfo | null;
  userFollowInfo: FollowUser[];
  bestUsers: FeaturedUser[] | null;
  suggestUsers: FeaturedUser[] | null;
  searchUsers: SearchUsers[];
  loadBestUsersLoading: boolean;
  loadBestUsersDone: boolean;
  loadBestUsersError: null | string;
  loadSuggestUsersLoading: boolean;
  loadSuggestUsersDone: boolean;
  loadSuggestUsersError: null | string;
  loadUserInfoLoading: boolean;
  loadUserInfoDone: boolean;
  loadUserInfoError: null | string;
  loadUserFollowInfoLoading: boolean;
  loadUserFollowInfoDone: boolean;
  loadUserFollowInfoError: null | string;
  hasMoreUserFollowInfo: boolean;
  hasMoreSearchUsers: boolean;
  userImagePath: string[];
  searchUsersLoading: boolean;
  searchUsersDone: boolean;
  searchUsersError: null | string;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: null | string;
  loginGoogleLoading: boolean;
  loginGoogleDone: boolean;
  loginGoogleError: null | string;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: null | string;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: null | string;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: null | string;
  signUpMessage: {
    message: string | null;
    type: 'success' | 'error' | null;
  };
  editMyInfoLoading: boolean;
  editMyInfoDone: boolean;
  editMyInfoError: null | string;
  userUploadImageLoading: boolean;
  userUploadImageDone: boolean;
  userUploadImageError: null | string;
  followUserLoading: boolean;
  followUserDone: boolean;
  followUserError: null | string;
  unFollowUserLoading: boolean;
  unFollowUserDone: boolean;
  unFollowUserError: null | string;
};

export interface loadBestUsersRequestAction {
  type: typeof LOAD_BEST_USERS_REQUEST;
}

export interface loadBestUsersSuccessAction {
  type: typeof LOAD_BEST_USERS_SUCCESS;
  data: FeaturedUser[];
}

export interface loadBestUsersFailureAction {
  type: typeof LOAD_BEST_USERS_FAILURE;
  error: string;
}

export interface loadSuggestUsersRequestAction {
  type: typeof LOAD_SUGGEST_USERS_REQUEST;
  excludeIds?: number[];
}

export interface loadSuggestUsersSuccessAction {
  type: typeof LOAD_SUGGEST_USERS_SUCCESS;
  data: FeaturedUser[];
}

export interface loadSuggestUsersFailureAction {
  type: typeof LOAD_SUGGEST_USERS_FAILURE;
  error: string;
}

export interface loadUserInfoRequestAction {
  type: typeof LOAD_USER_INFO_REQUEST;
  data: number;
}

export interface loadUserInfoSuccessAction {
  type: typeof LOAD_USER_INFO_SUCCESS;
  data: DetailedUserInfo;
}

export interface loadUserInfoFailureAction {
  type: typeof LOAD_USER_INFO_FAILURE;
  error: string;
}

export interface InitializeUserFollowInfoAction {
  type: typeof INITIALIZE_USER_FOLLOW_INFO;
}

export interface loadUserFollowInfoRequestAction {
  type: typeof LOAD_USER_FOLLOW_INFO_REQUEST;
  followType: 'follower' | 'following';
  userId: number;
  lastId?: number;
  lastFollowerCount?: number;
  keyword?: string;
}

export interface loadUserFollowInfoSuccessAction {
  type: typeof LOAD_USER_FOLLOW_INFO_SUCCESS;
  data: FollowUser[];
}

export interface loadUserFollowInfoFailureAction {
  type: typeof LOAD_USER_FOLLOW_INFO_FAILURE;
  error: string;
}

export interface initializeSearchUsersAction {
  type: typeof INITIALIZE_SEARCH_USERS;
}

export interface searchUsersRequestAction {
  type: typeof SEARCH_USERS_REQUEST;
  keyword: string;
  followerCount?: number;
  lastId?: number;
}

export interface searchUsersSuccessAction {
  type: typeof SEARCH_USERS_SUCCESS;
  data: SearchUsers[];
}

export interface searchUsersFailureAction {
  type: typeof SEARCH_USERS_FAILURE;
  error: string;
}

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
  data: AuthResponse;
}

export interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  data: User;
}

export interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export interface loginGoogleRequestAction {
  type: typeof LOGIN_GOOGLE_REQUEST;
}

export interface loginGoogleSuccessAction {
  type: typeof LOGIN_GOOGLE_SUCCESS;
  data: User;
}

export interface loginGoogleFailureAction {
  type: typeof LOGIN_GOOGLE_FAILURE;
  error: string;
}

export interface loadMyInfoRequestAction {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface loadMyInfoSuccessAction {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: User;
}

export interface loadMyInfoFailureAction {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string;
}

export interface resetLoginMessageAction {
  type: typeof RESET_LOGIN_MESSAGE;
}

export interface logoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface logoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface logoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: string;
}

export interface signUpRequestAction {
  type: typeof SIGNUP_REQUEST;
  data: AuthResponse;
}

export interface signUpSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  data: string;
}

export interface signUpFailureAction {
  type: typeof SIGNUP_FAILURE;
  error: string;
}

export interface resetSignUpMessageAction {
  type: typeof RESET_SIGNUP_MESSAGE;
}

export interface executeUserEditAction {
  type: typeof EXECUTE_USER_EDIT;
}

export interface editMyInfoRequestAction {
  type: typeof EDIT_MY_INFO_REQUEST;
  data: FormData;
}

export interface editMyInfoSuccessAction {
  type: typeof EDIT_MY_INFO_SUCCESS;
  data: User;
}

export interface editMyInfoFailureAction {
  type: typeof EDIT_MY_INFO_FAILURE;
  error: string;
}

export interface userUploadImageRequestAction {
  type: typeof USER_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface userUploadImageSuccessAction {
  type: typeof USER_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface userUploadImageFailureAction {
  type: typeof USER_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface userRemoveUploadedImageAction {
  type: typeof USER_REMOVE_UPLOADED_IMAGE;
}

export interface followUserRequestAction {
  type: typeof FOLLOW_USER_REQUEST;
  data: number;
}

export interface followUserSuccessAction {
  type: typeof FOLLOW_USER_SUCCESS;
  data: number;
}

export interface followUserFailureAction {
  type: typeof FOLLOW_USER_FAILURE;
  error: string;
}

export interface unFollowUserRequestAction {
  type: typeof UNFOLLOW_USER_REQUEST;
  data: number;
}

export interface unFollowUserSuccessAction {
  type: typeof UNFOLLOW_USER_SUCCESS;
  data: number;
}

export interface unFollowUserFailureAction {
  type: typeof UNFOLLOW_USER_FAILURE;
  error: string;
}

export interface incrementBestUsersLikeAction {
  type: typeof INCREMENT_BEST_USERS_LIKE;
  data: ResponseLike;
}

export interface decrementBestUsersLikeAction {
  type: typeof DECREMENT_BEST_USERS_LIKE;
  data: ResponseLike;
}

export interface incrementBestUsersCommentAction {
  type: typeof INCREMENT_BEST_USERS_COMMENT;
  data: ResponseComment;
}

export interface decrementBestUsersCommentAction {
  type: typeof DECREMENT_BEST_USERS_COMMENT;
  data: ResponseDeleteComment;
}

export type UserAction =
  | loginRequestAction
  | loginSuccessAction
  | loginFailureAction
  | loginGoogleRequestAction
  | loginGoogleSuccessAction
  | loginGoogleFailureAction
  | loadMyInfoRequestAction
  | loadMyInfoSuccessAction
  | loadMyInfoFailureAction
  | logoutRequestAction
  | logoutSuccessAction
  | logoutFailureAction
  | resetLoginMessageAction
  | signUpRequestAction
  | signUpSuccessAction
  | signUpFailureAction
  | resetSignUpMessageAction
  | executeUserEditAction
  | editMyInfoRequestAction
  | editMyInfoSuccessAction
  | editMyInfoFailureAction
  | userUploadImageRequestAction
  | userUploadImageRequestAction
  | userUploadImageSuccessAction
  | userUploadImageFailureAction
  | userRemoveUploadedImageAction
  | followUserRequestAction
  | followUserSuccessAction
  | followUserFailureAction
  | unFollowUserRequestAction
  | unFollowUserSuccessAction
  | unFollowUserFailureAction
  | loadBestUsersRequestAction
  | loadBestUsersSuccessAction
  | loadBestUsersFailureAction
  | loadSuggestUsersRequestAction
  | loadSuggestUsersSuccessAction
  | loadSuggestUsersFailureAction
  | incrementBestUsersLikeAction
  | decrementBestUsersLikeAction
  | incrementBestUsersCommentAction
  | decrementBestUsersCommentAction
  | loadUserInfoRequestAction
  | loadUserInfoSuccessAction
  | loadUserInfoFailureAction
  | loadUserFollowInfoRequestAction
  | loadUserFollowInfoSuccessAction
  | loadUserFollowInfoFailureAction
  | searchUsersRequestAction
  | searchUsersSuccessAction
  | searchUsersFailureAction
  | initializeSearchUsersAction
  | InitializeUserFollowInfoAction;
