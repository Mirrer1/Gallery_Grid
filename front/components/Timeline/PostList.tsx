import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertOutlined,
  ArrowsAltOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

import PostImageCarousel from './PostImageCarousel';
import DeleteModal from 'components/Modal/DeleteModal';
import useScroll from 'utils/useScroll';
import { formatDate } from 'utils/formatDate';
import { RootState } from 'store/reducers';
import { Image, Post } from 'store/types/postType';
import { hideCommentList, showCommentList, showPostCarousel } from 'store/actions/postAction';
import { slideInList } from 'styles/Common/animation';
import { Tooltip, TooltipBtn, TooltipOutsideArea } from 'styles/Common/tooltip';
import {
  PostWrapper,
  PostHeader,
  PostContents,
  PostOptions,
  PostCategory,
  CategoryItem,
  PostContainer,
  PostFollowBtn
} from 'styles/Timeline/postList';

const PostList = () => {
  const dispatch = useDispatch();
  const firstPostRef = useRef<HTMLDivElement>(null);
  const postContainerRef = useRef<HTMLDivElement>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts, imagePaths, isCommentListVisible, isCarouselVisible, addPostDone } = useSelector(
    (state: RootState) => state.post
  );
  useScroll({ type: 'timeline', ref: postContainerRef });

  const [category, setCategory] = useState('best');
  const [modalImages, setModalImages] = useState<Image[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<number | boolean | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const onClickCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  const showCarousel = useCallback((images: Image[]) => {
    setModalImages(images);
    dispatch(showPostCarousel());
  }, []);

  const showDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(true);
  }, []);

  const hideDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
    setIsTooltipVisible(false);
  }, []);

  const handleTooltip = useCallback(
    (postId: number) => {
      setIsTooltipVisible(isTooltipVisible === postId ? null : postId);
    },
    [isTooltipVisible]
  );

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(null);
  }, []);

  const onToggleComment = useCallback(() => {
    if (isCommentListVisible) dispatch(hideCommentList());
    else dispatch(showCommentList());
  }, [isCommentListVisible]);

  useEffect(() => {
    if (firstPostRef.current) {
      firstPostRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [category, addPostDone]);

  return (
    <PostContainer ref={postContainerRef} $uploading={imagePaths.length > 0}>
      <div ref={firstPostRef} />

      <PostCategory>
        <CategoryItem onClick={() => onClickCategory('best')} $selected={category === 'best'}>
          Best
        </CategoryItem>

        <CategoryItem onClick={() => onClickCategory('recent')} $selected={category === 'recent'}>
          Recent
        </CategoryItem>

        <CategoryItem onClick={() => onClickCategory('follow')} $selected={category === 'follow'}>
          Follow
        </CategoryItem>
      </PostCategory>

      {mainPosts.map((post: Post) => (
        <PostWrapper key={post.id} {...slideInList}>
          <PostHeader>
            <div>
              <img src={post.User.ProfileImage ? post.User.ProfileImage.src : '/user.jpg'} alt="author profile image" />

              <div>
                <h1>{post.User.nickname}</h1>
                <p>
                  {formatDate(post.createdAt)}
                  {post.location && ` - ${post.location}`}
                </p>
              </div>
            </div>

            <div>
              <PostFollowBtn type="button">Follow</PostFollowBtn>

              <Tooltip>
                {isTooltipVisible && <TooltipOutsideArea onClick={hideTooltip} />}

                <MoreOutlined onClick={() => handleTooltip(post.id)} />
                {me?.id === post.UserId ? (
                  <TooltipBtn $visible={isTooltipVisible === post.id}>
                    <button type="button">
                      <EditOutlined />
                      수정
                    </button>
                    <button type="button" onClick={showDeleteModal}>
                      <DeleteOutlined />
                      삭제
                    </button>
                  </TooltipBtn>
                ) : (
                  <TooltipBtn $visible={isTooltipVisible === post.id}>
                    <button type="button">
                      <ShareAltOutlined />
                      공유
                    </button>
                    <button type="button">
                      <AlertOutlined />
                      신고
                    </button>
                  </TooltipBtn>
                )}
              </Tooltip>
            </div>
          </PostHeader>

          <PostContents>
            <div>
              <img
                src={`http://localhost:3065/${post.Images[0].src}`}
                alt="post image"
                onClick={() => showCarousel(post.Images)}
              />

              <div>
                {post.Images.map((_: Image, i: number) => (
                  <div key={i} />
                ))}
              </div>

              <ArrowsAltOutlined onClick={() => showCarousel(post.Images)} />
            </div>

            <div>
              <p>{post.content}</p>

              <PostOptions $isCommentListVisible={isCommentListVisible}>
                <div>
                  <LikeOutlined />
                  <span>24</span>
                </div>

                <div onClick={onToggleComment}>
                  <CommentOutlined />
                  <span>13</span>
                </div>
              </PostOptions>
            </div>
          </PostContents>

          {isCarouselVisible && <PostImageCarousel images={modalImages} />}
          {isDeleteModalVisible && <DeleteModal type="게시글" deleteId={post.id} hideDeleteModal={hideDeleteModal} />}
        </PostWrapper>
      ))}
    </PostContainer>
  );
};

export default PostList;
