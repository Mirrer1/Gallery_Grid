import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  CloseSquareTwoTone,
  DeleteOutlined,
  LoadingOutlined,
  SwapOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { END } from 'redux-saga';
import Head from 'next/head';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import BigPostPreview from 'components/Gallery/BigPostPreview';
import PostPreview from 'components/Gallery/PostPreview';
import PostModal from 'components/Modal/PostModal';

import wrapper from 'store/configureStore';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { loadMyInteractionsPostsRequest, showPostModal } from 'store/actions/postAction';
import { RootState } from 'store/reducers';
import { Post, UserHistoryPost } from 'store/types/postType';
import { PostPreviewWrapper } from 'styles/Gallery/postPreview';
import { slideInFromBottom, slideInList } from 'styles/Common/animation';
import {
  GalleryActionBtn,
  GalleryCategoryBtn,
  GalleryCategoryWrapper,
  GalleryWrapper,
  GalleryNoPostsContainer,
  GalleryLoadingContainer
} from 'styles/Gallery';

const Gallery = () => {
  const dispatch = useDispatch();
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const { isPostModalVisible, galleryPosts, loadMyInteractionsPostsLoading } = useSelector(
    (state: RootState) => state.post
  );
  const [selectMenu, setSelectMenu] = useState('all');
  const [selectSort, setSelectSort] = useState('best');
  const [selectMode, setSelectMode] = useState(false);

  const onClickCategory = useCallback((category: string) => {
    setSelectMenu(category);
  }, []);

  const onClickSort = useCallback(
    (sort: 'best' | 'new') => {
      setSelectSort(sort);

      if (selectMenu === 'all') {
        dispatch(loadMyInteractionsPostsRequest(sort));
      } else if (selectMenu === 'like') {
      } else if (selectMenu === 'comment') {
      }
    },
    [selectSort, selectMenu]
  );

  const onExecuteSelectMode = useCallback(() => {
    setSelectMode(true);
  }, []);

  const onCancelSelectMode = useCallback(() => {
    setSelectMode(false);
  }, []);

  const onClickPost = useCallback((post: Post) => {
    dispatch(showPostModal(post));
  }, []);

  useEffect(() => {
    console.log(galleryPosts);
  }, []);

  return (
    <>
      <Head>
        <title>Gallery Grid | Gallery</title>
      </Head>

      <AppLayout>
        <GalleryWrapper>
          <div>
            <h1>FILTER:</h1>

            <GalleryCategoryWrapper>
              <GalleryCategoryBtn type="button" onClick={() => onClickCategory('all')} $selected={selectMenu === 'all'}>
                <p>All</p>
                <div />
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickCategory('like')}
                $selected={selectMenu === 'like'}
              >
                <p>Like</p>
                <div />
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickCategory('comment')}
                $selected={selectMenu === 'comment'}
              >
                <p>Comment</p>
                <div />
              </GalleryCategoryBtn>
            </GalleryCategoryWrapper>
          </div>

          <GalleryActionBtn $selectMode={selectMode}>
            {selectMode ? (
              <>
                <button>
                  <DeleteOutlined />
                  선택삭제
                </button>
                <button>
                  <DeleteOutlined />
                  전체삭제
                </button>
                <button onClick={onCancelSelectMode}>
                  <CloseSquareOutlined />
                  취소
                </button>
              </>
            ) : (
              <button onClick={onExecuteSelectMode}>
                <CheckSquareOutlined />
                선택
              </button>
            )}

            {selectSort === 'best' ? (
              <button type="button" onClick={() => onClickSort('new')}>
                <SwapOutlined />
                인기순
              </button>
            ) : (
              <button type="button" onClick={() => onClickSort('best')}>
                <SwapOutlined />
                최신순
              </button>
            )}
          </GalleryActionBtn>

          <div ref={galleryContainerRef}>
            {loadMyInteractionsPostsLoading ? (
              <GalleryLoadingContainer>
                <LoadingOutlined />
              </GalleryLoadingContainer>
            ) : galleryPosts.length > 0 ? (
              <>
                <BigPostPreview userHistory={galleryPosts[0]} selectMode={selectMode} />

                {galleryPosts.length > 1 && (
                  <PostPreviewWrapper {...slideInFromBottom(0.3)}>
                    {galleryPosts.slice(1).map((userHistory: UserHistoryPost) => (
                      <motion.article
                        key={userHistory.id}
                        onClick={() => onClickPost(userHistory.Post)}
                        {...slideInList}
                      >
                        <PostPreview userHistory={userHistory} selectMode={selectMode} />
                      </motion.article>
                    ))}
                  </PostPreviewWrapper>
                )}
              </>
            ) : (
              <GalleryNoPostsContainer>
                <CloseSquareTwoTone twoToneColor="#6BA2E6" />
                <h1>No posts yet.</h1>
                <p>게시글이 존재하지 않습니다.</p>
              </GalleryNoPostsContainer>
            )}
          </div>
        </GalleryWrapper>

        {isPostModalVisible && <PostModal />}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadMyInteractionsPostsRequest('best'));

  context.store.dispatch(END);
  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;

  if (!me) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
});

export default Gallery;
