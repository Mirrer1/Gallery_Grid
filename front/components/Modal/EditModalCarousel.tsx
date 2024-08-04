import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { toast } from 'react-toastify';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { editPostImagePaths, editPostUploadImagesLoading, editPostUploadImagesDone, isPostModalVisible } = useSelector(
    (state: RootState) => state.post
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

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

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files as FileList;
      if (editPostImagePaths.length + files.length > 5) {
        toast.warning('이미지는 최대 5개까지 업로드할 수 있습니다.');
      }

      const imageFormData = new FormData();
      Array.from(files).forEach((file: File) => {
        imageFormData.append('image', file);
      });

      dispatch(editPostUploadImagesRequest(imageFormData));

      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [editPostImagePaths]
  );

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
        <img
          src={editPostImagePaths.length > 0 ? `http://localhost:3065/${selectedImage}` : '/no-image.png'}
          alt="클릭한 게시글 이미지"
        />
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
                src={`http://localhost:3065/${image}`}
                alt={`게시글의 ${i}번째 이미지`}
                onClick={() => handleImageClick(image)}
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

        <input type="file" name="image" multiple ref={fileInputRef} onChange={onFileChange} />
      </EditModalUploadBtn>
    </EditModalCarouselWrapper>
  );
};

export default EditModalCarousel;