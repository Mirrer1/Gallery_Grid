import { User } from './userType';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST' as const;
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS' as const;
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE' as const;

export const INITIALIZE_SEARCH_POSTS = 'INITIALIZE_SEARCH_POSTS' as const;
export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST' as const;
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS' as const;
export const SEARCH_POSTS_FAILURE = 'SEARCH_POSTS_FAILURE' as const;

export const INITIALIZE_POST_LIST = 'INITIALIZE_POST_LIST' as const;
export const LOAD_NEW_POSTS_REQUEST = 'LOAD_NEW_POSTS_REQUEST' as const;
export const LOAD_NEW_POSTS_SUCCESS = 'LOAD_NEW_POSTS_SUCCESS' as const;
export const LOAD_NEW_POSTS_FAILURE = 'LOAD_NEW_POSTS_FAILURE' as const;

export const LOAD_BEST_POSTS_REQUEST = 'LOAD_BEST_POSTS_REQUEST' as const;
export const LOAD_BEST_POSTS_SUCCESS = 'LOAD_BEST_POSTS_SUCCESS' as const;
export const LOAD_BEST_POSTS_FAILURE = 'LOAD_BEST_POSTS_FAILURE' as const;

export const DELETE_FOLLOWING_USER_POSTS = 'DELETE_FOLLOWING_USER_POSTS' as const;
export const LOAD_FOLLOWING_POSTS_REQUEST = 'LOAD_FOLLOWING_POSTS_REQUEST' as const;
export const LOAD_FOLLOWING_POSTS_SUCCESS = 'LOAD_FOLLOWING_POSTS_SUCCESS' as const;
export const LOAD_FOLLOWING_POSTS_FAILURE = 'LOAD_FOLLOWING_POSTS_FAILURE' as const;

export const INITIALIZE_USER_POSTS = 'INITIALIZE_USER_POSTS' as const;
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST' as const;
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS' as const;
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE' as const;

export const LOAD_MY_ACTIVITY_COUNTS_REQUEST = 'LOAD_MY_ACTIVITY_COUNTS_REQUEST' as const;
export const LOAD_MY_ACTIVITY_COUNTS_SUCCESS = 'LOAD_MY_ACTIVITY_COUNTS_SUCCESS' as const;
export const LOAD_MY_ACTIVITY_COUNTS_FAILURE = 'LOAD_MY_ACTIVITY_COUNTS_FAILURE' as const;

export const LOAD_MY_ACTIVITY_POSTS_REQUEST = 'LOAD_MY_ACTIVITY_POSTS_REQUEST' as const;
export const LOAD_MY_ACTIVITY_POSTS_SUCCESS = 'LOAD_MY_ACTIVITY_POSTS_SUCCESS' as const;
export const LOAD_MY_ACTIVITY_POSTS_FAILURE = 'LOAD_MY_ACTIVITY_POSTS_FAILURE' as const;

export const READ_ACTIVITY_REQUEST = 'READ_ACTIVITY_REQUEST' as const;
export const READ_ACTIVITY_SUCCESS = 'READ_ACTIVITY_SUCCESS' as const;
export const READ_ACTIVITY_FAILURE = 'READ_ACTIVITY_FAILURE' as const;

export const LOAD_MY_INTERACTIONS_POSTS_REQUEST = 'LOAD_MY_INTERACTIONS_POSTS_REQUEST' as const;
export const LOAD_MY_INTERACTIONS_POSTS_SUCCESS = 'LOAD_MY_INTERACTIONS_POSTS_SUCCESS' as const;
export const LOAD_MY_INTERACTIONS_POSTS_FAILURE = 'LOAD_MY_INTERACTIONS_POSTS_FAILURE' as const;

export const DELETE_MY_INTERACTIONS_POSTS_REQUEST = 'DELETE_MY_INTERACTIONS_POSTS_REQUEST' as const;
export const DELETE_MY_INTERACTIONS_POSTS_SUCCESS = 'DELETE_MY_INTERACTIONS_POSTS_SUCCESS' as const;
export const DELETE_MY_INTERACTIONS_POSTS_FAILURE = 'DELETE_MY_INTERACTIONS_POSTS_FAILURE' as const;

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST' as const;
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS' as const;
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE' as const;

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST' as const;
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS' as const;
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE' as const;

