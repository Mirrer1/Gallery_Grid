import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

import { RootState } from 'store/reducers';
import { deletePostRequest } from 'store/actions/postAction';
import { slideInModal } from 'styles/Common/animation';
import { DeleteModalContent, DeleteModalOutsideArea, DeleteModalWrapper } from 'styles/Modal/deleteModal';

type DeleteProps = {
  type: string;
  deleteId: number;
  hideDeleteModal: () => void;
};

const DeleteModal = ({ type, deleteId, hideDeleteModal }: DeleteProps) => {
  const dispatch = useDispatch();
  const { deletePostLoading } = useSelector((state: RootState) => state.post);
  const hideModal = useCallback(() => {
    hideDeleteModal();
  }, []);

  const onDeletePost = useCallback(() => {
    dispatch(deletePostRequest(deleteId));
    hideDeleteModal();
  }, []);

  return (
    <DeleteModalWrapper>
      <DeleteModalOutsideArea onClick={hideModal} />

      <DeleteModalContent {...slideInModal}>
        <div>
          <DeleteOutlined />
        </div>

        <h1>Are you sure?</h1>
        <p>
          {type}을 정말 삭제하시겠습니까?
          <br />
          삭제된 {type}은 복구할 수 없습니다.
        </p>

        <div>
          <button type="button" onClick={onDeletePost}>
            {deletePostLoading ? <LoadingOutlined /> : <>삭제</>}
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
