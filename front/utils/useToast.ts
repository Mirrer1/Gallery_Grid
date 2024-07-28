import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from 'store/reducers';

const useToastStatus = () => {
  const { addPostDone, addPostError, deletePostDone, deletePostError } = useSelector((state: RootState) => state.post);
  const {} = useSelector((state: RootState) => state.user);

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
    }
  ];
  // const userStatusList = [];

  postStatusList.forEach(({ done, error, successMessage, errorMessage }) => {
    useEffect(() => {
      if (done) toast.success(successMessage);
      if (error) toast.error(errorMessage);
    }, [done, error]);
  });

  // userStatusList.forEach(({ done, error, successMessage, errorMessage }) => {
  //   useEffect(() => {
  //     if (done) toast.success(successMessage);
  //     if (error) toast.error(errorMessage);
  //   }, [done, error]);
  // });
};

export default useToastStatus;