export const POST_UPLOAD_IMAGES_REQUEST = 'POST_UPLOAD_IMAGES_REQUEST' as const;
export const POST_UPLOAD_IMAGES_SUCCESS = 'POST_UPLOAD_IMAGES_SUCCESS' as const;
export const POST_UPLOAD_IMAGES_FAILURE = 'POST_UPLOAD_IMAGES_FAILURE' as const;
export const POST_REMOVE_UPLOADED_IMAGE = 'POST_REMOVE_UPLOADED_IMAGE' as const;
export const POST_REORDER_UPLOADED_IMAGE = 'POST_REORDER_UPLOADED_IMAGE' as const;

export const EDIT_POST_UPLOAD_IMAGES_REQUEST = 'EDIT_POST_UPLOAD_IMAGES_REQUEST' as const;
export const EDIT_POST_UPLOAD_IMAGES_SUCCESS = 'EDIT_POST_UPLOAD_IMAGES_SUCCESS' as const;
export const EDIT_POST_UPLOAD_IMAGES_FAILURE = 'EDIT_POST_UPLOAD_IMAGES_FAILURE' as const;
export const EDIT_POST_REMOVE_UPLOADED_IMAGE = 'EDIT_POST_REMOVE_UPLOADED_IMAGE' as const;
export const EDIT_POST_REORDER_UPLOADED_IMAGE = 'EDIT_POST_REORDER_UPLOADED_IMAGE' as const;

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST' as const;
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS' as const;
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE' as const;

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' as const;
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' as const;
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' as const;

export const COMMENT_UPLOAD_IMAGE_REQUEST = 'COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const COMMENT_UPLOAD_IMAGE_SUCCESS = 'COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const COMMENT_UPLOAD_IMAGE_FAILURE = 'COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const COMMENT_REMOVE_UPLOADED_IMAGE = 'COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST' as const;
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS' as const;
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE' as const;

export const EXECUTE_COMMENT_EDIT = 'EXECUTE_COMMENT_EDIT' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_REQUEST = 'EDIT_COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS = 'EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const EDIT_COMMENT_UPLOAD_IMAGE_FAILURE = 'EDIT_COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const EDIT_COMMENT_REMOVE_UPLOADED_IMAGE = 'EDIT_COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST' as const;
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS' as const;
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE' as const;

export const LOAD_MODAL_COMMENTS_REQUEST = 'LOAD_MODAL_COMMENTS_REQUEST' as const;
export const LOAD_MODAL_COMMENTS_SUCCESS = 'LOAD_MODAL_COMMENTS_SUCCESS' as const;
export const LOAD_MODAL_COMMENTS_FAILURE = 'LOAD_MODAL_COMMENTS_FAILURE' as const;

export const ADD_MODAL_COMMENT_REQUEST = 'ADD_MODAL_COMMENT_REQUEST' as const;
export const ADD_MODAL_COMMENT_SUCCESS = 'ADD_MODAL_COMMENT_SUCCESS' as const;
export const ADD_MODAL_COMMENT_FAILURE = 'ADD_MODAL_COMMENT_FAILURE' as const;

export const MODAL_COMMENT_UPLOAD_IMAGE_REQUEST = 'MODAL_COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS = 'MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const MODAL_COMMENT_UPLOAD_IMAGE_FAILURE = 'MODAL_COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const MODAL_COMMENT_REMOVE_UPLOADED_IMAGE = 'MODAL_COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const EDIT_MODAL_COMMENT_REQUEST = 'EDIT_MODAL_COMMENT_REQUEST' as const;
export const EDIT_MODAL_COMMENT_SUCCESS = 'EDIT_MODAL_COMMENT_SUCCESS' as const;
export const EDIT_MODAL_COMMENT_FAILURE = 'EDIT_MODAL_COMMENT_FAILURE' as const;

export const EXECUTE_MODAL_COMMENT_EDIT = 'EXECUTE_MODAL_COMMENT_EDIT' as const;
export const EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST = 'EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST' as const;
export const EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS = 'EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS' as const;
export const EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE = 'EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE' as const;
export const EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE = 'EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE' as const;

