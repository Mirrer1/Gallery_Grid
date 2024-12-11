import { useDispatch } from 'react-redux';
import { showDeleteModal, showImagePreview, showPostCarousel, showPostModal } from 'store/actions/postAction';
import { DeleteInfo, Image, Post } from 'store/types/postType';

type OverlayType = 'post' | 'delete' | 'carousel' | 'preview';

type OverlayDataMap = {
  post: Post;
  delete: DeleteInfo;
  carousel: Image[];
  preview: string;
};

const useOverlays = () => {
  const dispatch = useDispatch();

  const openOverlay = <T extends OverlayType>(type: T, data: OverlayDataMap[T]) => {
    switch (type) {
      case 'post': {
        const postData = data as OverlayDataMap['post'];
        dispatch(showPostModal(postData));
        break;
      }
      case 'delete': {
        const deleteData = data as OverlayDataMap['delete'];
        dispatch(showDeleteModal(deleteData));
        break;
      }
      case 'carousel': {
        const carouselData = data as OverlayDataMap['carousel'];
        dispatch(showPostCarousel(carouselData));
        break;
      }
      case 'preview': {
        const previewData = data as OverlayDataMap['preview'];
        dispatch(showImagePreview(previewData));
        break;
      }
      default:
        throw new Error(`${type} 타입이 존재하지 않습니다.`);
    }
  };

  return { openOverlay };
};

export default useOverlays;
