import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ArrowsAltOutlined, CommentOutlined, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import useScroll from 'utils/useScroll';
import { RootState } from 'store/reducers';
import { showPostModal } from 'store/actions/postAction';
import { Image, Post, PostComment, PostLike } from 'store/types/postType';
import { slideInFromBottom, slideInList } from 'styles/Common/animation';
import { UserPostContent, UserPostImage, UserPostOption, UserPostsWrapper } from 'styles/User/userPosts';
import { NoSearchTextContainer, UserSearchLoading } from 'styles/User/userFollowList';

const UserPosts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id: userId } = router.query;
  const userContainerRef = useRef<HTMLDivElement>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const { userPosts, loadUserPostsLoading, loadUserPostsDone } = useSelector((state: RootState) => state.post);
  useScroll({ type: 'user-posts', ref: userContainerRef, userId: Number(userId) });

  const onClickPost = useCallback((post: Post) => {
    dispatch(showPostModal(post));
  }, []);

  const liked = useMemo(
    () => userPosts.map((post: Post) => post.Likers.some((liker: PostLike) => liker.id === me?.id)),
    [userPosts, me]
  );

  const hasCommented = useMemo(
    () =>
      userPosts.map((post: Post) =>
        post.Comments.some((comment: PostComment) => {
          const isUserCommented = comment.User?.id === me?.id;
          const isUserReplied = comment.Replies?.some(reply => reply.User?.id === me?.id);
          return isUserCommented || isUserReplied;
        })
      ),
    [userPosts, me]
  );

  return (
    <UserPostsWrapper
      ref={userContainerRef}
      $isGridDisabled={(loadUserPostsLoading && userPosts.length < 14) || userPosts.length === 0}
      {...(!loadUserPostsLoading && slideInFromBottom(0.3))}
    >
      {loadUserPostsLoading && userPosts.length < 14 ? (
        <UserSearchLoading $isGridDisabled={(loadUserPostsLoading && userPosts.length < 14) || userPosts.length === 0}>
          <LoadingOutlined />
        </UserSearchLoading>
      ) : loadUserPostsDone && userPosts.length === 0 ? (
        <NoSearchTextContainer
          $isGridDisabled={(loadUserPostsLoading && userPosts.length < 14) || userPosts.length === 0}
        >
          <p>Not posts anyone yet.</p>
        </NoSearchTextContainer>
      ) : (
        userPosts.map((post: Post, i: number) => (
          <motion.article key={post.id} onClick={() => onClickPost(post)} {...slideInList}>
            <UserPostImage>
              <img src={`${post.Images[0].src}`} alt="게시글의 첫번째 이미지" />

              <ArrowsAltOutlined />

              <div>
                {post.Images.map((image: Image) => (
                  <div key={image.id} />
                ))}
              </div>
            </UserPostImage>

            <UserPostContent $selectMode={false}>
              <div>
                <h1>{post.content}</h1>
                <p>{post.User.nickname}</p>

                <UserPostOption $liked={liked[i]} $hasCommented={hasCommented[i]}>
                  <div>
                    <HeartOutlined />
                    <span>{post.Likers.length.toLocaleString()}</span>
                  </div>

                  <div>
                    <CommentOutlined />
                    <span>
                      {post.Comments.reduce((total, comment) => {
                        const repliesCount = comment.Replies ? comment.Replies.length : 0;

                        if (comment.isDeleted) {
                          return total + repliesCount;
                        }

                        return total + 1 + repliesCount;
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                </UserPostOption>
              </div>
            </UserPostContent>
          </motion.article>
        ))
      )}
    </UserPostsWrapper>
  );
};

export default UserPosts;
