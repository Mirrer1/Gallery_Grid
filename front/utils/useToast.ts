import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from 'store/reducers';

const useToastStatus = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);

  const {
    addPostDone,
    addPostError,
    deletePostDone,
    deletePostError,
    editPostDone,
    editPostError,
    addCommentDone,
    addCommentError,
    addReplyCommentDone,
    addReplyCommentError,
    editCommentDone,
    editCommentError,
    deleteCommentDone,
    deleteCommentError,
    addModalCommentDone,
    addModalCommentError,
    addReplyModalCommentDone,
    addReplyModalCommentError,
    editModalCommentDone,
    editModalCommentError,
    deleteModalCommentDone,
    deleteModalCommentError,
    likePostDone,
    likePostError,
    unLikePostDone,
    unLikePostError,
    deleteMyInteractionsPostsDone,
    deleteMyInteractionsPostsError,
    readActivityDone,
    readActivityError
  } = useSelector((state: RootState) => state.post);

  const { editMyInfoDone, editMyInfoError, followUserDone, followUserError, unFollowUserDone, unFollowUserError } =
    useSelector((state: RootState) => state.user);

  const {
    contactDone,
    contactError,
    emailAuthDone,
    emailAuthError,
    checkCodeDone,
    checkCodeError,
    changePasswordDone,
    changePasswordError
  } = useSelector((state: RootState) => state.mail);

  const postStatusList = [
    {
      done: addPostDone,
      error: addPostError,
      successMessage: '새로운 작업물이 공유되었습니다.',
      errorMessage: addPostError
    },
    {
      done: deletePostDone,
      error: deletePostError,
      successMessage: '작업물이 삭제되었습니다.',
      errorMessage: deletePostError
    },
    {
      done: editPostDone,
      error: editPostError,
      successMessage: '작업물이 수정되었습니다.',
      errorMessage: editPostError
    },
    {
      done: addCommentDone,
      error: addCommentError,
      successMessage: '댓글이 작성되었습니다.',
      errorMessage: addCommentError
    },
    {
      done: addReplyCommentDone,
      error: addReplyCommentError,
      successMessage: '댓글이 작성되었습니다.',
      errorMessage: addReplyCommentError
    },
    {
      done: editCommentDone,
      error: editCommentError,
      successMessage: '댓글이 수정되었습니다.',
      errorMessage: editCommentError
    },
    {
      done: deleteCommentDone,
      error: deleteCommentError,
      successMessage: '댓글이 삭제되었습니다.',
      errorMessage: deleteCommentError
    },
    {
      done: addModalCommentDone,
      error: addModalCommentError,
      successMessage: '댓글이 작성되었습니다.',
      errorMessage: addModalCommentError
    },
    {
      done: addReplyModalCommentDone,
      error: addReplyModalCommentError,
      successMessage: '댓글이 작성되었습니다.',
      errorMessage: addReplyModalCommentError
    },
    {
      done: editModalCommentDone,
      error: editModalCommentError,
      successMessage: '댓글이 수정되었습니다.',
      errorMessage: editModalCommentError
    },
    {
      done: deleteModalCommentDone,
      error: deleteModalCommentError,
      successMessage: '댓글이 삭제되었습니다.',
      errorMessage: deleteModalCommentError
    },
    {
      done: likePostDone,
      error: likePostError,
      successMessage: '게시글에 좋아요를 남겼습니다.',
      errorMessage: likePostError
    },
    {
      done: unLikePostDone,
      error: unLikePostError,
      successMessage: '게시글에 남긴 좋아요를 취소했습니다.',
      errorMessage: unLikePostError
    },
    {
      done: deleteMyInteractionsPostsDone,
      error: deleteMyInteractionsPostsError,
      successMessage: '게시글이 삭제되었습니다.',
      errorMessage: deleteMyInteractionsPostsError
    },
    {
      done: readActivityDone,
      error: readActivityError,
      successMessage: '활동 내역이 읽음 처리되었습니다.',
      errorMessage: readActivityError
    }
  ];

  const userStatusList = [
    {
      done: editMyInfoDone,
      error: editMyInfoError,
      successMessage: '유저 정보가 변경되었습니다.',
      errorMessage: editMyInfoError
    },
    {
      done: followUserDone,
      error: followUserError,
      successMessage: '회원을 팔로우했습니다.',
      errorMessage: followUserError
    },
    {
      done: unFollowUserDone,
      error: unFollowUserError,
      successMessage: '회원의 팔로우를 취소했습니다.',
      errorMessage: unFollowUserError
    }
  ];

  const mailStatusList = [
    {
      done: emailAuthDone,
      error: emailAuthError,
      successMessage: '메일이 발송되었습니다.',
      errorMessage: emailAuthError
    },
    {
      done: checkCodeDone,
      error: checkCodeError,
      successMessage: '메일이 인증되었습니다.',
      errorMessage: checkCodeError
    },
    {
      done: changePasswordDone,
      error: changePasswordError,
      successMessage: '비밀번호가 변경되었습니다.',
      errorMessage: changePasswordError
    },
    {
      done: contactDone,
      error: contactError,
      successMessage: '소중한 의견 감사합니다.',
      errorMessage: contactError
    }
  ];

  postStatusList.forEach(({ done, error, successMessage, errorMessage }) => {
    useEffect(() => {
      if (!isInitialRender) {
        if (done) toast.success(successMessage);
        if (error) toast.error(errorMessage);
      }
    }, [done, error]);
  });

  userStatusList.forEach(({ done, error, successMessage, errorMessage }) => {
    useEffect(() => {
      if (!isInitialRender) {
        if (done) toast.success(successMessage);
        if (error) toast.error(errorMessage);
      }
    }, [done, error]);
  });

  mailStatusList.forEach(({ done, error, successMessage, errorMessage }) => {
    useEffect(() => {
      if (!isInitialRender) {
        if (done) toast.success(successMessage);
        if (error) toast.error(errorMessage);
      }
    }, [done, error]);
  });

  useEffect(() => {
    setIsInitialRender(false);
  }, []);
};

export default useToastStatus;
