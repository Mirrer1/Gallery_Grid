import { useCallback, useState } from 'react';

const useImagePreview = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const showImagePreview = useCallback((image: string) => {
    setImagePreview(image);
  }, []);

  const hideImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  return { imagePreview, showImagePreview, hideImagePreview };
};

export default useImagePreview;
