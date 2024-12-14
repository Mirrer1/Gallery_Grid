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
import { toast } from 'react-toastify';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from 'components/AppLayout';
import PostPreview from 'components/Gallery/PostPreview';
import BigPostPreview from 'components/Gallery/BigPostPreview';
import { PageHead, SeoProps } from 'components/PageHead';

import wrapper from 'store/configureStore';
import botDetector from 'utils/botDetector';
import useOverlays from 'utils/useOverlays';
import useToastStatus from 'utils/useToast';
import { loadMyInfoRequest } from 'store/actions/userAction';
import { loadMyInteractionsPostsRequest, showDeleteModal } from 'store/actions/postAction';
import { RootState } from 'store/reducers';
import { UserHistoryPost } from 'store/types/postType';
import { PostPreviewWrapper } from 'styles/Gallery/postPreview';
import { slideInFromBottom, slideInList, slideInTooltip } from 'styles/Common/animation';
import {
  GalleryActionBtn,
  GalleryCategoryBtn,
  GalleryCategoryWrapper,
  GalleryWrapper,
  GalleryNoPostsContainer,
  GalleryLoadingContainer
} from 'styles/Gallery';

const Gallery = ({ seo }: { seo: SeoProps }) => {
  const dispatch = useDispatch();
  const { openOverlay } = useOverlays();
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const { galleryPosts, loadMyInteractionsPostsLoading, loadMyInteractionsPostsDone } = useSelector(
    (state: RootState) => state.post
  );

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectMenu, setSelectMenu] = useState<'all' | 'like' | 'comment'>('all');
  const [selectSort, setSelectSort] = useState<'best' | 'new'>('best');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
  useToastStatus();

  const onClickMenu = useCallback((menu: 'all' | 'like' | 'comment') => {
    setSelectMenu(menu);
    setSelectMode(false);
    setSelectedPostIds([]);
  }, []);

  const onClickSort = useCallback((sort: 'best' | 'new') => {
    setSelectSort(sort);
  }, []);

  const onExecuteSelectMode = useCallback(() => {
    setSelectMode(true);
  }, []);

  const onCancelSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedPostIds([]);
  }, []);

  const onSelectDelete = useCallback(() => {
    if (selectedPostIds.length === 0) {
      toast.warning('삭제할 게시글을 선택해주세요.');
      return;
    }

    openOverlay('delete', { type: 'Gallery 게시글', menu: selectMenu, id: selectedPostIds });
  }, [selectedPostIds]);

  const onSelectAll = useCallback(() => {
    const allPostIds = galleryPosts.map((userHistory: UserHistoryPost) => userHistory.id);
    setSelectedPostIds(allPostIds);

    dispatch(showDeleteModal({ type: 'Gallery 게시글', menu: selectMenu, id: allPostIds }));
  }, [galleryPosts, selectedPostIds]);

  useEffect(() => {
    if (!isFirstRender) {
      dispatch(loadMyInteractionsPostsRequest(selectMenu, selectSort));
    }
  }, [selectMenu, selectSort]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <>
      <PageHead title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />

      <AppLayout>
        <GalleryWrapper {...slideInFromBottom()}>
          <div>
            <h1>FILTER:</h1>

            <GalleryCategoryWrapper>
              <GalleryCategoryBtn type="button" onClick={() => onClickMenu('all')} $selected={selectMenu === 'all'}>
                <p>All</p>
                <div />
              </GalleryCategoryBtn>

              <GalleryCategoryBtn type="button" onClick={() => onClickMenu('like')} $selected={selectMenu === 'like'}>
                <p>Like</p>
                <div />
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickMenu('comment')}
                $selected={selectMenu === 'comment'}
              >
                <p>Comment</p>
                <div />
              </GalleryCategoryBtn>
            </GalleryCategoryWrapper>
          </div>

          <GalleryActionBtn $selectMode={selectMode}>
            {selectMode ? (
              <motion.div key={selectMode ? 'selectMode-true' : 'selectMode-false'} {...slideInTooltip}>
                <button type="button" onClick={onSelectDelete}>
                  <DeleteOutlined />
                  선택삭제
                </button>
                <button type="button" onClick={onSelectAll}>
                  <DeleteOutlined />
                  전체삭제
                </button>
                <button onClick={onCancelSelectMode}>
                  <CloseSquareOutlined />
                  취소
                </button>
              </motion.div>
            ) : (
              <motion.div key={selectMode ? 'selectMode-true' : 'selectMode-false'} {...slideInTooltip}>
                <button onClick={onExecuteSelectMode}>
                  <CheckSquareOutlined />
                  선택
                </button>

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
              </motion.div>
            )}
          </GalleryActionBtn>

          <div ref={galleryContainerRef}>
            {loadMyInteractionsPostsLoading ? (
              <GalleryLoadingContainer>
                <LoadingOutlined />
              </GalleryLoadingContainer>
            ) : galleryPosts.length > 0 ? (
              <>
                <BigPostPreview
                  userHistory={galleryPosts[0]}
                  selectMode={selectMode}
                  selectedPostIds={selectedPostIds}
                  setSelectedPostIds={setSelectedPostIds}
                />

                {galleryPosts.length > 1 && (
                  <PostPreviewWrapper {...slideInFromBottom(0.3)}>
                    {galleryPosts.slice(1).map((userHistory: UserHistoryPost) => (
                      <motion.article key={userHistory.id} {...slideInList}>
                        <PostPreview
                          userHistory={userHistory}
                          selectMode={selectMode}
                          selectedPostIds={selectedPostIds}
                          setSelectedPostIds={setSelectedPostIds}
                        />
                      </motion.article>
                    ))}
                  </PostPreviewWrapper>
                )}
              </>
            ) : (
              loadMyInteractionsPostsDone && (
                <GalleryNoPostsContainer>
                  <CloseSquareTwoTone twoToneColor="#6BA2E6" />
                  <h1>No posts yet.</h1>
                  <p>게시글이 존재하지 않습니다.</p>
                </GalleryNoPostsContainer>
              )
            )}
          </div>
        </GalleryWrapper>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const isBot = botDetector(context.req.headers['user-agent']);

  if (isBot) {
    const seo = {
      title: 'Gallery Grid | Gallery',
      description: 'Gallery Grid에서 좋아요하거나 댓글을 단 게시글을 확인하세요.',
      imageUrl: 'https://gallerygrd.com/favicon.ico',
      url: 'https://gallerygrd.com/gallery'
    };

    return {
      props: {
        seo
      }
    };
  }

  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadMyInteractionsPostsRequest('all', 'best'));
  context.store.dispatch(END);

  await context.store.sagaTask?.toPromise();

  const state = context.store.getState();
  const { me } = state.user;
  const { galleryPosts } = state.post;

  const seo = {
    title: `Gallery Grid | ${me?.nickname || '사용자'}'s Gallery`,
    description: `${me?.nickname || '사용자'}가 좋아요하거나 댓글을 단 게시글을 Gallery Grid에서 확인하세요.`,
    imageUrl: galleryPosts?.[0]?.Post?.Images?.[0]?.src || 'https://gallerygrd.com/favicon.ico',
    url: 'https://gallerygrd.com/gallery'
  };

  return {
    props: {
      seo
    }
  };
});

export default Gallery;