export const DELETE_MODAL_COMMENT_REQUEST = 'DELETE_MODAL_COMMENT_REQUEST' as const;
export const DELETE_MODAL_COMMENT_SUCCESS = 'DELETE_MODAL_COMMENT_SUCCESS' as const;
export const DELETE_MODAL_COMMENT_FAILURE = 'DELETE_MODAL_COMMENT_FAILURE' as const;

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const SHOW_COMMENT_LIST = 'SHOW_COMMENT_LIST' as const;
export const HIDE_COMMENT_LIST = 'HIDE_COMMENT_LIST' as const;

export const SHOW_IMAGE_PREVIEW = 'SHOW_IMAGE_PREVIEW' as const;
export const HIDE_IMAGE_PREVIEW = 'HIDE_IMAGE_PREVIEW' as const;

export const SHOW_POST_CAROUSEL = 'SHOW_POST_CAROUSEL' as const;
export const HIDE_POST_CAROUSEL = 'HIDE_POST_CAROUSEL' as const;

export const SHOW_POST_MODAL = 'SHOW_POST_MODAL' as const;
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL' as const;

export const SHOW_MODAL_COMMENT_LIST = 'SHOW_MODAL_COMMENT_LIST' as const;
export const HIDE_MODAL_COMMENT_LIST = 'HIDE_MODAL_COMMENT_LIST' as const;
export const SET_ACTIVITY_FOCUSED_COMMENT = 'SET_ACTIVITY_FOCUSED_COMMENT' as const;

export const EXECUTE_POST_EDIT = 'EXECUTE_POST_EDIT' as const;
export const CANCEL_POST_EDIT = 'CANCEL_POST_EDIT' as const;

export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL' as const;
export const HIDE_DELETE_MODAL = 'HIDE_DELETE_MODAL' as const;

export interface FocusedComment {
  activityType: 'comment' | 'replyComment';
  id: number;
}

export interface DeleteInfo {
  type?: '댓글' | '게시글' | 'Gallery 게시글';
  id: number | number[];
  menu?: 'all' | 'like' | 'comment';
  hasChild?: boolean;
  replyId?: number | null;
}

export interface Image {
  id: number;
  src: string;
}

export interface ResponseLike {
  PostId: number;
  UserId: number;
  AuthorId: number;
}

export interface ResponseComment {
  comment: Comment | IReplyComment;
  parentId?: string | null;
}

export interface ResponseDeleteComment {
  id: number;
  postId: number;
  replyId?: number;
  hasChild?: boolean;
  AuthorId: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  parentId: number | null;
  isDeleted: boolean;
  User: User;
  Post: { UserId: number };
  CommentImage: Image | null;
  Replies: IReplyComment[];
}

export interface IReplyComment extends Comment {
  CommentId: number;
  ReplyImage?: Image | null;
}

export interface PostComment {
  id: number;
  isDeleted: boolean;
  Replies: { id: number; User?: { id: number } }[];
  User?: { id: number };
}

export interface PostLike {
  id: number;
}

export interface Post {
  id: number;
  content: string;
  location: string | null;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  User: User;
  Images: Image[];
  Likers: PostLike[];
  Comments: PostComment[];
}

export interface UserHistoryPost {
  id: number;
  type: string;
  Post: Post;
  createdAt: string;
  Alerter: { id: number; nickname: string; ProfileImage: { id: number; src: string } | null };
  Comment: { id: number; content: string } | null;
  ReplyComment: { id: number; content: string } | null;
}

export interface ActivityCounts {
  like: number;
  comment: number;
  follow: number;
}

