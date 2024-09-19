import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertOutlined,
  ArrowsAltOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  MoreOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

import PostImageCarousel from './PostImageCarousel';
import DeleteModal from 'components/Modal/DeleteModal';
import PostModal from 'components/Modal/PostModal';
import ImagePreview from 'components/Modal/ImagePreviewModal';

import useScroll from 'utils/useScroll';
import formatDate from 'utils/useListTimes';
import useImagePreview from 'utils/useImagePreview';
import { RootState } from 'store/reducers';
import { Image, Post, PostLike } from 'store/types/postType';
import {
  hideCommentList,
  showCommentList,
  showPostCarousel,
  showDeleteModal,
  showPostModal,
  executePostEdit,
  likePostRequest,
  unLikePostRequest
} from 'store/actions/postAction';
import { slideInList, slideInTooltip } from 'styles/Common/animation';
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
  const {
    timelinePosts,
    postImagePaths,
    isCarouselVisible,
    isDeleteModalVisible,
    addPostDone,
    isPostModalVisible,
    commentVisiblePostId
  } = useSelector((state: RootState) => state.post);
  const { imagePreview, showImagePreview, hideImagePreview } = useImagePreview();
  useScroll({ type: 'timeline-new', ref: postContainerRef });

  const [category, setCategory] = useState('best');
  const [modalImages, setModalImages] = useState<Image[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<number | null>(null);

  const onClickCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  const showCarousel = useCallback((images: Image[]) => {
    setModalImages(images);
    dispatch(showPostCarousel());
  }, []);

  const openDeleteModal = useCallback((postId: number) => {
    dispatch(showDeleteModal({ type: '게시글', id: postId }));
    setIsTooltipVisible(null);
  }, []);

  const openEditModal = useCallback((post: Post) => {
    setIsTooltipVisible(null);
    dispatch(showPostModal(post));
    dispatch(executePostEdit());
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

  const onToggleComment = useCallback(
    (postId: number) => {
      if (commentVisiblePostId === postId) dispatch(hideCommentList());
      else dispatch(showCommentList(postId));
    },
    [commentVisiblePostId]
  );

  const onToggleLike = useCallback(
    (postId: number) => {
      const post = timelinePosts.find((post: Post) => post.id === postId);
      if (!post) return;

      if (post.Likers.some((liker: PostLike) => liker.id === me?.id)) dispatch(unLikePostRequest(postId));
      else dispatch(likePostRequest(postId));
    },
    [timelinePosts]
  );

  useEffect(() => {
    if (firstPostRef.current) {
      firstPostRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [category, addPostDone]);

  return (
    <PostContainer ref={postContainerRef} $uploading={postImagePaths.length > 0}>
      <div ref={firstPostRef} />

      <PostCategory>
        <CategoryItem onClick={() => onClickCategory('best')} $selected={category === 'best'}>
          <p>Best</p>
          <div />
        </CategoryItem>

        <CategoryItem onClick={() => onClickCategory('new')} $selected={category === 'new'}>
          <p>New</p>
          <div />
        </CategoryItem>

        <CategoryItem onClick={() => onClickCategory('follow')} $selected={category === 'follow'}>
          <p>Follow</p>
          <div />
        </CategoryItem>
      </PostCategory>

      {timelinePosts.map((post: Post) => (
        <PostWrapper key={post.id} {...slideInList}>
          <PostHeader>
            <div>
              <img
                src={post.User.ProfileImage ? `http://localhost:3065/${post.User.ProfileImage.src}` : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={() =>
                  showImagePreview(
                    post.User.ProfileImage ? `http://localhost:3065/${post.User.ProfileImage.src}` : '/user.jpg'
                  )
                }
              />

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
              <MoreOutlined onClick={() => handleTooltip(post.id)} />

              {isTooltipVisible && (
                <Tooltip key={isTooltipVisible} {...slideInTooltip} $visible={isTooltipVisible === post.id}>
                  <TooltipOutsideArea onClick={hideTooltip} />

                  {me?.id === post.UserId ? (
                    <TooltipBtn>
                      <button type="button" onClick={() => openEditModal(post)}>
                        <EditOutlined />
                        수정
                      </button>
                      <button type="button" onClick={() => openDeleteModal(post.id)}>
                        <DeleteOutlined />
                        삭제
                      </button>
                    </TooltipBtn>
                  ) : (
                    <TooltipBtn>
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
              )}
            </div>
          </PostHeader>

          <PostContents>
            <div>
              <img
                src={`http://localhost:3065/${post.Images[0].src}`}
                alt="게시글의 첫번째 이미지"
                onClick={() => showCarousel(post.Images)}
              />

              <div>
                {post.Images.map((image: Image) => (
                  <div key={image.id} />
                ))}
              </div>

              <ArrowsAltOutlined onClick={() => showCarousel(post.Images)} />
            </div>

            <div>
              <p>{post.content}</p>

              <PostOptions
                $liked={post.Likers.some(liker => liker.id === me?.id)}
                $commentVisiblePostId={commentVisiblePostId === post.id}
              >
                <div onClick={() => onToggleLike(post.id)}>
                  <HeartOutlined />
                  <span>{post.Likers.length}</span>
                </div>

                <div onClick={() => onToggleComment(post.id)}>
                  <CommentOutlined />
                  {post.Comments.reduce((total, comment) => {
                    const repliesCount = comment.Replies ? comment.Replies.length : 0;

                    if (comment.isDeleted) {
                      return total + repliesCount;
                    }

                    return total + 1 + repliesCount;
                  }, 0)}
                </div>
              </PostOptions>
            </div>
          </PostContents>
        </PostWrapper>
      ))}

      {isCarouselVisible && <PostImageCarousel images={modalImages} />}
      {isPostModalVisible && <PostModal />}
      {isDeleteModalVisible && <DeleteModal />}
      <ImagePreview imagePreview={imagePreview} hideImagePreview={hideImagePreview} />
    </PostContainer>
  );
};

export default PostList;
