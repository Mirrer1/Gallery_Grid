import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useFileUpload = (dispatchAction: any, options: { maxFiles?: number; showWarning?: boolean } = {}) => {
  const { maxFiles = 5, showWarning = true } = options;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, existingPaths: string[] = []) => {
      const files = event.target.files as FileList;
      if (showWarning && existingPaths.length + files.length > maxFiles) {
        toast.warning(`이미지는 최대 ${maxFiles}개까지 업로드할 수 있습니다.`);
      }

      const imageFormData = new FormData();
      Array.from(files).forEach((file: File) => {
        imageFormData.append('image', file);
      });

      dispatch(dispatchAction(imageFormData));

      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [dispatch, dispatchAction, maxFiles, showWarning]
  );

  return { fileInputRef, onFileChange };
};

export default useFileUpload;