export type PostState = {
  timelinePosts: Post[];
  userPosts: Post[];
  searchPosts: Post[];
  myActivityCounts: ActivityCounts;
  myActivityPosts: UserHistoryPost[];
  galleryPosts: UserHistoryPost[];
  singlePost: Post | null;
  previewImagePath: string | null;
  postCarousel: Image[];
  postImagePaths: string[];
  editPostImagePaths: string[];
  commentImagePath: string[];
  editCommentImagePath: string[];
  modalCommentImagePath: string[];
  editModalCommentImagePath: string[];
  postEditMode: boolean;
  deleteInfo: DeleteInfo | null;
  mainComments: Comment[] | null;
  modalComments: Comment[] | null;
  lastChangedCommentId: number | null;
  lastChangedModalCommentId: number | null;
  focusedComment: FocusedComment | null;
  commentVisiblePostId: number | null;
  hasMoreTimelinePosts: boolean;
  hasMoreUserPosts: boolean;
  hasMoreSearchPosts: boolean;
  hasMoreMyActivityPosts: boolean;
  isCategoryChanged: boolean;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: null | string;
  loadNewPostsLoading: boolean;
  loadNewPostsDone: boolean;
  loadNewPostsError: null | string;
  loadBestPostsLoading: boolean;
  loadBestPostsDone: boolean;
  loadBestPostsError: null | string;
  searchPostsLoading: boolean;
  searchPostsDone: boolean;
  searchPostsError: null | string;
  loadFollowingPostsLoading: boolean;
  loadFollowingPostsDone: boolean;
  loadFollowingPostsError: null | string;
  loadUserPostsLoading: boolean;
  loadUserPostsDone: boolean;
  loadUserPostsError: null | string;
  loadMyActivityCountsLoading: boolean;
  loadMyActivityCountsDone: boolean;
  loadMyActivityCountsError: null | string;
  loadMyActivityPostsLoading: boolean;
  loadMyActivityPostsDone: boolean;
  loadMyActivityPostsError: null | string;
  readActivityLoading: boolean;
  readActivityDone: boolean;
  readActivityError: null | string;
  loadMyInteractionsPostsLoading: boolean;
  loadMyInteractionsPostsDone: boolean;
  loadMyInteractionsPostsError: null | string;
  deleteMyInteractionsPostsLoading: boolean;
  deleteMyInteractionsPostsDone: boolean;
  deleteMyInteractionsPostsError: null | string;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: null | string;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deletePostError: null | string;
  postUploadImagesLoading: boolean;
  postUploadImagesDone: boolean;
  postUploadImagesError: null | string;
  editPostUploadImagesLoading: boolean;
  editPostUploadImagesDone: boolean;
  editPostUploadImagesError: null | string;
  loadCommentsLoading: boolean;
  loadCommentsDone: boolean;
  loadCommentsError: null | string;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: null | string;
  commentUploadImageLoading: boolean;
  commentUploadImageDone: boolean;
  commentUploadImageError: null | string;
  editCommentLoading: boolean;
  editCommentDone: boolean;
  editCommentError: null | string;
  editCommentUploadImageLoading: boolean;
  editCommentUploadImageDone: boolean;
  editCommentUploadImageError: null | string;
  deleteCommentLoading: boolean;
  deleteCommentDone: boolean;
  deleteCommentError: null | string;
  loadModalCommentsLoading: boolean;
  loadModalCommentsDone: boolean;
  loadModalCommentsError: null | string;
  addModalCommentLoading: boolean;
  addModalCommentDone: boolean;
  addModalCommentError: null | string;
  modalCommentUploadImageLoading: boolean;
  modalCommentUploadImageDone: boolean;
  modalCommentUploadImageError: null | string;
  editModalCommentLoading: boolean;
  editModalCommentDone: boolean;
  editModalCommentError: null | string;
  editModalCommentUploadImageLoading: boolean;
  editModalCommentUploadImageDone: boolean;
  editModalCommentUploadImageError: null | string;
  deleteModalCommentLoading: boolean;
  deleteModalCommentDone: boolean;
  deleteModalCommentError: null | string;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: null | string;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: null | string;
  isCommentListVisible: boolean;
  isModalCommentListVisible: boolean;
  isCarouselVisible: boolean;
  isPostModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isPreviewVisible: boolean;
};

export interface initializeSearchPostsAction {
  type: typeof INITIALIZE_SEARCH_POSTS;
}

export interface searchPostsRequestAction {
  type: typeof SEARCH_POSTS_REQUEST;
  keyword: string;
  lastId?: number;
  lastLikeCount?: number;
  lastCommentCount?: number;
}

export interface searchPostsSuccessAction {
  type: typeof SEARCH_POSTS_SUCCESS;
  data: Post[];
}

export interface searchPostsFailureAction {
  type: typeof SEARCH_POSTS_FAILURE;
  error: string;
}

export interface initializePostListAction {
  type: typeof INITIALIZE_POST_LIST;
}

export interface loadNewPostsRequestAction {
  type: typeof LOAD_NEW_POSTS_REQUEST;
  lastId?: number;
}

export interface loadNewPostsSuccessAction {
  type: typeof LOAD_NEW_POSTS_SUCCESS;
  data: Post[];
}

