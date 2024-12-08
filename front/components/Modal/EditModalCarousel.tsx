import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import useFileUpload from 'utils/useFileUpload';
import { RootState } from 'store/reducers';
import { editPostRemoveUploadedImage, editPostUploadImagesRequest } from 'store/actions/postAction';
import { slideInSeletedImage } from 'styles/Common/animation';
import {
  EditModalCarouselWrapper,
  EditModalSwiperImages,
  EditModalSelectedImage,
  EditModalUploadBtn,
  EditModalSwiperImageItem
} from 'styles/Modal/editModalCarousel';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const EditModalCarousel = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { fileInputRef, onFileChange } = useFileUpload(editPostUploadImagesRequest, { maxFiles: 5, showWarning: true });
  const { editPostImagePaths, editPostUploadImagesLoading, editPostUploadImagesDone, isPostModalVisible } = useSelector(
    (state: RootState) => state.post
  );

  const handleImageClick = useCallback(
    (image: string, index: number) => {
      setSelectedImage(image);

      if (swiperRef.current) {
        const totalSlides = editPostImagePaths.length;
        let targetSlide = index;

        if (index === totalSlides - 1 && totalSlides > 3) {
          targetSlide = totalSlides - 3;
        } else if (index > 0) {
          targetSlide = index - 1;
        }

        swiperRef.current.swiper.slideTo(targetSlide);
      }
    },
    [editPostImagePaths]
  );

  const handleRemoveImage = useCallback(
    (image: string) => {
      dispatch(editPostRemoveUploadedImage(image));

      if (selectedImage === image) {
        const newImagePaths = editPostImagePaths.filter((path: string) => path !== image);
        setSelectedImage(newImagePaths.length > 0 ? newImagePaths[0] : null);

        if (newImagePaths.length > 0 && swiperRef.current) {
          swiperRef.current.swiper.slideTo(0);
        }
      }
    },
    [dispatch, editPostImagePaths, selectedImage]
  );

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  useEffect(() => {
    if (!selectedImage && editPostImagePaths.length > 0) {
      setSelectedImage(editPostImagePaths[0]);
    }
  }, [editPostImagePaths, selectedImage]);

  useEffect(() => {
    if (editPostUploadImagesDone) {
      setSelectedImage(editPostImagePaths[editPostImagePaths.length - 1]);
      swiperRef.current?.swiper.slideTo(editPostImagePaths.length - 1);
    }
  }, [editPostUploadImagesDone]);

  useEffect(() => {
    setSelectedImage(editPostImagePaths[0]);
    swiperRef.current.swiper.slideTo(0);
  }, [isPostModalVisible]);

  return (
    <EditModalCarouselWrapper>
      <EditModalSelectedImage key={selectedImage} {...slideInSeletedImage}>
        <img src={editPostImagePaths.length > 0 ? `${selectedImage}` : '/no-image.png'} alt="클릭한 게시글 이미지" />
      </EditModalSelectedImage>

      <EditModalSwiperImages>
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={5}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {editPostImagePaths.map((image: string, i: number) => (
            <SwiperSlide key={image}>
              <EditModalSwiperImageItem
                src={`${image}`}
                alt={`게시글의 ${i}번째 이미지`}
                onClick={() => handleImageClick(image, i)}
                selected={selectedImage === image}
              />
              <DeleteOutlined onClick={() => handleRemoveImage(image)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </EditModalSwiperImages>

      <EditModalUploadBtn>
        {editPostUploadImagesLoading ? (
          <div>
            <LoadingOutlined />
          </div>
        ) : (
          <div onClick={onClickImageUpload}>
            <UploadOutlined />
            <p>UPLOAD</p>
          </div>
        )}

        <input
          type="file"
          name="image"
          multiple
          ref={fileInputRef}
          onChange={e => onFileChange(e, editPostImagePaths)}
        />
      </EditModalUploadBtn>
    </EditModalCarouselWrapper>
  );
};

export default EditModalCarousel;
