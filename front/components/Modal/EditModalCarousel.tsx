import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { RootState } from 'store/reducers';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { editImagePaths, uploadImagesLoading } = useSelector((state: RootState) => state.post);
  const [selectedImage, setSelectedImage] = useState<string | null>(editImagePaths[0] || null);

  const handleImageClick = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const handleRemoveImage = useCallback((image: string) => {
    // dispatch(removeUploadedImage(image));
  }, []);

  // const onFileChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files as FileList;
  //     if (imagePaths.length + files.length > 5) {
  //       toast.warning('이미지는 최대 5개까지 업로드할 수 있습니다.');
  //       return;
  //     }

  //     const imageFormData = new FormData();
  //     Array.from(files).forEach((file: File) => {
  //       imageFormData.append('image', file);
  //     });

  //     dispatch(uploadImagesRequest(imageFormData));

  //     if (fileInputRef.current) fileInputRef.current.value = '';
  //   },
  //   [editImagePaths]
  // );

  const onClickImageUpload = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  return (
    <EditModalCarouselWrapper>
      <EditModalSelectedImage key={selectedImage} {...slideInSeletedImage}>
        <img src={`http://localhost:3065/${selectedImage}`} alt="클릭한 게시글 이미지" />
      </EditModalSelectedImage>

      <EditModalSwiperImages>
        <Swiper
          slidesPerView={3}
          spaceBetween={5}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {editImagePaths.map((image: string, i: number) => (
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
        {uploadImagesLoading ? (
          <LoadingOutlined />
        ) : (
          <div onClick={onClickImageUpload}>
            <UploadOutlined />
            <p>UPLOAD</p>
          </div>
        )}
        {/* onChange={onFileChange} */}
        <input type="file" name="image" multiple ref={fileInputRef} />
      </EditModalUploadBtn>
    </EditModalCarouselWrapper>
  );
};

export default EditModalCarousel;
