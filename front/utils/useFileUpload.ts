import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';

type UseFileUploadOptionsProps = {
  maxFiles?: number;
  showWarning?: boolean;
};

type DispatchActionProps = (formData: FormData) => AnyAction;

const resizeImage = (
  file: File,
  maxWidth: number,
  quality: number = 0.8,
  format: 'jpeg' | 'webp' = 'jpeg'
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      if (!e.target?.result) return reject('파일 읽기 실패');
      img.src = e.target.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas 초기화 실패');

      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        blob => {
          if (!blob) return reject('Blob 생성 실패');
          resolve(blob);
        },
        format === 'jpeg' ? 'image/jpeg' : 'image/webp',
        quality
      );
    };

    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
};

const useFileUpload = (dispatchAction: DispatchActionProps, options: UseFileUploadOptionsProps = {}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { maxFiles = 5, showWarning = true } = options;

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, existingPaths: string[] = []) => {
      const files = event.target.files as FileList;

      if (showWarning && existingPaths.length + files.length > maxFiles) {
        toast.warning(`이미지는 최대 ${maxFiles}개까지 업로드할 수 있습니다.`);
        return;
      }

      const imageFormData = new FormData();
      const maxWidth = 800;
      setIsUploading(true);

      try {
        const resizedFiles = await Promise.all(
          Array.from(files).map(async (file, index) => {
            const isPNG = file.type === 'image/png';
            const resizedBlob = await resizeImage(file, maxWidth, 0.7, 'jpeg'); // JPEG로 변환
            const resizedFile = new File([resizedBlob], isPNG ? file.name.replace(/\.png$/, '.jpg') : file.name, {
              type: 'image/jpeg'
            });
            return { index, resizedFile };
          })
        );

        resizedFiles
          .sort((a, b) => a.index - b.index)
          .forEach(({ resizedFile }) => {
            imageFormData.append('image', resizedFile);
          });

        dispatch(dispatchAction(imageFormData));
      } catch (error) {
        toast.error('이미지 처리 중 오류가 발생했습니다.');
        console.error(error);
      } finally {
        setIsUploading(false);
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [dispatch, dispatchAction, maxFiles, showWarning]
  );

  return { fileInputRef, onFileChange, isUploading };
};

export default useFileUpload;
