import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { SwapOutlined } from '@ant-design/icons';
import Head from 'next/head';

import AppLayout from 'components/AppLayout';
import BigPostPreview from 'components/Gallery/BigPostPreview';
import PostPreview from 'components/Gallery/PostPreview';
import PostModal from 'components/Modal/PostModal';
import { RootState } from 'store/reducers';
import { GalleryCategoryBtn, GalleryCategoryWrapper, GalleryWrapper } from 'styles/Gallery';

const Gallery = () => {
  const { isPostModalVisible } = useSelector((state: RootState) => state.post);
  const [selectMenu, setSelectMenu] = useState('all');
  const [selectSort, setSelectSort] = useState('best');

  const postList = [
    {
      id: 'as1',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg',
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg',
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium harum in maiores delectus, illum nemo veritatis aut, ipsum ab odio reiciendis sed veniam eveniet quasi impedit mollitia natus tempora, cum deserunt iure eos quis esse quibusdam. Maxime sapiente, soluta reiciendis, nemo distinctio eveniet, libero facere ipsam ratione est hic voluptatibus?'
    },
    {
      id: 'as2',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.pinimg.com/564x/7b/8d/bc/7b8dbcac28aa4fb25c802eea7a97b8e5.jpg',
        'https://i.pinimg.com/564x/77/29/2c/77292c31c7f08adaff7650798fef5ce0.jpg',
        'https://i.pinimg.com/564x/af/ed/72/afed7289a2605bfa567229db5dfdbf5b.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum do다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라lor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    },
    {
      id: 'as3',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.pinimg.com/564x/27/14/b3/2714b3d09f0ad9ccdfaebdc195b4e67a.jpg',
        'https://i.pinimg.com/564x/4a/82/40/4a8240c7d195d293d7b7d7b0e5bc5b66.jpg',
        'https://i.pinimg.com/564x/91/c4/cb/91c4cb4531f6c3f91b1b3a1e2c4fc2fc.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    },
    {
      id: 'as4',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    },
    {
      id: 'as5',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    },
    {
      id: 'as6',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: ['https://i.ibb.co/n70QqMG/drawing-series-by.jpg'],
      createdAt: '25 mins ago',
      desc: '가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하'
    },
    {
      id: 'as7',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: '가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하'
    },
    {
      id: 'as8',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: '가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하'
    },
    {
      id: 'as9',
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: '가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하'
    }
  ];

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
          <div>
            <h1>FILTER:</h1>

            <GalleryCategoryWrapper>
              <div>
                <GalleryCategoryBtn
                  type="button"
                  onClick={() => onClickCategory('all')}
                  $selected={selectMenu === 'all'}
                >
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
          </div>

          <div>
            <BigPostPreview post={postList[0]} />
            <PostPreview post={postList} />
          </div>
        </GalleryWrapper>

        {isPostModalVisible && <PostModal />}
      </AppLayout>
    </>
  );
};

export default Gallery;
