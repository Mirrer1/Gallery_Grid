import React, { useCallback, useState } from 'react';
import { CommentOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';

import PostImageCarousel from './PostImageCarousel';
import {
  PostWrapper,
  PostHeader,
  PostContents,
  PostOptions,
  PostCategory,
  CategoryItem,
  PostContainer
} from 'styles/Timeline/postList';

const PostList = () => {
  const [category, setCategory] = useState('best');
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const postList = [
    {
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
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.pinimg.com/564x/7b/8d/bc/7b8dbcac28aa4fb25c802eea7a97b8e5.jpg',
        'https://i.pinimg.com/564x/77/29/2c/77292c31c7f08adaff7650798fef5ce0.jpg',
        'https://i.pinimg.com/564x/af/ed/72/afed7289a2605bfa567229db5dfdbf5b.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    },
    {
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
      user: 'Lorem ipsum dolor',
      profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
      img: [
        'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
        'https://i.ibb.co/BCsx9nZ/image.jpg',
        'https://i.ibb.co/8bqzbyV/1.jpg'
      ],
      createdAt: '25 mins ago',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
    }
  ];

  const onClickCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  const showCarousel = useCallback((images: string[]) => {
    setModalImages(images);
    setIsModalVisible(true);
  }, []);

  return (
    <PostContainer>
      <PostCategory>
        <CategoryItem onClick={() => onClickCategory('best')} $selected={category === 'best'}>
          Best
        </CategoryItem>
        <CategoryItem onClick={() => onClickCategory('recent')} $selected={category === 'recent'}>
          Recent
        </CategoryItem>
      </PostCategory>

      {postList.map((post, i) => (
        <PostWrapper key={i}>
          <PostHeader>
            <div>
              <img src={post.profile} alt="author profile image" />

              <div>
                <h1>{post.user}</h1>
                <p>{post.createdAt}</p>
              </div>
            </div>

            <EllipsisOutlined />
          </PostHeader>

          <PostContents>
            <div>
              <img src={post.img[0]} alt="post image" onClick={() => showCarousel(post.img)} />

              <div>
                {post.img.map((post, i) => (
                  <div></div>
                ))}
              </div>
            </div>

            <div>
              <p>{post.desc}</p>

              <PostOptions>
                <div>
                  <LikeOutlined />
                  <span>24</span>
                </div>

                <div>
                  <CommentOutlined />
                  <span>13</span>
                </div>
              </PostOptions>
            </div>
          </PostContents>
        </PostWrapper>
      ))}

      {isModalVisible && <PostImageCarousel images={modalImages} setIsModalVisible={setIsModalVisible} />}
    </PostContainer>
  );
};

export default PostList;