export interface loadNewPostsFailureAction {
  type: typeof LOAD_NEW_POSTS_FAILURE;
  error: string;
}

export interface loadBestPostsRequestAction {
  type: typeof LOAD_BEST_POSTS_REQUEST;
  lastId?: number;
  lastLikeCount?: number;
  lastCommentCount?: number;
}

export interface loadBestPostsSuccessAction {
  type: typeof LOAD_BEST_POSTS_SUCCESS;
  data: Post[];
}

export interface loadBestPostsFailureAction {
  type: typeof LOAD_BEST_POSTS_FAILURE;
  error: string;
}

export interface loadFollowingPostsRequestAction {
  type: typeof LOAD_FOLLOWING_POSTS_REQUEST;
  lastCreatedAt?: string;
  limit?: number;
}

export interface loadFollowingPostsSuccessAction {
  type: typeof LOAD_FOLLOWING_POSTS_SUCCESS;
  data: Post[];
}

export interface loadFollowingPostsFailureAction {
  type: typeof LOAD_FOLLOWING_POSTS_FAILURE;
  error: string;
}

export interface loadPostRequestAction {
  type: typeof LOAD_POST_REQUEST;
  postId: number;
}

export interface loadPostSuccessAction {
  type: typeof LOAD_POST_SUCCESS;
  data: Post;
}

export interface loadPostFailureAction {
  type: typeof LOAD_POST_FAILURE;
  error: string;
}

export interface initializeUserPosts {
  type: typeof INITIALIZE_USER_POSTS;
}

export interface loadUserPostsRequestAction {
  type: typeof LOAD_USER_POSTS_REQUEST;
  userId: number;
  lastId?: number;
}

export interface loadUserPostsSuccessAction {
  type: typeof LOAD_USER_POSTS_SUCCESS;
  data: Post[];
}

export interface loadUserPostsFailureAction {
  type: typeof LOAD_USER_POSTS_FAILURE;
  error: string;
}

export interface deleteFollowingUserPostsAction {
  type: typeof DELETE_FOLLOWING_USER_POSTS;
  data: number;
}

export interface loadMyActivityCountsRequestAction {
  type: typeof LOAD_MY_ACTIVITY_COUNTS_REQUEST;
}

export interface loadMyActivityCountsSuccessAction {
  type: typeof LOAD_MY_ACTIVITY_COUNTS_SUCCESS;
  data: ActivityCounts;
}

export interface loadMyActivityCountsFailureAction {
  type: typeof LOAD_MY_ACTIVITY_COUNTS_FAILURE;
  error: string;
}

export interface loadMyActivityPostsRequestAction {
  type: typeof LOAD_MY_ACTIVITY_POSTS_REQUEST;
  lastId?: number;
}

export interface loadMyActivityPostsSuccessAction {
  type: typeof LOAD_MY_ACTIVITY_POSTS_SUCCESS;
  data: any;
}

export interface loadMyActivityPostsFailureAction {
  type: typeof LOAD_MY_ACTIVITY_POSTS_FAILURE;
  error: string;
}

export interface readActivityRequestAction {
  type: typeof READ_ACTIVITY_REQUEST;
  targetId: 'all' | number;
}

export interface readActivitySuccessAction {
  type: typeof READ_ACTIVITY_SUCCESS;
  data: 'all' | number;
}

export interface readActivityFailureAction {
  type: typeof READ_ACTIVITY_FAILURE;
  error: string;
}

export interface loadMyInteractionsPostsRequestAction {
  type: typeof LOAD_MY_INTERACTIONS_POSTS_REQUEST;
  menu: 'all' | 'like' | 'comment';
  sortBy: 'best' | 'new';
}

export interface loadMyInteractionsPostsSuccessAction {
  type: typeof LOAD_MY_INTERACTIONS_POSTS_SUCCESS;
  data: UserHistoryPost[];
}

export interface loadMyInteractionsPostsFailureAction {
  type: typeof LOAD_MY_INTERACTIONS_POSTS_FAILURE;
  error: string;
}

export interface deleteMyInteractionsPostsRequestAction {
  type: typeof DELETE_MY_INTERACTIONS_POSTS_REQUEST;
  menu: 'all' | 'like' | 'comment';
  id: number[];
}

