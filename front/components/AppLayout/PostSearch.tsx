import React, { useCallback, useMemo } from 'react';
import { ShareAltOutlined, CommentOutlined, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import useOverlays from 'utils/useOverlays';
import useClipboard from 'utils/useClipboard';

import { imgURL } from 'config';
import { SearchProps } from './Search';
import { RootState } from 'store/reducers';
import { Post, PostComment, PostLike } from 'store/types/postType';
import { slideInList } from 'styles/Common/animation';
import {
  NoSearchPostContainer,
  PostCard,
  PostContentWrapper,
  PostImageWrapper,
  PostSearchWrapper
} from 'styles/AppLayout/postSearch';

const PostSearch = ({ keyword }: SearchProps) => {
  const { openOverlay } = useOverlays();
  const { me } = useSelector((state: RootState) => state.user);
  const { searchPosts, searchPostsLoading, searchPostsDone } = useSelector((state: RootState) => state.post);
  const { copyToClipboard } = useClipboard();

  const liked = useMemo(
    () => searchPosts.map((post: Post) => post.Likers.some((liker: PostLike) => liker.id === me?.id)),
    [searchPosts, me]
  );

  const hasCommented = useMemo(
    () =>
      searchPosts.map((post: Post) =>
        post.Comments.some((comment: PostComment) => {
          const isUserCommented = comment.User?.id === me?.id;
          const isUserReplied = comment.Replies?.some(reply => reply.User?.id === me?.id);
          return isUserCommented || isUserReplied;
        })
      ),
    [searchPosts, me]
  );

  const onClickPost = useCallback(
    (post: Post) => {
      openOverlay('post', post);
    },
    [searchPosts]
  );

  const openImagePreview = useCallback((image: string) => {
    openOverlay('preview', image);
  }, []);

  const handleShareButtonClick = (e: React.MouseEvent<HTMLElement>, postId: number) => {
    e.stopPropagation();
    copyToClipboard(`${window.location.origin}/post/${postId}`);
  };

  return (
    <>
      {searchPostsLoading && (
        <NoSearchPostContainer>
          <LoadingOutlined />
        </NoSearchPostContainer>
      )}

      {!searchPostsLoading && searchPosts.length === 0 && searchPostsDone && (
        <NoSearchPostContainer>
          <p>&quot;{keyword}&quot;에 대한 게시글검색 결과가 없습니다.</p>
        </NoSearchPostContainer>
      )}

      <PostSearchWrapper>
        {searchPosts.map((post: Post, i: number) => (
          <PostCard key={post.id} onClick={() => onClickPost(post)} {...slideInList}>
            <PostImageWrapper>
              <img src={imgURL(post.Images[0].src)} alt="게시글의 첫번째 이미지" />
              <ShareAltOutlined onClick={e => handleShareButtonClick(e, post.id)} />
            </PostImageWrapper>

            <PostContentWrapper $liked={liked[i]} $hasCommented={hasCommented[i]}>
              <img
                src={post.User.ProfileImage ? imgURL(post.User.ProfileImage.src) : '/user.jpg'}
                alt="유저 프로필 이미지"
                onClick={e => {
                  e.stopPropagation();
                  openImagePreview(post.User.ProfileImage ? `${post.User.ProfileImage.src}` : '/user.jpg');
                }}
              />

              <p>{post.User.nickname}</p>

              <span>
                <HeartOutlined />
                <p>{post.Likers.length.toLocaleString()}</p>
              </span>

              <span>
                <CommentOutlined />
                <p>
                  {post.Comments.reduce((total, comment) => {
                    const repliesCount = comment.Replies ? comment.Replies.length : 0;

                    if (comment.isDeleted) {
                      return total + repliesCount;
                    }

                    return total + 1 + repliesCount;
                  }, 0).toLocaleString()}
                </p>
              </span>
            </PostContentWrapper>
          </PostCard>
        ))}
      </PostSearchWrapper>
    </>
  );
};

export default PostSearch;
