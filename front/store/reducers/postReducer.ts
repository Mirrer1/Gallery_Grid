import { produce } from 'immer';

import {
  PostAction,
  PostState,
  INITIALIZE_SEARCH_POSTS,
  SHOW_COMMENT_LIST,
  HIDE_COMMENT_LIST,
  SHOW_POST_MODAL,
  HIDE_POST_MODAL,
  SHOW_POST_CAROUSEL,
  HIDE_POST_CAROUSEL,
  LOAD_NEW_POSTS_REQUEST,
  LOAD_NEW_POSTS_SUCCESS,
  LOAD_NEW_POSTS_FAILURE,
  LOAD_BEST_POSTS_REQUEST,
  LOAD_BEST_POSTS_SUCCESS,
  LOAD_BEST_POSTS_FAILURE,
  LOAD_FOLLOWING_POSTS_REQUEST,
  LOAD_FOLLOWING_POSTS_SUCCESS,
  LOAD_FOLLOWING_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_MY_ACTIVITY_POSTS_REQUEST,
  LOAD_MY_ACTIVITY_POSTS_SUCCESS,
  LOAD_MY_ACTIVITY_POSTS_FAILURE,
  LOAD_MY_INTERACTIONS_POSTS_REQUEST,
  LOAD_MY_INTERACTIONS_POSTS_SUCCESS,
  LOAD_MY_INTERACTIONS_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  POST_UPLOAD_IMAGES_REQUEST,
  POST_UPLOAD_IMAGES_SUCCESS,
  POST_UPLOAD_IMAGES_FAILURE,
  POST_REMOVE_UPLOADED_IMAGE,
  EDIT_POST_UPLOAD_IMAGES_REQUEST,
  EDIT_POST_UPLOAD_IMAGES_SUCCESS,
  EDIT_POST_UPLOAD_IMAGES_FAILURE,
  EDIT_POST_REMOVE_UPLOADED_IMAGE,
  COMMENT_UPLOAD_IMAGE_REQUEST,
  COMMENT_UPLOAD_IMAGE_SUCCESS,
  COMMENT_UPLOAD_IMAGE_FAILURE,
  COMMENT_REMOVE_UPLOADED_IMAGE,
  MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
  MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
  MODAL_COMMENT_REMOVE_UPLOADED_IMAGE,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  EXECUTE_POST_EDIT,
  CANCEL_POST_EDIT,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  IReplyComment,
  EXECUTE_COMMENT_EDIT,
  EDIT_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS,
  EDIT_COMMENT_UPLOAD_IMAGE_FAILURE,
  EDIT_COMMENT_REMOVE_UPLOADED_IMAGE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_MODAL_COMMENT_REQUEST,
  EDIT_MODAL_COMMENT_SUCCESS,
  EDIT_MODAL_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  LOAD_MODAL_COMMENTS_REQUEST,
  LOAD_MODAL_COMMENTS_SUCCESS,
  LOAD_MODAL_COMMENTS_FAILURE,
  ADD_MODAL_COMMENT_REQUEST,
  ADD_MODAL_COMMENT_SUCCESS,
  ADD_MODAL_COMMENT_FAILURE,
  DELETE_MODAL_COMMENT_REQUEST,
  DELETE_MODAL_COMMENT_SUCCESS,
  DELETE_MODAL_COMMENT_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  SHOW_MODAL_COMMENT_LIST,
  HIDE_MODAL_COMMENT_LIST,
  EXECUTE_MODAL_COMMENT_EDIT,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS,
  EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE,
  EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE,
  DELETE_MY_INTERACTIONS_POSTS_REQUEST,
  DELETE_MY_INTERACTIONS_POSTS_SUCCESS,
  DELETE_MY_INTERACTIONS_POSTS_FAILURE,
  LOAD_MY_ACTIVITY_COUNTS_REQUEST,
  LOAD_MY_ACTIVITY_COUNTS_SUCCESS,
  LOAD_MY_ACTIVITY_COUNTS_FAILURE,
  READ_ACTIVITY_REQUEST,
  READ_ACTIVITY_SUCCESS,
  READ_ACTIVITY_FAILURE,
  INITIALIZE_POST_LIST,
  DELETE_FOLLOWING_USER_POSTS,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  INITIALIZE_USER_POSTS,
  SET_ACTIVITY_FOCUSED_COMMENT,
  POST_REORDER_UPLOADED_IMAGE,
  EDIT_POST_REORDER_UPLOADED_IMAGE,
  SHOW_IMAGE_PREVIEW,
  HIDE_IMAGE_PREVIEW
} from 'store/types/postType';

export const initialState: PostState = {
  timelinePosts: [],
  userPosts: [],
  searchPosts: [],
  myActivityCounts: { like: 0, comment: 0, follow: 0 },
  myActivityPosts: [],
  galleryPosts: [],
  singlePost: null,
  previewImagePath: null,
  postCarousel: [],
  postImagePaths: [],
  editPostImagePaths: [],
  commentImagePath: [],
  editCommentImagePath: [],
  modalCommentImagePath: [],
  editModalCommentImagePath: [],
  postEditMode: false,
  deleteInfo: null,
  mainComments: [],
  modalComments: [],
  lastChangedCommentId: null,
  lastChangedModalCommentId: null,
  focusedComment: null,
  commentVisiblePostId: null,
  hasMoreTimelinePosts: true,
  hasMoreUserPosts: true,
  hasMoreSearchPosts: true,
  hasMoreMyActivityPosts: true,
  isCategoryChanged: false,
  searchPostsLoading: false,
  searchPostsDone: false,
  searchPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadNewPostsLoading: false,
  loadNewPostsDone: false,
  loadNewPostsError: null,
  loadBestPostsLoading: false,
  loadBestPostsDone: false,
  loadBestPostsError: null,
  loadFollowingPostsLoading: false,
  loadFollowingPostsDone: false,
  loadFollowingPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  loadMyActivityCountsLoading: false,
  loadMyActivityCountsDone: false,
  loadMyActivityCountsError: null,
  loadMyActivityPostsLoading: false,
  loadMyActivityPostsDone: false,
  loadMyActivityPostsError: null,
  readActivityLoading: false,
  readActivityDone: false,
  readActivityError: null,
  loadMyInteractionsPostsLoading: false,
  loadMyInteractionsPostsDone: false,
  loadMyInteractionsPostsError: null,
  deleteMyInteractionsPostsLoading: false,
  deleteMyInteractionsPostsDone: false,
  deleteMyInteractionsPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  postUploadImagesLoading: false,
  postUploadImagesDone: false,
  postUploadImagesError: null,
  editPostUploadImagesLoading: false,
  editPostUploadImagesDone: false,
  editPostUploadImagesError: null,
  loadCommentsLoading: false,
  loadCommentsDone: false,
  loadCommentsError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  commentUploadImageLoading: false,
  commentUploadImageDone: false,
  commentUploadImageError: null,
  editCommentLoading: false,
  editCommentDone: false,
  editCommentError: null,
  editCommentUploadImageLoading: false,
  editCommentUploadImageDone: false,
  editCommentUploadImageError: null,
  deleteCommentLoading: false,
  deleteCommentDone: false,
  deleteCommentError: null,
  loadModalCommentsLoading: false,
  loadModalCommentsDone: false,
  loadModalCommentsError: null,
  addModalCommentLoading: false,
  addModalCommentDone: false,
  addModalCommentError: null,
  modalCommentUploadImageLoading: false,
  modalCommentUploadImageDone: false,
  modalCommentUploadImageError: null,
  editModalCommentLoading: false,
  editModalCommentDone: false,
  editModalCommentError: null,
  editModalCommentUploadImageLoading: false,
  editModalCommentUploadImageDone: false,
  editModalCommentUploadImageError: null,
  deleteModalCommentLoading: false,
  deleteModalCommentDone: false,
  deleteModalCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
  isCommentListVisible: false,
  isModalCommentListVisible: false,
  isCarouselVisible: false,
  isPostModalVisible: false,
  isDeleteModalVisible: false,
  isPreviewVisible: false
};

