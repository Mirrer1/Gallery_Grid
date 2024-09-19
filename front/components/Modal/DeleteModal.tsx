import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import {
  deleteCommentRequest,
  deleteModalCommentRequest,
  deleteMyInteractionsPostsRequest,
  deletePostRequest,
  hideDeleteModal
} from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import { DeleteModalContent, DeleteModalOutsideArea, DeleteModalWrapper } from 'styles/Modal/deleteModal';

const DeleteModal = () => {
  const dispatch = useDispatch();
  const {
    deletePostLoading,
    deleteInfo,
    deleteCommentLoading,
    deleteModalCommentLoading,
    isModalCommentListVisible,
    deleteMyInteractionsPostsLoading
  } = useSelector((state: RootState) => state.post);

  const hideModal = useCallback(() => {
    dispatch(hideDeleteModal());
  }, []);

  const onDeletePost = useCallback(() => {
    if (deleteInfo.type === '게시글') {
      dispatch(deletePostRequest(deleteInfo.id));
    } else if (!isModalCommentListVisible && deleteInfo.type === '댓글') {
      dispatch(
        deleteCommentRequest({
          id: deleteInfo.id,
          hasChild: deleteInfo.hasChild,
          replyId: deleteInfo.replyId
        })
      );
    } else if (isModalCommentListVisible && deleteInfo.type === '댓글') {
      dispatch(
        deleteModalCommentRequest({
          id: deleteInfo.id,
          hasChild: deleteInfo.hasChild,
          replyId: deleteInfo.replyId
        })
      );
    } else if (deleteInfo.type === 'Gallery 게시글') {
      dispatch(deleteMyInteractionsPostsRequest(deleteInfo.menu, deleteInfo.id));
    }
  }, [deleteInfo]);

  return (
    <DeleteModalWrapper>
      <DeleteModalOutsideArea onClick={hideModal} />

      <DeleteModalContent {...slideInModal}>
        <div>
          <DeleteOutlined />
        </div>

        <h1>Are you sure?</h1>
        <p>
          {deleteInfo.type}을 정말 삭제하시겠습니까?
          <br />
          삭제된 정보는 복구할 수 없습니다.
        </p>

        <div>
          <button type="button" onClick={onDeletePost}>
            {deletePostLoading ||
            deleteCommentLoading ||
            deleteModalCommentLoading ||
            deleteMyInteractionsPostsLoading ? (
              <LoadingOutlined />
            ) : (
              <>삭제</>
            )}
          </button>

          <button type="button" onClick={hideModal}>
            취소
          </button>
        </div>
      </DeleteModalContent>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
