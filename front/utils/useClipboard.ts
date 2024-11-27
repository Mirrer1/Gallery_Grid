import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useClipboard = () => {
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('클립보드에 복사되었습니다.');
      })
      .catch(error => {
        console.error('클립보드 복사 실패:', error);
        toast.warning('클립보드 복사에 실패했습니다.');
      });
  }, []);

  return { copyToClipboard };
};

export default useClipboard;