const reducer = (state: PostState = initialState, action: PostAction): PostState => {
  return produce(state, draft => {
    switch (action.type) {
      case INITIALIZE_SEARCH_POSTS:
        draft.searchPosts = [];
        draft.hasMoreSearchPosts = true;
        break;
      case SEARCH_POSTS_REQUEST:
        draft.searchPostsLoading = true;
        draft.searchPostsDone = false;
        draft.searchPostsError = null;
        break;
      case SEARCH_POSTS_SUCCESS:
        draft.searchPostsLoading = false;
        draft.searchPostsDone = true;
        draft.searchPosts = draft.searchPosts.concat(action.data);
        draft.hasMoreSearchPosts = action.data.length === 12;
        break;
      case SEARCH_POSTS_FAILURE:
        draft.searchPostsLoading = false;
        draft.searchPostsError = action.error;
        break;
      case INITIALIZE_POST_LIST:
        draft.timelinePosts = [];
        draft.hasMoreTimelinePosts = true;
        draft.isCategoryChanged = true;
        break;
      case LOAD_NEW_POSTS_REQUEST:
        draft.loadNewPostsLoading = true;
        draft.loadNewPostsDone = false;
        draft.loadNewPostsError = null;
        break;
      case LOAD_NEW_POSTS_SUCCESS:
        draft.loadNewPostsLoading = false;
        draft.loadNewPostsDone = true;
        draft.timelinePosts = draft.timelinePosts.concat(action.data);
        draft.hasMoreTimelinePosts = action.data.length === 10;
        break;
      case LOAD_NEW_POSTS_FAILURE:
        draft.loadNewPostsLoading = false;
        draft.loadNewPostsError = action.error;
        break;
      case LOAD_BEST_POSTS_REQUEST:
        draft.loadBestPostsLoading = true;
        draft.loadBestPostsDone = false;
        draft.loadBestPostsError = null;
        break;
      case LOAD_BEST_POSTS_SUCCESS:
        draft.loadBestPostsLoading = false;
        draft.loadBestPostsDone = true;
        draft.timelinePosts = draft.timelinePosts.concat(action.data);
        draft.hasMoreTimelinePosts = action.data.length === 10;
        break;
      case LOAD_BEST_POSTS_FAILURE:
        draft.loadBestPostsLoading = false;
        draft.loadBestPostsError = action.error;
        break;
      case LOAD_FOLLOWING_POSTS_REQUEST:
        draft.loadFollowingPostsLoading = true;
        draft.loadFollowingPostsDone = false;
        draft.loadFollowingPostsError = null;
        break;
      case LOAD_FOLLOWING_POSTS_SUCCESS:
        draft.loadFollowingPostsLoading = false;
        draft.loadFollowingPostsDone = true;
        draft.timelinePosts = draft.timelinePosts.concat(action.data);
        draft.hasMoreTimelinePosts = action.data.length === 10;
        break;
      case LOAD_FOLLOWING_POSTS_FAILURE:
        draft.loadFollowingPostsLoading = false;
        draft.loadFollowingPostsError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.isPostModalVisible = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case INITIALIZE_USER_POSTS:
        draft.userPosts = [];
        draft.hasMoreUserPosts = true;
        break;
      case LOAD_USER_POSTS_REQUEST:
        draft.loadUserPostsLoading = true;
        draft.loadUserPostsDone = false;
        draft.loadUserPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
        draft.loadUserPostsLoading = false;
        draft.loadUserPostsDone = true;
        draft.userPosts = draft.userPosts.concat(action.data);
        draft.hasMoreUserPosts = action.data.length === 14;
        break;
      case LOAD_USER_POSTS_FAILURE:
        draft.loadUserPostsLoading = false;
        draft.loadUserPostsError = action.error;
        break;
      case DELETE_FOLLOWING_USER_POSTS:
        draft.timelinePosts = draft.timelinePosts.filter(post => post.User.id !== action.data);
        break;
      case LOAD_MY_ACTIVITY_COUNTS_REQUEST:
        draft.loadMyActivityCountsLoading = true;
        draft.loadMyActivityCountsDone = false;
        draft.loadMyActivityCountsError = null;
        break;
      case LOAD_MY_ACTIVITY_COUNTS_SUCCESS:
        draft.loadMyActivityCountsLoading = false;
        draft.loadMyActivityCountsDone = true;
        draft.myActivityCounts = action.data;
        break;
      case LOAD_MY_ACTIVITY_COUNTS_FAILURE:
        draft.loadMyActivityCountsLoading = false;
        draft.loadMyActivityCountsError = action.error;
        break;
      case LOAD_MY_ACTIVITY_POSTS_REQUEST:
        draft.loadMyActivityPostsLoading = true;
        draft.loadMyActivityPostsDone = false;
        draft.loadMyActivityPostsError = null;
        break;
      case LOAD_MY_ACTIVITY_POSTS_SUCCESS:
        draft.loadMyActivityPostsLoading = false;
        draft.loadMyActivityPostsDone = true;
        draft.myActivityPosts = draft.myActivityPosts.concat(action.data);
        draft.hasMoreMyActivityPosts = action.data.length === 10;
        break;
      case LOAD_MY_ACTIVITY_POSTS_FAILURE:
        draft.loadMyActivityPostsLoading = false;
        draft.loadMyActivityPostsError = action.error;
        break;
      case READ_ACTIVITY_REQUEST:
        draft.readActivityLoading = true;
        draft.readActivityDone = false;
        draft.readActivityError = null;
        break;
      case READ_ACTIVITY_SUCCESS:
        draft.readActivityLoading = false;
        draft.readActivityDone = true;
        if (action.data === 'all') {
          draft.myActivityPosts = [];
          draft.myActivityCounts = { like: 0, comment: 0, follow: 0 };
        } else {
          const index = draft.myActivityPosts.findIndex(post => post.id === action.data);

          if (index !== -1) {
            const postType = draft.myActivityPosts[index].type;
            draft.myActivityPosts.splice(index, 1);

            if (postType === 'like') {
              draft.myActivityCounts.like = Math.max(0, draft.myActivityCounts.like - 1);
            } else if (postType === 'comment' || postType === 'replyComment') {
              draft.myActivityCounts.comment = Math.max(0, draft.myActivityCounts.comment - 1);
            } else if (postType === 'follow') {
              draft.myActivityCounts.follow = Math.max(0, draft.myActivityCounts.follow - 1);
            }
          }
        }
        break;
      case READ_ACTIVITY_FAILURE:
        draft.readActivityLoading = false;
        draft.readActivityError = action.error;
        break;
      case LOAD_MY_INTERACTIONS_POSTS_REQUEST:
        draft.loadMyInteractionsPostsLoading = true;
        draft.loadMyInteractionsPostsDone = false;
        draft.loadMyInteractionsPostsError = null;
        break;
      case LOAD_MY_INTERACTIONS_POSTS_SUCCESS:
        draft.loadMyInteractionsPostsLoading = false;
        draft.loadMyInteractionsPostsDone = true;
        draft.galleryPosts = action.data;
        break;
      case LOAD_MY_INTERACTIONS_POSTS_FAILURE:
        draft.loadMyInteractionsPostsLoading = false;
        draft.loadMyInteractionsPostsError = action.error;
        break;
      case DELETE_MY_INTERACTIONS_POSTS_REQUEST:
        draft.deleteMyInteractionsPostsLoading = true;
        draft.deleteMyInteractionsPostsDone = false;
        draft.deleteMyInteractionsPostsError = null;
        break;
      case DELETE_MY_INTERACTIONS_POSTS_SUCCESS:
        draft.deleteMyInteractionsPostsLoading = false;
        draft.deleteMyInteractionsPostsDone = true;
        draft.isDeleteModalVisible = false;
        draft.galleryPosts = draft.galleryPosts.filter(post => !action.data.includes(post.id));
        break;
      case DELETE_MY_INTERACTIONS_POSTS_FAILURE:
        draft.deleteMyInteractionsPostsLoading = false;
        draft.deleteMyInteractionsPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.timelinePosts.unshift(action.data);
        draft.postImagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS:
        draft.editPostLoading = false;
        draft.editPostDone = true;
        draft.postEditMode = false;
        draft.isModalCommentListVisible = false;
        draft.singlePost = action.data;

        const postIndex = draft.timelinePosts.findIndex(post => post.id === action.data.id);
        if (postIndex !== -1) draft.timelinePosts[postIndex] = action.data;

        const galleryPostIndex = draft.galleryPosts.findIndex(post => post.Post.id === action.data.id);
        if (galleryPostIndex !== -1) draft.galleryPosts[galleryPostIndex].Post = action.data;

        const userPostIndex = draft.userPosts.findIndex(post => post.id === action.data.id);
        if (userPostIndex !== -1) draft.userPosts[userPostIndex] = action.data;

        const searchPostIndex = draft.searchPosts.findIndex(post => post.id === action.data.id);
        if (searchPostIndex !== -1) draft.searchPosts[searchPostIndex] = action.data;

        draft.myActivityPosts.forEach(activity => {
          if (activity.Post.id === action.data.id) {
            activity.Post = {
              ...activity.Post,
              ...action.data
            };
          }
        });
        break;
      case EDIT_POST_FAILURE:
        draft.editPostLoading = false;
        draft.editPostError = action.error;
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS: {
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.isPostModalVisible = false;
        draft.isDeleteModalVisible = false;
        if (draft.commentVisiblePostId === action.data) {
          draft.isCommentListVisible = false;
          draft.commentVisiblePostId = null;
          draft.commentImagePath = [];
        }

        const index = draft.timelinePosts.findIndex(post => post.id === action.data);
        if (index !== -1) draft.timelinePosts.splice(index, 1);

        const userPostIndex = draft.userPosts.findIndex(post => post.id === action.data);
        if (userPostIndex !== -1) draft.userPosts.splice(userPostIndex, 1);

        const galleryIndex = draft.galleryPosts.findIndex(post => post.Post.id === action.data);
        if (galleryIndex !== -1) draft.galleryPosts.splice(galleryIndex, 1);

        const searchPostIndex = draft.searchPosts.findIndex(post => post.id === action.data);
        if (searchPostIndex !== -1) draft.searchPosts.splice(searchPostIndex, 1);

        draft.myActivityPosts = draft.myActivityPosts.filter(post => {
          if (post.Post.id === action.data) {
            if (post.type === 'like') {
              draft.myActivityCounts.like = Math.max(0, draft.myActivityCounts.like - 1);
            }
            if (post.type === 'comment' || post.type === 'replyComment') {
              draft.myActivityCounts.comment = Math.max(0, draft.myActivityCounts.comment - 1);
            }
            if (post.type === 'follow') {
              draft.myActivityCounts.follow = Math.max(0, draft.myActivityCounts.follow - 1);
            }
            return false;
          }
          return true;
        });

        break;
      }
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
        break;
      case POST_UPLOAD_IMAGES_REQUEST:
        draft.postUploadImagesLoading = true;
        draft.postUploadImagesDone = false;
        draft.postUploadImagesError = null;
        break;
      case POST_UPLOAD_IMAGES_SUCCESS:
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesDone = true;
        const combinedImages = [...draft.postImagePaths, ...action.data];
        draft.postImagePaths = combinedImages.slice(0, 5);
        break;
      case POST_UPLOAD_IMAGES_FAILURE:
        draft.postUploadImagesLoading = false;
        draft.postUploadImagesError = action.error;
        break;
      case POST_REMOVE_UPLOADED_IMAGE:
        draft.postImagePaths = draft.postImagePaths.filter(path => path !== action.data);
        break;
      case POST_REORDER_UPLOADED_IMAGE:
        draft.postImagePaths = action.data;
        break;
      case EDIT_POST_UPLOAD_IMAGES_REQUEST:
        draft.editPostUploadImagesLoading = true;
        draft.editPostUploadImagesDone = false;
        draft.editPostUploadImagesError = null;
        break;
      case EDIT_POST_UPLOAD_IMAGES_SUCCESS:
        draft.editPostUploadImagesLoading = false;
        draft.editPostUploadImagesDone = true;
        const combinedEditImages = [...draft.editPostImagePaths, ...action.data];
        draft.editPostImagePaths = combinedEditImages.slice(0, 5);
        break;
      case EDIT_POST_UPLOAD_IMAGES_FAILURE:
        draft.editPostUploadImagesLoading = false;
        draft.editPostUploadImagesError = action.error;
        break;
      case EDIT_POST_REMOVE_UPLOADED_IMAGE:
        draft.editPostImagePaths = draft.editPostImagePaths.filter(path => path !== action.data);
        break;
      case EDIT_POST_REORDER_UPLOADED_IMAGE:
        draft.editPostImagePaths = action.data;
        break;
      case LOAD_COMMENTS_REQUEST:
        draft.loadCommentsLoading = true;
        draft.loadCommentsDone = false;
        draft.loadCommentsError = null;
        break;
      case LOAD_COMMENTS_SUCCESS:
        draft.loadCommentsLoading = false;
        draft.loadCommentsDone = true;
        draft.mainComments = action.data;
        break;
      case LOAD_COMMENTS_FAILURE:
        draft.loadCommentsLoading = false;
        draft.loadCommentsError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.commentImagePath = [];
        draft.lastChangedCommentId = action.data.comment.id;

        const commentPostIndex = draft.timelinePosts.findIndex(post => post.id === action.data.comment.PostId);
        if (commentPostIndex === -1) break;

        const comments = draft.timelinePosts[commentPostIndex].Comments;
        const parentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

        if (!!action.data.parentId) {
          const parentComment = comments.find(comment => comment.id === parentId);

          if (parentComment) {
            parentComment.Replies = parentComment.Replies || [];
            parentComment.Replies.push({ id: action.data.comment.id });

            const mainParentComment = draft.mainComments?.find(comment => comment.id === parentId);
            if (mainParentComment) {
              mainParentComment.Replies = mainParentComment.Replies || [];
              mainParentComment.Replies.push(action.data.comment as IReplyComment);
            }
          }
        } else {
          comments.push({ id: action.data.comment.id, isDeleted: false, Replies: [] });
          draft.mainComments?.push(action.data.comment);
        }
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.commentUploadImageLoading = true;
        draft.commentUploadImageDone = false;
        draft.commentUploadImageError = null;
        break;
      case COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.commentUploadImageLoading = false;
        draft.commentUploadImageDone = true;
        draft.commentImagePath = action.data;
        break;
      case COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.commentUploadImageLoading = false;
        draft.commentUploadImageError = action.error;
        break;
      case COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.commentImagePath = [];
        break;
      case EDIT_COMMENT_REQUEST:
        draft.editCommentLoading = true;
        draft.editCommentDone = false;
        draft.editCommentError = null;
        break;
      case EDIT_COMMENT_SUCCESS: {
        draft.editCommentLoading = false;
        draft.editCommentDone = true;
        draft.editCommentImagePath = [];
        draft.lastChangedCommentId = action.data.comment.id;

        const commentPostIndex = draft.timelinePosts.findIndex(post => post.id === action.data.comment.PostId);
        if (commentPostIndex === -1) break;

        const comments = draft.timelinePosts[commentPostIndex].Comments;
        const parentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

        if (!!action.data.parentId) {
          const parentComment = comments.find(comment => comment.id === parentId);
          if (parentComment) {
            const replyIndex = parentComment.Replies.findIndex(reply => reply.id === action.data.comment.id);
            if (replyIndex !== -1) {
              parentComment.Replies[replyIndex] = {
                ...parentComment.Replies[replyIndex],
                ...action.data.comment
              };

              const mainParentComment = draft.mainComments?.find(comment => comment.id === parentId);
              if (mainParentComment) {
                const mainReplyIndex = mainParentComment.Replies.findIndex(
                  reply => reply.id === action.data.comment.id
                );
                if (mainReplyIndex !== -1) {
                  mainParentComment.Replies[mainReplyIndex] = {
                    ...mainParentComment.Replies[mainReplyIndex],
                    ...action.data.comment
                  };
                }
              }
            }
          }
        } else {
          const commentIndex = comments.findIndex(comment => comment.id === action.data.comment.id);
          if (commentIndex !== -1) {
            comments[commentIndex] = {
              ...comments[commentIndex],
              ...action.data.comment
            };

            const mainCommentIndex =
              draft.mainComments?.findIndex(comment => comment.id === action.data.comment.id) ?? -1;
            if (mainCommentIndex !== -1 && mainCommentIndex !== undefined) {
              draft.mainComments![mainCommentIndex] = {
                ...draft.mainComments![mainCommentIndex],
                ...action.data.comment
              };
            }
          }
        }
        break;
      }
      case EDIT_COMMENT_FAILURE:
        draft.editCommentLoading = false;
        draft.editCommentError = action.error;
        break;
      case EDIT_COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.editCommentUploadImageLoading = true;
        draft.editCommentUploadImageDone = false;
        draft.editCommentUploadImageError = null;
        break;
      case EDIT_COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.editCommentUploadImageLoading = false;
        draft.editCommentUploadImageDone = true;
        draft.editCommentImagePath = action.data;
        break;
      case EDIT_COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.editCommentUploadImageLoading = false;
        draft.editCommentUploadImageError = action.error;
        break;
      case EDIT_COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.editCommentImagePath = [];
        break;
      case DELETE_COMMENT_REQUEST:
        draft.deleteCommentLoading = true;
        draft.deleteCommentDone = false;
        draft.deleteCommentError = null;
        break;
      case DELETE_COMMENT_SUCCESS: {
        draft.deleteCommentLoading = false;
        draft.deleteCommentDone = true;

        const { id, replyId, hasChild, postId } = action.data;
        const postIndex = draft.timelinePosts.findIndex(post => post.id === postId);
        if (postIndex === -1) break;

        const postComments = draft.timelinePosts[postIndex].Comments;
        if (replyId) {
          const parentComment = postComments.find(comment => comment.id === replyId);
          if (parentComment) {
            parentComment.Replies = parentComment.Replies.filter(reply => reply.id !== id);

            if (draft.mainComments) {
              const mainParentComment = draft.mainComments.find(comment => comment.id === replyId);

              if (mainParentComment) {
                mainParentComment.Replies = mainParentComment.Replies.filter(reply => reply.id !== id);
              }
            }

            if (parentComment.Replies.length === 0 && parentComment.isDeleted) {
              draft.timelinePosts[postIndex].Comments = postComments.filter(comment => comment.id !== replyId);

              if (draft.mainComments) {
                draft.mainComments = draft.mainComments.filter(comment => comment.id !== replyId);
              }
            }
          }
        } else {
          if (hasChild) {
            const commentToUpdate = postComments.find(comment => comment.id === id);
            if (commentToUpdate) commentToUpdate.isDeleted = true;

            if (draft.mainComments) {
              const mainCommentToUpdate = draft.mainComments.find(comment => comment.id === id);
              if (mainCommentToUpdate) mainCommentToUpdate.isDeleted = true;
            }
          } else {
            draft.timelinePosts[postIndex].Comments = postComments.filter(comment => comment.id !== id);

            if (draft.mainComments) {
              draft.mainComments = draft.mainComments.filter(comment => comment.id !== id);
            }
          }
        }
        draft.isDeleteModalVisible = false;
        draft.deleteInfo = null;
        break;
      }
      case DELETE_COMMENT_FAILURE:
        draft.deleteCommentLoading = false;
        draft.deleteCommentError = action.error;
        break;
      case LOAD_MODAL_COMMENTS_REQUEST:
        draft.loadModalCommentsLoading = true;
        draft.loadModalCommentsDone = false;
        draft.loadModalCommentsError = null;
        break;
      case LOAD_MODAL_COMMENTS_SUCCESS:
        draft.loadModalCommentsLoading = false;
        draft.loadModalCommentsDone = true;
        draft.modalComments = action.data;
        break;
      case LOAD_MODAL_COMMENTS_FAILURE:
        draft.loadModalCommentsLoading = false;
        draft.loadModalCommentsError = action.error;
        break;
      case ADD_MODAL_COMMENT_REQUEST:
        draft.addModalCommentLoading = true;
        draft.addModalCommentDone = false;
        draft.addModalCommentError = null;
        break;
      case ADD_MODAL_COMMENT_SUCCESS: {
        draft.addModalCommentLoading = false;
        draft.addModalCommentDone = true;
        draft.modalCommentImagePath = [];
        draft.lastChangedModalCommentId = action.data.comment.id;

        if (draft.singlePost!.id === action.data.comment.PostId) {
          const modalComments = draft.singlePost!.Comments || [];
          const modalParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (modalParentId) {
            const modalParentComment = modalComments.find(comment => comment.id === modalParentId);
            if (modalParentComment) {
              modalParentComment.Replies = modalParentComment.Replies || [];
              modalParentComment.Replies.push(action.data.comment);

              const modalMainParentComment = draft.modalComments?.find(comment => comment.id === modalParentId);
              if (modalMainParentComment) {
                modalMainParentComment.Replies = modalMainParentComment.Replies || [];
                modalMainParentComment.Replies.push(action.data.comment as IReplyComment);
              }
            }
          } else {
            modalComments.push({ id: action.data.comment.id, isDeleted: false, Replies: [] });
            draft.modalComments?.push(action.data.comment);
          }

          draft.singlePost!.Comments = modalComments;
        }

        const mainPostIndex = draft.timelinePosts.findIndex(post => post.id === action.data.comment.PostId);
        if (mainPostIndex !== -1) {
          const mainComments = draft.timelinePosts[mainPostIndex].Comments;
          const mainParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (mainParentId) {
            const mainParentComment = mainComments.find(comment => comment.id === mainParentId);
            if (mainParentComment) {
              mainParentComment.Replies = mainParentComment.Replies || [];
              mainParentComment.Replies.push(action.data.comment);

              if (draft.commentVisiblePostId === action.data.comment.PostId) {
                const mainModalParentComment = draft.mainComments?.find(comment => comment.id === mainParentId);
                if (mainModalParentComment) {
                  mainModalParentComment.Replies = mainModalParentComment.Replies || [];
                  mainModalParentComment.Replies.push(action.data.comment as IReplyComment);
                }
              }
            }
          } else {
            mainComments.push({ id: action.data.comment.id, isDeleted: false, Replies: [] });
            if (draft.commentVisiblePostId === action.data.comment.PostId) {
              draft.mainComments?.push(action.data.comment);
            }
          }

          draft.timelinePosts[mainPostIndex].Comments = mainComments;
        }

        const galleryPostIndex = draft.galleryPosts.findIndex(
          userHistory => userHistory.Post.id === action.data.comment.PostId
        );
        if (galleryPostIndex !== -1) {
          const galleryComments = draft.galleryPosts[galleryPostIndex].Post.Comments;
          const galleryParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (galleryParentId) {
            const galleryParentComment = galleryComments.find(comment => comment.id === galleryParentId);
            if (galleryParentComment) {
              galleryParentComment.Replies = galleryParentComment.Replies || [];
              galleryParentComment.Replies.push(action.data.comment);
            }
          } else {
            galleryComments.push({
              id: action.data.comment.id,
              isDeleted: false,
              User: { id: action.data.comment.UserId },
              Replies: []
            });
          }

          draft.galleryPosts[galleryPostIndex].Post.Comments = galleryComments;
        }

        draft.myActivityPosts.forEach(activity => {
          if (activity.Post.id === action.data.comment.PostId) {
            const activityComments = activity.Post.Comments || [];
            const activityParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

            if (activityParentId) {
              const activityParentComment = activityComments.find(comment => comment.id === activityParentId);
              if (activityParentComment) {
                activityParentComment.Replies = activityParentComment.Replies || [];
                activityParentComment.Replies.push(action.data.comment);
              }
            } else {
              activityComments.push({
                id: action.data.comment.id,
                isDeleted: false,
                User: { id: action.data.comment.UserId },
                Replies: []
              });
            }

            activity.Post.Comments = activityComments;
          }
        });

        const userPostIndex = draft.userPosts.findIndex(post => post.id === action.data.comment.PostId);
        if (userPostIndex !== -1) {
          const userPostComments = draft.userPosts[userPostIndex].Comments;
          const userPostParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (userPostParentId) {
            const userPostParentComment = userPostComments.find(comment => comment.id === userPostParentId);
            if (userPostParentComment) {
              userPostParentComment.Replies = userPostParentComment.Replies || [];
              userPostParentComment.Replies.push(action.data.comment);
            }
          } else {
            userPostComments.push({
              id: action.data.comment.id,
              isDeleted: false,
              User: { id: action.data.comment.UserId },
              Replies: []
            });
          }

          draft.userPosts[userPostIndex].Comments = userPostComments;
        }

        const searchPostIndex = draft.searchPosts.findIndex(post => post.id === action.data.comment.PostId);
        if (searchPostIndex !== -1) {
          const searchComments = draft.searchPosts[searchPostIndex].Comments;
          const searchParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (searchParentId) {
            const searchParentComment = searchComments.find(comment => comment.id === searchParentId);
            if (searchParentComment) {
              searchParentComment.Replies = searchParentComment.Replies || [];
              searchParentComment.Replies.push(action.data.comment);
            }
          } else {
            searchComments.push({
              id: action.data.comment.id,
              isDeleted: false,
              User: { id: action.data.comment.UserId },
              Replies: []
            });
          }

          draft.searchPosts[searchPostIndex].Comments = searchComments;
        }

        break;
      }
      case ADD_MODAL_COMMENT_FAILURE:
        draft.addModalCommentLoading = false;
        draft.addModalCommentError = action.error;
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.modalCommentUploadImageLoading = true;
        draft.modalCommentUploadImageDone = false;
        draft.modalCommentUploadImageError = null;
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.modalCommentUploadImageLoading = false;
        draft.modalCommentUploadImageDone = true;
        draft.modalCommentImagePath = action.data;
        break;
      case MODAL_COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.modalCommentUploadImageLoading = false;
        draft.modalCommentUploadImageError = action.error;
        break;
      case MODAL_COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.modalCommentImagePath = [];
        break;
      case EDIT_MODAL_COMMENT_REQUEST:
        draft.editModalCommentLoading = true;
        draft.editModalCommentDone = false;
        draft.editModalCommentError = null;
        break;
      case EDIT_MODAL_COMMENT_SUCCESS: {
        draft.editModalCommentLoading = false;
        draft.editModalCommentDone = true;
        draft.editModalCommentImagePath = [];
        draft.lastChangedModalCommentId = action.data.comment.id;

        const modalPostIndex = draft.singlePost!.id === action.data.comment.PostId ? 0 : -1;
        if (modalPostIndex !== -1) {
          const modalComments = draft.singlePost!.Comments || [];
          const modalParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (modalParentId) {
            const modalParentComment = modalComments.find(comment => comment.id === modalParentId);
            if (modalParentComment) {
              const replyIndex = modalParentComment.Replies.findIndex(reply => reply.id === action.data.comment.id);
              if (replyIndex !== -1) {
                modalParentComment.Replies[replyIndex] = {
                  ...modalParentComment.Replies[replyIndex],
                  ...action.data.comment
                };

                const modalMainParentComment = draft.modalComments?.find(comment => comment.id === modalParentId);
                if (modalMainParentComment) {
                  const modalMainReplyIndex = modalMainParentComment.Replies.findIndex(
                    reply => reply.id === action.data.comment.id
                  );
                  if (modalMainReplyIndex !== -1) {
                    modalMainParentComment.Replies[modalMainReplyIndex] = {
                      ...modalMainParentComment.Replies[modalMainReplyIndex],
                      ...action.data.comment
                    };
                  }
                }
              }
            }
          } else {
            const modalCommentIndex = modalComments.findIndex(comment => comment.id === action.data.comment.id);
            if (modalCommentIndex !== -1) {
              modalComments[modalCommentIndex] = {
                ...modalComments[modalCommentIndex],
                ...action.data.comment
              };

              const modalMainCommentIndex =
                draft.modalComments?.findIndex(comment => comment.id === action.data.comment.id) ?? -1;
              if (modalMainCommentIndex !== -1 && modalMainCommentIndex !== undefined) {
                draft.modalComments![modalMainCommentIndex] = {
                  ...draft.modalComments![modalMainCommentIndex],
                  ...action.data.comment
                };
              }
            }
          }
          draft.singlePost!.Comments = modalComments;
        }

        const mainPostIndex = draft.timelinePosts.findIndex(post => post.id === action.data.comment.PostId);
        if (mainPostIndex !== -1) {
          const mainComments = draft.timelinePosts[mainPostIndex].Comments;
          const mainParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (mainParentId) {
            const mainParentComment = mainComments.find(comment => comment.id === mainParentId);
            if (mainParentComment) {
              const mainReplyIndex = mainParentComment.Replies.findIndex(reply => reply.id === action.data.comment.id);
              if (mainReplyIndex !== -1) {
                mainParentComment.Replies[mainReplyIndex] = {
                  ...mainParentComment.Replies[mainReplyIndex],
                  ...action.data.comment
                };

                if (draft.commentVisiblePostId === action.data.comment.PostId) {
                  const mainModalParentComment = draft.mainComments?.find(comment => comment.id === mainParentId);
                  if (mainModalParentComment) {
                    const mainModalReplyIndex = mainModalParentComment.Replies.findIndex(
                      reply => reply.id === action.data.comment.id
                    );
                    if (mainModalReplyIndex !== -1) {
                      mainModalParentComment.Replies[mainModalReplyIndex] = {
                        ...mainModalParentComment.Replies[mainModalReplyIndex],
                        ...action.data.comment
                      };
                    }
                  }
                }
              }
            }
          } else {
            const mainCommentIndex = mainComments.findIndex(comment => comment.id === action.data.comment.id);
            if (mainCommentIndex !== -1) {
              mainComments[mainCommentIndex] = {
                ...mainComments[mainCommentIndex],
                ...action.data.comment
              };

              if (draft.commentVisiblePostId === action.data.comment.PostId) {
                const mainCommentIndex =
                  draft.mainComments?.findIndex(comment => comment.id === action.data.comment.id) ?? -1;
                if (mainCommentIndex !== -1 && mainCommentIndex !== undefined) {
                  draft.mainComments![mainCommentIndex] = {
                    ...draft.mainComments![mainCommentIndex],
                    ...action.data.comment
                  };
                }
              }
            }
          }
          draft.timelinePosts[mainPostIndex].Comments = mainComments;
        }

        const searchPostIndex = draft.searchPosts.findIndex(post => post.id === action.data.comment.PostId);
        if (searchPostIndex !== -1) {
          const searchComments = draft.searchPosts[searchPostIndex].Comments;
          const searchParentId = action.data.parentId ? parseInt(action.data.parentId, 10) : null;

          if (searchParentId) {
            const searchParentComment = searchComments.find(comment => comment.id === searchParentId);
            if (searchParentComment) {
              const searchReplyIndex = searchParentComment.Replies.findIndex(
                reply => reply.id === action.data.comment.id
              );
              if (searchReplyIndex !== -1) {
                searchParentComment.Replies[searchReplyIndex] = {
                  ...searchParentComment.Replies[searchReplyIndex],
                  ...action.data.comment
                };
              }
            }
          } else {
            const searchCommentIndex = searchComments.findIndex(comment => comment.id === action.data.comment.id);
            if (searchCommentIndex !== -1) {
              searchComments[searchCommentIndex] = {
                ...searchComments[searchCommentIndex],
                ...action.data.comment
              };
            }
          }
          draft.searchPosts[searchPostIndex].Comments = searchComments;
        }

        break;
      }
      case EDIT_MODAL_COMMENT_FAILURE:
        draft.editCommentLoading = false;
        draft.editCommentError = action.error;
        break;
      case EDIT_MODAL_COMMENT_UPLOAD_IMAGE_REQUEST:
        draft.editModalCommentUploadImageLoading = true;
        draft.editModalCommentUploadImageDone = false;
        draft.editModalCommentUploadImageError = null;
        break;
      case EDIT_MODAL_COMMENT_UPLOAD_IMAGE_SUCCESS:
        draft.editModalCommentUploadImageLoading = false;
        draft.editModalCommentUploadImageDone = true;
        draft.editModalCommentImagePath = action.data;
        break;
      case EDIT_MODAL_COMMENT_UPLOAD_IMAGE_FAILURE:
        draft.editModalCommentUploadImageLoading = false;
        draft.editModalCommentUploadImageError = action.error;
        break;
      case EDIT_MODAL_COMMENT_REMOVE_UPLOADED_IMAGE:
        draft.editModalCommentImagePath = [];
        break;
      case DELETE_MODAL_COMMENT_REQUEST:
        draft.deleteModalCommentLoading = true;
        draft.deleteModalCommentDone = false;
        draft.deleteModalCommentError = null;
        break;
      case DELETE_MODAL_COMMENT_SUCCESS: {
        draft.deleteModalCommentLoading = false;
        draft.deleteModalCommentDone = true;

        const { id, replyId, hasChild, postId } = action.data;

        if (draft.singlePost?.id === postId) {
          const modalComments = draft.singlePost.Comments;
          if (replyId) {
            const parentComment = modalComments.find(comment => comment.id === replyId);
            if (parentComment) {
              parentComment.Replies = parentComment.Replies.filter(reply => reply.id !== id);

              const modalMainParentComment = draft.modalComments?.find(comment => comment.id === replyId);
              if (modalMainParentComment) {
                modalMainParentComment.Replies = modalMainParentComment.Replies.filter(reply => reply.id !== id);
              }

              if (parentComment.Replies.length === 0 && parentComment.isDeleted) {
                draft.singlePost.Comments = modalComments.filter(comment => comment.id !== replyId);

                if (draft.modalComments) {
                  draft.modalComments = draft.modalComments.filter(comment => comment.id !== replyId);
                }
              }
            }
          } else {
            if (hasChild) {
              const commentToUpdate = modalComments.find(comment => comment.id === id);
              if (commentToUpdate) commentToUpdate.isDeleted = true;

              if (draft.modalComments) {
                const modalCommentToUpdate = draft.modalComments.find(comment => comment.id === id);
                if (modalCommentToUpdate) modalCommentToUpdate.isDeleted = true;
              }
            } else {
              draft.singlePost.Comments = modalComments.filter(comment => comment.id !== id);

              if (draft.modalComments) {
                draft.modalComments = draft.modalComments.filter(comment => comment.id !== id);
              }
            }
          }
        }

        const mainPostIndex = draft.timelinePosts.findIndex(post => post.id === postId);
        if (mainPostIndex !== -1) {
          const postComments = draft.timelinePosts[mainPostIndex].Comments;
          if (replyId) {
            const parentComment = postComments.find(comment => comment.id === replyId);
            if (parentComment) {
              parentComment.Replies = parentComment.Replies.filter(reply => reply.id !== id);

              if (draft.mainComments) {
                const mainParentComment = draft.mainComments.find(comment => comment.id === replyId);
                if (mainParentComment) {
                  mainParentComment.Replies = mainParentComment.Replies.filter(reply => reply.id !== id);
                }
              }

              if (parentComment.Replies.length === 0 && parentComment.isDeleted) {
                draft.timelinePosts[mainPostIndex].Comments = postComments.filter(comment => comment.id !== replyId);

                if (draft.mainComments) {
                  draft.mainComments = draft.mainComments.filter(comment => comment.id !== replyId);
                }
              }
            }
          } else {
            if (hasChild) {
              const commentToUpdate = postComments.find(comment => comment.id === id);
              if (commentToUpdate) commentToUpdate.isDeleted = true;

              if (draft.mainComments) {
                const mainCommentToUpdate = draft.mainComments.find(comment => comment.id === id);
                if (mainCommentToUpdate) mainCommentToUpdate.isDeleted = true;
              }
            } else {
              draft.timelinePosts[mainPostIndex].Comments = postComments.filter(comment => comment.id !== id);

              if (draft.mainComments) {
                draft.mainComments = draft.mainComments.filter(comment => comment.id !== id);
              }
            }
          }
        }

        const galleryPostIndex = draft.galleryPosts.findIndex(userHistory => userHistory.Post.id === postId);
        if (galleryPostIndex !== -1) {
          const galleryComments = draft.galleryPosts[galleryPostIndex].Post.Comments;
          if (replyId) {
            const galleryParentComment = galleryComments.find(comment => comment.id === replyId);
            if (galleryParentComment) {
              galleryParentComment.Replies = galleryParentComment.Replies.filter(reply => reply.id !== id);

              if (galleryParentComment.Replies.length === 0 && galleryParentComment.isDeleted) {
                draft.galleryPosts[galleryPostIndex].Post.Comments = galleryComments.filter(
                  comment => comment.id !== replyId
                );
              }
            }
          } else {
            if (hasChild) {
              const galleryCommentToUpdate = galleryComments.find(comment => comment.id === id);
              if (galleryCommentToUpdate) galleryCommentToUpdate.isDeleted = true;
            } else {
              draft.galleryPosts[galleryPostIndex].Post.Comments = galleryComments.filter(comment => comment.id !== id);
            }
          }
        }

        const userPostIndex = draft.userPosts.findIndex(post => post.id === postId);
        if (userPostIndex !== -1) {
          const userPostComments = draft.userPosts[userPostIndex].Comments;
          if (replyId) {
            const parentComment = userPostComments.find(comment => comment.id === replyId);
            if (parentComment) {
              parentComment.Replies = parentComment.Replies.filter(reply => reply.id !== id);

              if (parentComment.Replies.length === 0 && parentComment.isDeleted) {
                draft.userPosts[userPostIndex].Comments = userPostComments.filter(comment => comment.id !== replyId);
              }
            }
          } else {
            if (hasChild) {
              const commentToUpdate = userPostComments.find(comment => comment.id === id);
              if (commentToUpdate) commentToUpdate.isDeleted = true;
            } else {
              draft.userPosts[userPostIndex].Comments = userPostComments.filter(comment => comment.id !== id);
            }
          }
        }

        draft.myActivityPosts.forEach(activity => {
          if (activity.Post.id === postId) {
            const activityComments = activity.Post.Comments;

            if (replyId) {
              const parentComment = activityComments.find(comment => comment.id === replyId);
              if (parentComment) {
                parentComment.Replies = parentComment.Replies.filter(reply => reply.id !== id);

                if (parentComment.Replies.length === 0 && parentComment.isDeleted) {
                  activity.Post.Comments = activityComments.filter(comment => comment.id !== replyId);
                }
              }
            } else {
              if (hasChild) {
                const commentToUpdate = activityComments.find(comment => comment.id === id);
                if (commentToUpdate) commentToUpdate.isDeleted = true;
              } else {
                activity.Post.Comments = activityComments.filter(comment => comment.id !== id);
              }
            }
          }
        });

        const searchPostIndex = draft.searchPosts.findIndex(post => post.id === postId);
        if (searchPostIndex !== -1) {
          const searchComments = draft.searchPosts[searchPostIndex].Comments;
          if (replyId) {
            const searchParentComment = searchComments.find(comment => comment.id === replyId);
            if (searchParentComment) {
              searchParentComment.Replies = searchParentComment.Replies.filter(reply => reply.id !== id);

              if (searchParentComment.Replies.length === 0 && searchParentComment.isDeleted) {
                draft.searchPosts[searchPostIndex].Comments = searchComments.filter(comment => comment.id !== replyId);
              }
            }
          } else {
            if (hasChild) {
              const commentToUpdate = searchComments.find(comment => comment.id === id);
              if (commentToUpdate) commentToUpdate.isDeleted = true;
            } else {
              draft.searchPosts[searchPostIndex].Comments = searchComments.filter(comment => comment.id !== id);
            }
          }
        }

        draft.isDeleteModalVisible = false;
        draft.deleteInfo = null;
        break;
      }
      case DELETE_MODAL_COMMENT_FAILURE:
        draft.deleteModalCommentLoading = false;
        draft.deleteModalCommentError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;

        const post = draft.timelinePosts.find(post => post.id === action.data.PostId);
        if (post) post.Likers.push({ id: action.data.UserId });
        if (draft.singlePost && draft.singlePost.id === action.data.PostId) {
          draft.singlePost.Likers.push({ id: action.data.UserId });
        }
        const galleryPost = draft.galleryPosts.find(userHistory => userHistory.Post.id === action.data.PostId);
        if (galleryPost) {
          galleryPost.Post.Likers.push({ id: action.data.UserId });
        }

        const userPost = draft.userPosts.find(post => post.id === action.data.PostId);
        if (userPost) {
          userPost.Likers.push({ id: action.data.UserId });
        }

        const searchPost = draft.searchPosts.find(post => post.id === action.data.PostId);
        if (searchPost) {
          searchPost.Likers.push({ id: action.data.UserId });
        }

        draft.myActivityPosts.forEach(activity => {
          if (activity.Post.id === action.data.PostId) {
            activity.Post.Likers.push({ id: action.data.UserId });
          }
        });
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        draft.unLikePostLoading = false;
        draft.unLikePostDone = true;

        const post = draft.timelinePosts.find(post => post.id === action.data.PostId);
        if (post) post.Likers = post.Likers.filter(liker => liker.id !== action.data.UserId);
        if (draft.singlePost && draft.singlePost.id === action.data.PostId) {
          draft.singlePost.Likers = draft.singlePost.Likers.filter(liker => liker.id !== action.data.UserId);
        }
        const galleryPost = draft.galleryPosts.find(userHistory => userHistory.Post.id === action.data.PostId);
        if (galleryPost) {
          galleryPost.Post.Likers = galleryPost.Post.Likers.filter(liker => liker.id !== action.data.UserId);
        }

        const userPost = draft.userPosts.find(post => post.id === action.data.PostId);
        if (userPost) {
          userPost.Likers = userPost.Likers.filter(liker => liker.id !== action.data.UserId);
        }

        const searchPost = draft.searchPosts.find(post => post.id === action.data.PostId);
        if (searchPost) {
          searchPost.Likers = searchPost.Likers.filter(liker => liker.id !== action.data.UserId);
        }

        draft.myActivityPosts.forEach(activity => {
          if (activity.Post.id === action.data.PostId) {
            activity.Post.Likers = activity.Post.Likers.filter(liker => liker.id !== action.data.UserId);
          }
        });
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unLikePostLoading = false;
        draft.unLikePostError = action.error;
        break;
      case SHOW_COMMENT_LIST:
        draft.isCommentListVisible = true;
        draft.commentVisiblePostId = action.data;
        draft.commentImagePath = [];
        draft.editCommentImagePath = [];
        break;
      case HIDE_COMMENT_LIST:
        draft.isCommentListVisible = false;
        draft.commentVisiblePostId = null;
        draft.commentImagePath = [];
        break;
      case SHOW_MODAL_COMMENT_LIST:
        draft.isModalCommentListVisible = true;
        draft.modalCommentImagePath = [];
        break;
      case HIDE_MODAL_COMMENT_LIST:
        draft.isModalCommentListVisible = false;
        draft.modalCommentImagePath = [];
        draft.focusedComment = null;
        break;
      case SET_ACTIVITY_FOCUSED_COMMENT:
        draft.focusedComment = action.data;
        draft.isModalCommentListVisible = true;
        draft.modalCommentImagePath = [];
        break;
      case SHOW_IMAGE_PREVIEW:
        draft.isPreviewVisible = true;
        draft.previewImagePath = action.data;
        break;
      case HIDE_IMAGE_PREVIEW:
        draft.isPreviewVisible = false;
        draft.previewImagePath = null;
        break;
      case SHOW_POST_CAROUSEL:
        draft.isCarouselVisible = true;
        draft.postCarousel = action.data;
        break;
      case HIDE_POST_CAROUSEL:
        draft.isCarouselVisible = false;
        draft.postCarousel = [];
        break;
      case SHOW_POST_MODAL:
        draft.isPostModalVisible = true;
        draft.singlePost = action.data;
        break;
      case HIDE_POST_MODAL:
        draft.singlePost = null;
        draft.modalCommentImagePath = [];
        draft.postEditMode = false;
        draft.isPostModalVisible = false;
        draft.isModalCommentListVisible = false;
        draft.lastChangedModalCommentId = null;
        draft.focusedComment = null;
        break;
      case EXECUTE_POST_EDIT:
        draft.postEditMode = true;
        draft.editPostImagePaths = draft.singlePost?.Images?.map(v => v.src) || [];
        break;
      case CANCEL_POST_EDIT:
        draft.postEditMode = false;
        break;
      case SHOW_DELETE_MODAL:
        draft.isDeleteModalVisible = true;
        draft.deleteInfo = action.data;
        break;
      case HIDE_DELETE_MODAL:
        draft.isDeleteModalVisible = false;
        draft.deleteInfo = null;
        break;
      case EXECUTE_COMMENT_EDIT:
        draft.editCommentImagePath = [action.data];
        break;
      case EXECUTE_MODAL_COMMENT_EDIT:
        draft.editModalCommentImagePath = [action.data];
        break;
      default:
        return state;
    }
  });
};

export default reducer;
