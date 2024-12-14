import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertOutlined,
  ArrowsAltOutlined,
  CloseSquareTwoTone,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import Link from 'next/link';

import useScroll from 'utils/useScroll';
import formatDate from 'utils/useListTimes';
import useOverlays from 'utils/useOverlays';
import useClipboard from 'utils/useClipboard';

import { imgURL } from 'config';
import { RootState } from 'store/reducers';
import { Image, Post, PostLike } from 'store/types/postType';
import {
  hideCommentList,
  showCommentList,
  executePostEdit,
  likePostRequest,
  unLikePostRequest,
  initializePostList,
  loadNewPostsRequest,
  loadBestPostsRequest,
  loadFollowingPostsRequest,
  deleteFollowingUserPostsRequest
} from 'store/actions/postAction';
import { followUserRequest, unFollowUserRequest } from 'store/actions/userAction';

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
  PostFollowBtn,
  NoFollowingPostsContainer,
  TimelineLoadingContainer
} from 'styles/Timeline/postList';

const PostList = () => {
  const dispatch = useDispatch();
  const firstPostRef = useRef<HTMLDivElement>(null);
  const postContainerRef = useRef<HTMLDivElement>(null);
  const { me, followUserDone, unFollowUserDone } = useSelector((state: RootState) => state.user);
  const {
    timelinePosts,
    postImagePaths,
    addPostDone,
    commentVisiblePostId,
    isCategoryChanged,
    isCommentListVisible,
    loadFollowingPostsDone,
    loadNewPostsLoading,
    loadBestPostsLoading,
    loadFollowingPostsLoading
  } = useSelector((state: RootState) => state.post);

  const { openOverlay } = useOverlays();
  const { copyToClipboard } = useClipboard();
  const [category, setCategory] = useState<'best' | 'new' | 'follow'>('best');
  const [followPostId, setFollowPostId] = useState<number | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState<number | null>(null);
  useScroll({ type: `timeline-${category}`, ref: postContainerRef });

  const onClickCategory = useCallback((category: 'best' | 'new' | 'follow') => {
    setCategory(category);
    dispatch(initializePostList());
  }, []);

  const showCarousel = useCallback((images: Image[]) => {
    openOverlay('carousel', images);
  }, []);

  const openDeleteModal = useCallback((postId: number) => {
    openOverlay('delete', { type: '게시글', id: postId });
    setIsTooltipVisible(null);
  }, []);

  const openEditModal = useCallback((post: Post) => {
    setIsTooltipVisible(null);
    openOverlay('post', post);
    dispatch(executePostEdit());
  }, []);

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
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

  const onToggleFollow = useCallback(
    (postId: number, userId: number) => {
      setFollowPostId(postId);
      const isFollowing = me.Followings.some((following: { id: number }) => following.id === userId);

      if (isFollowing) {
        dispatch(unFollowUserRequest(userId));
        category === 'follow' && dispatch(deleteFollowingUserPostsRequest(userId));
      } else {
        dispatch(followUserRequest(userId));
      }
    },
    [me.Followings, category]
  );

  const handleShareButtonClick = (postId: number) => {
    copyToClipboard(`${window.location.origin}/post/${postId}`);
    setIsTooltipVisible(null);
  };

  useEffect(() => {
    if (followUserDone || unFollowUserDone) {
      setFollowPostId(null);
    }
  }, [followUserDone, unFollowUserDone]);

  useEffect(() => {
    if (window.innerWidth > 992 && firstPostRef.current) {
      firstPostRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [category, addPostDone]);

  useEffect(() => {
    if (isCommentListVisible) dispatch(hideCommentList());

    if (isCategoryChanged && category === 'best') {
      dispatch(loadBestPostsRequest());
    } else if (isCategoryChanged && category === 'new') {
      dispatch(loadNewPostsRequest());
    } else if (isCategoryChanged && category === 'follow') {
      dispatch(loadFollowingPostsRequest());
    }
  }, [isCategoryChanged, category]);

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

      {isCategoryChanged &&
      timelinePosts.length === 0 &&
      (loadNewPostsLoading || loadBestPostsLoading || loadFollowingPostsLoading) ? (
        <TimelineLoadingContainer>
          <LoadingOutlined />
        </TimelineLoadingContainer>
      ) : timelinePosts.length === 0 && category === 'follow' && loadFollowingPostsDone ? (
        <NoFollowingPostsContainer>
          <CloseSquareTwoTone twoToneColor="#6BA2E6" />
          <h1>No posts yet.</h1>
          <p>게시글이 존재하지 않습니다!</p>
        </NoFollowingPostsContainer>
      ) : (
        timelinePosts.map((post: Post) => (
          <PostWrapper key={post.id} {...slideInList}>
            <PostHeader>
              <div>
                <img
                  src={post.User.ProfileImage ? imgURL(post.User.ProfileImage.src) : '/user.jpg'}
                  alt="유저 프로필 이미지"
                  onClick={() =>
                    openImagePreview(post.User.ProfileImage ? `${post.User.ProfileImage.src}` : '/user.jpg')
                  }
                />
                <div>
                  <Link href={`/user/${post.UserId}`}>{post.User.nickname}</Link>
                  <p>
                    {formatDate(post.createdAt)}
                    {post.location && ` - ${post.location}`}
                  </p>
                </div>
              </div>
              <div>
                {me.id !== post.UserId && (
                  <PostFollowBtn
                    type="button"
                    onClick={() => onToggleFollow(post.id, post.UserId)}
                    $isFollowing={me.Followings.some((following: { id: number }) => following.id === post.UserId)}
                  >
                    {followPostId === post.id ? (
                      <LoadingOutlined />
                    ) : me.Followings.some((following: { id: number }) => following.id === post.UserId) ? (
                      'Unfollow'
                    ) : (
                      'Follow'
                    )}
                  </PostFollowBtn>
                )}
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
                        <button type="button" onClick={() => handleShareButtonClick(post.id)}>
                          <ShareAltOutlined />
                          공유
                        </button>
                        <button type="button" onClick={() => toast.info('서비스 준비 중입니다.')}>
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
                  src={imgURL(post.Images[0].src)}
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
                <p>{post.content.replace(/\\n/g, '\n').replace(/␣/g, ' ')}</p>

                <PostOptions
                  $liked={post.Likers.some(liker => liker.id === me?.id)}
                  $commentVisiblePostId={commentVisiblePostId === post.id}
                >
                  <div onClick={() => onToggleLike(post.id)}>
                    <HeartOutlined />
                    <span>{post.Likers.length.toLocaleString()}</span>
                  </div>
                  <div onClick={() => onToggleComment(post.id)}>
                    <CommentOutlined />
                    {post.Comments.reduce((total, comment) => {
                      const repliesCount = comment.Replies ? comment.Replies.length : 0;

                      if (comment.isDeleted) {
                        return total + repliesCount;
                      }

                      return total + 1 + repliesCount;
                    }, 0).toLocaleString()}
                  </div>
                </PostOptions>
              </div>
            </PostContents>
          </PostWrapper>
        ))
      )}
    </PostContainer>
  );
};

export default PostList;
