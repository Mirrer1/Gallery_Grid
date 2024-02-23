import React from 'react';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import BigPostPreview from 'components/Gallery/BigPostPreview';
import PostPreview from 'components/Gallery/PostPreview';

const Gallery = () => {
  return (
    <>
      <Head>
        <title>Gallery Grid | Gallery</title>
      </Head>

      <AppLayout>
        <div>
          <div>
            <div>
              <button type="button">All</button>
              <button type="button">Board</button>
              <button type="button">Like</button>
              <button type="button">Comment</button>
            </div>

            <div>
              <button type="button">인기순</button>
            </div>
          </div>

          <BigPostPreview />
          <PostPreview />
        </div>
      </AppLayout>
    </>
  );
};

export default Gallery;
