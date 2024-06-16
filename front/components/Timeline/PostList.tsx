import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowsAltOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined
} from '@ant-design/icons';

import PostImageCarousel from './PostImageCarousel';
import { RootState } from 'store/reducers';
import { hideCommentList, loadPostsRequest, showCommentList, showPostCarousel } from 'store/actions/postAction';
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
  const { mainPosts, hasMorePosts, loadPostsLoading, isCommentListVisible, isCarouselVisible } = useSelector(
    (state: RootState) => state.post
  );

  const [category, setCategory] = useState('best');
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<string | null>(null);

  const onClickCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  const showCarousel = useCallback((images: string[]) => {
    setModalImages(images);
    dispatch(showPostCarousel());
  }, []);

  const handleTooltip = useCallback(
    (postId: string) => {
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
  }, [category]);

  useEffect(() => {
    const onScroll = () => {
      if (
        postContainerRef.current &&
        postContainerRef.current.scrollTop + postContainerRef.current.clientHeight >
          postContainerRef.current.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) dispatch(loadPostsRequest());
      }
    };

    const postContainer = postContainerRef.current;
    if (postContainer) postContainer.addEventListener('scroll', onScroll);

    return () => {
      if (postContainer) postContainer.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <PostContainer ref={postContainerRef}>
      <div ref={firstPostRef}></div>

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

      {mainPosts.map((post, i) => (
        <PostWrapper key={post.id}>
          <PostHeader>
            <div>
              <img src={post.profile} alt="author profile image" />

              <div>
                <h1>{post.user}</h1>
                <p>{post.createdAt}</p>
              </div>
            </div>

            <div>
              <PostFollowBtn type="button">Follow</PostFollowBtn>

              <Tooltip>
                {isTooltipVisible && <TooltipOutsideArea onClick={hideTooltip}></TooltipOutsideArea>}

                <MoreOutlined onClick={() => handleTooltip(post.id)} />
                <TooltipBtn $visible={isTooltipVisible === post.id}>
                  <button type="button">
                    <EditOutlined />
                    수정
                  </button>
                  <button type="button">
                    <DeleteOutlined />
                    삭제
                  </button>
                </TooltipBtn>
              </Tooltip>
            </div>
          </PostHeader>

          <PostContents>
            <div>
              <img src={post.img[0]} alt="post image" onClick={() => showCarousel(post.img)} />

              <div>
                {post.img.map((_, i) => (
                  <div key={i}></div>
                ))}
              </div>

              <ArrowsAltOutlined onClick={() => showCarousel(post.img)} />
            </div>

            <div>
              <p>{post.desc}</p>

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
        </PostWrapper>
      ))}

      {isCarouselVisible && <PostImageCarousel images={modalImages} />}
    </PostContainer>
  );
};

export default PostList;