export interface deleteMyInteractionsPostsSuccessAction {
  type: typeof DELETE_MY_INTERACTIONS_POSTS_SUCCESS;
  data: number[];
}

export interface deleteMyInteractionsPostsFailureAction {
  type: typeof DELETE_MY_INTERACTIONS_POSTS_FAILURE;
  error: string;
}

export interface addPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: FormData;
}

export interface addPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  data: Post;
}

export interface addPostFailureAction {
  type: typeof ADD_POST_FAILURE;
  error: string;
}

export interface editPostRequestAction {
  type: typeof EDIT_POST_REQUEST;
  data: FormData;
}

export interface editPostSuccessAction {
  type: typeof EDIT_POST_SUCCESS;
  data: Post;
}

export interface editPostFailureAction {
  type: typeof EDIT_POST_FAILURE;
  error: string;
}

export interface deletePostRequestAction {
  type: typeof DELETE_POST_REQUEST;
  data: number;
}

export interface deletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  data: number;
}

export interface deletePostFailureAction {
  type: typeof DELETE_POST_FAILURE;
  error: string;
}

export interface postUploadImagesRequestAction {
  type: typeof POST_UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface postUploadImagesSuccessAction {
  type: typeof POST_UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface postUploadImagesFailureAction {
  type: typeof POST_UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface postRemoveUploadedImageAction {
  type: typeof POST_REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface postReorderUploadedImageAction {
  type: typeof POST_REORDER_UPLOADED_IMAGE;
  data: string[];
}

export interface editPostUploadImagesRequestAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface editPostUploadImagesSuccessAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface editPostUploadImagesFailureAction {
  type: typeof EDIT_POST_UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface editPostRemoveUploadedImageAction {
  type: typeof EDIT_POST_REMOVE_UPLOADED_IMAGE;
  data: string;
}

export interface editPostReorderUploadedImageAction {
  type: typeof EDIT_POST_REORDER_UPLOADED_IMAGE;
  data: string[];
}

export interface loadCommentsRequestAction {
  type: typeof LOAD_COMMENTS_REQUEST;
  data: number;
}

export interface loadCommentsSuccessAction {
  type: typeof LOAD_COMMENTS_SUCCESS;
  data: Comment[];
}

export interface loadCommentsFailureAction {
  type: typeof LOAD_COMMENTS_FAILURE;
  error: string;
}

export interface addCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST;
  data: FormData;
}

export interface addCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface addCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE;
  error: string;
}

export interface commentUploadImageRequestAction {
  type: typeof COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface commentUploadImageSuccessAction {
  type: typeof COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface commentUploadImageFailureAction {
  type: typeof COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface commentRemoveUploadedImageAction {
  type: typeof COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface editCommentRequestAction {
  type: typeof EDIT_COMMENT_REQUEST;
  data: FormData;
}

export interface editCommentSuccessAction {
  type: typeof EDIT_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface editCommentFailureAction {
  type: typeof EDIT_COMMENT_FAILURE;
  error: string;
}

export interface editCommentUploadImageRequestAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface editCommentUploadImageSuccessAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface editCommentUploadImageFailureAction {
  type: typeof EDIT_COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface editCommentRemoveUploadedImageAction {
  type: typeof EDIT_COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface deleteCommentRequestAction {
  type: typeof DELETE_COMMENT_REQUEST;
  data: DeleteInfo;
}

export interface deleteCommentSuccessAction {
  type: typeof DELETE_COMMENT_SUCCESS;
  data: ResponseDeleteComment;
}

export interface deleteCommentFailureAction {
  type: typeof DELETE_COMMENT_FAILURE;
  error: string;
}

export interface loadModalCommentsRequestAction {
  type: typeof LOAD_MODAL_COMMENTS_REQUEST;
  data: number;
}

export interface loadModalCommentsSuccessAction {
  type: typeof LOAD_MODAL_COMMENTS_SUCCESS;
  data: Comment[];
}

export interface loadModalCommentsFailureAction {
  type: typeof LOAD_MODAL_COMMENTS_FAILURE;
  error: string;
}

export interface addModalCommentRequestAction {
  type: typeof ADD_MODAL_COMMENT_REQUEST;
  data: FormData;
}

export interface addModalCommentSuccessAction {
  type: typeof ADD_MODAL_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface addModalCommentFailureAction {
  type: typeof ADD_MODAL_COMMENT_FAILURE;
  error: string;
}

export interface modalCommentUploadImageRequestAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface modalCommentUploadImageSuccessAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface modalCommentUploadImageFailureAction {
  type: typeof MODAL_COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface modalCommentRemoveUploadedImageAction {
  type: typeof MODAL_COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface editModalCommentRequestAction {
  type: typeof EDIT_MODAL_COMMENT_REQUEST;
  data: FormData;
}

export interface editModalCommentSuccessAction {
  type: typeof EDIT_MODAL_COMMENT_SUCCESS;
  data: ResponseComment;
}

export interface editModalCommentFailureAction {
  type: typeof EDIT_MODAL_COMMENT_FAILURE;
  error: string;
}

export interface editModalCommentUploadImageRequestAction {
  type: typeof EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST;
  data: FormData;
}

export interface editModalCommentUploadImageSuccessAction {
  type: typeof EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS;
  data: string[];
}

export interface editModalCommentUploadImageFailureAction {
  type: typeof EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE;
  error: string;
}

export interface editModalCommentRemoveUploadedImageAction {
  type: typeof EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE;
}

export interface deleteModalCommentRequestAction {
  type: typeof DELETE_MODAL_COMMENT_REQUEST;
  data: DeleteInfo;
}

export interface deleteModalCommentSuccessAction {
  type: typeof DELETE_MODAL_COMMENT_SUCCESS;
  data: ResponseDeleteComment;
}

export interface deleteModalCommentFailureAction {
  type: typeof DELETE_MODAL_COMMENT_FAILURE;
  error: string;
}

export interface likePostRequestAction {
  type: typeof LIKE_POST_REQUEST;
  data: number;
}

export interface likePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
  data: ResponseLike;
}

export interface likePostFailureAction {
  type: typeof LIKE_POST_FAILURE;
  error: string;
}

export interface unLikePostRequestAction {
  type: typeof UNLIKE_POST_REQUEST;
  data: number;
}

export interface unLikePostSuccessAction {
  type: typeof UNLIKE_POST_SUCCESS;
  data: ResponseLike;
}

export interface unLikePostFailureAction {
  type: typeof UNLIKE_POST_FAILURE;
  error: string;
}

export interface ShowCommentListAction {
  type: typeof SHOW_COMMENT_LIST;
  data: number;
}

export interface HideCommentListAction {
  type: typeof HIDE_COMMENT_LIST;
}

export interface showModalCommentListAction {
  type: typeof SHOW_MODAL_COMMENT_LIST;
}

export interface hideModalCommentListAction {
  type: typeof HIDE_MODAL_COMMENT_LIST;
}

export interface showImagePreviewAction {
  type: typeof SHOW_IMAGE_PREVIEW;
  data: string;
}

export interface hideImagePreviewAction {
  type: typeof HIDE_IMAGE_PREVIEW;
}

export interface ShowPostCarouselAction {
  type: typeof SHOW_POST_CAROUSEL;
  data: Image[];
}

export interface HidePostCarouselAction {
  type: typeof HIDE_POST_CAROUSEL;
}

export interface ShowPostModalAction {
  type: typeof SHOW_POST_MODAL;
  data: Post;
}

export interface HidePostModalAction {
  type: typeof HIDE_POST_MODAL;
}

export interface executePostEditAction {
  type: typeof EXECUTE_POST_EDIT;
}

export interface cancelPostEditAction {
  type: typeof CANCEL_POST_EDIT;
}

export interface ShowDeleteModalAction {
  type: typeof SHOW_DELETE_MODAL;
  data: DeleteInfo;
}

export interface HideDeleteModalAction {
  type: typeof HIDE_DELETE_MODAL;
}

export interface executeCommentEditAction {
  type: typeof EXECUTE_COMMENT_EDIT;
  data: string;
}

export interface executeModalCommentEditAction {
  type: typeof EXECUTE_MODAL_COMMENT_EDIT;
  data: string;
}

export interface SetActivityFocusedCommentAction {
  type: typeof SET_ACTIVITY_FOCUSED_COMMENT;
  data: FocusedComment;
}

export type PostAction =
  | initializePostListAction
  | ShowCommentListAction
  | HideCommentListAction
  | ShowPostModalAction
  | HidePostModalAction
  | ShowPostCarouselAction
  | HidePostCarouselAction
  | loadNewPostsRequestAction
  | loadNewPostsSuccessAction
  | loadNewPostsFailureAction
  | loadBestPostsRequestAction
  | loadBestPostsSuccessAction
  | loadBestPostsFailureAction
  | loadFollowingPostsRequestAction
  | loadFollowingPostsSuccessAction
  | loadFollowingPostsFailureAction
  | deleteFollowingUserPostsAction
  | loadMyActivityCountsRequestAction
  | loadMyActivityCountsSuccessAction
  | loadMyActivityCountsFailureAction
  | loadMyActivityPostsRequestAction
  | loadMyActivityPostsSuccessAction
  | loadMyActivityPostsFailureAction
  | readActivityRequestAction
  | readActivitySuccessAction
  | readActivityFailureAction
  | loadMyInteractionsPostsRequestAction
  | loadMyInteractionsPostsSuccessAction
  | loadMyInteractionsPostsFailureAction
  | deleteMyInteractionsPostsRequestAction
  | deleteMyInteractionsPostsSuccessAction
  | deleteMyInteractionsPostsFailureAction
  | addPostRequestAction
  | addPostSuccessAction
  | addPostFailureAction
  | editPostRequestAction
  | editPostSuccessAction
  | editPostFailureAction
  | deletePostRequestAction
  | deletePostSuccessAction
  | deletePostFailureAction
  | postUploadImagesRequestAction
  | postUploadImagesSuccessAction
  | postUploadImagesFailureAction
  | postRemoveUploadedImageAction
  | editPostUploadImagesRequestAction
  | editPostUploadImagesSuccessAction
  | editPostUploadImagesFailureAction
  | editPostRemoveUploadedImageAction
  | loadCommentsRequestAction
  | loadCommentsSuccessAction
  | loadCommentsFailureAction
  | addCommentRequestAction
  | addCommentSuccessAction
  | addCommentFailureAction
  | commentUploadImageRequestAction
  | commentUploadImageSuccessAction
  | commentUploadImageFailureAction
  | commentRemoveUploadedImageAction
  | loadModalCommentsRequestAction
  | loadModalCommentsSuccessAction
  | loadModalCommentsFailureAction
  | modalCommentUploadImageRequestAction
  | modalCommentUploadImageSuccessAction
  | modalCommentUploadImageFailureAction
  | modalCommentRemoveUploadedImageAction
  | editCommentRequestAction
  | editCommentSuccessAction
  | editCommentFailureAction
  | editCommentUploadImageRequestAction
  | editCommentUploadImageSuccessAction
  | editCommentUploadImageFailureAction
  | editCommentRemoveUploadedImageAction
  | deleteCommentRequestAction
  | deleteCommentSuccessAction
  | deleteCommentFailureAction
  | addModalCommentRequestAction
  | addModalCommentSuccessAction
  | addModalCommentFailureAction
  | ShowDeleteModalAction
  | HideDeleteModalAction
  | executePostEditAction
  | cancelPostEditAction
  | executeCommentEditAction
  | showModalCommentListAction
  | hideModalCommentListAction
  | deleteModalCommentRequestAction
  | deleteModalCommentSuccessAction
  | deleteModalCommentFailureAction
  | editModalCommentUploadImageRequestAction
  | editModalCommentUploadImageSuccessAction
  | editModalCommentUploadImageFailureAction
  | editModalCommentRemoveUploadedImageAction
  | likePostRequestAction
  | likePostSuccessAction
  | likePostFailureAction
  | unLikePostRequestAction
  | unLikePostSuccessAction
  | unLikePostFailureAction
  | executeModalCommentEditAction
  | editModalCommentRequestAction
  | editModalCommentSuccessAction
  | editModalCommentFailureAction
  | SetActivityFocusedCommentAction
  | loadUserPostsRequestAction
  | loadUserPostsSuccessAction
  | loadUserPostsFailureAction
  | initializeSearchPostsAction
  | searchPostsRequestAction
  | searchPostsSuccessAction
  | searchPostsFailureAction
  | loadPostRequestAction
  | loadPostSuccessAction
  | loadPostFailureAction
  | initializeUserPosts
  | postReorderUploadedImageAction
  | editPostReorderUploadedImageAction
  | showImagePreviewAction
  | hideImagePreviewAction;
