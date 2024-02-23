import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { SwapOutlined } from '@ant-design/icons';

import AppLayout from 'components/AppLayout';
import BigPostPreview from 'components/Gallery/BigPostPreview';
import PostPreview from 'components/Gallery/PostPreview';
import { GalleryCategoryBtn, GalleryCategoryWrapper, GalleryWrapper } from 'styles/Gallery';

const Gallery = () => {
  const [selectMenu, setSelectMenu] = useState('all');
  const [selectSort, setSelectSort] = useState('best');

  const onClickCategory = useCallback((category: string) => {
    setSelectMenu(category);
  }, []);

  const onClickSort = useCallback((sort: string) => {
    setSelectSort(sort);
  }, []);

  return (
    <>
      <Head>
        <title>Gallery Grid | Gallery</title>
      </Head>

      <AppLayout>
        <GalleryWrapper>
          <h1>FILTER:</h1>

          <GalleryCategoryWrapper>
            <div>
              <GalleryCategoryBtn type="button" onClick={() => onClickCategory('all')} $selected={selectMenu === 'all'}>
                All
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickCategory('board')}
                $selected={selectMenu === 'board'}
              >
                Board
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickCategory('like')}
                $selected={selectMenu === 'like'}
              >
                Like
              </GalleryCategoryBtn>

              <GalleryCategoryBtn
                type="button"
                onClick={() => onClickCategory('comment')}
                $selected={selectMenu === 'comment'}
              >
                Comment
              </GalleryCategoryBtn>
            </div>

            <div>
              {selectSort === 'best' ? (
                <button type="button" onClick={() => onClickSort('new')}>
                  인기순
                </button>
              ) : (
                <button type="button" onClick={() => onClickSort('best')}>
                  최신순
                </button>
              )}

              <SwapOutlined />
            </div>
          </GalleryCategoryWrapper>

          <BigPostPreview />
          <PostPreview />
        </GalleryWrapper>
      </AppLayout>
    </>
  );
};

export default Gallery;
