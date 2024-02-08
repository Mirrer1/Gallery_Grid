import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CommentOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';

import PostImageCarousel from './PostImageCarousel';
import {
  PostWrapper,
  PostHeader,
  PostContents,
  PostOptions,
  PostCategory,
  CategoryItem,
  PostContainer,
  PostTooltip,
  PostTooltipBtn
} from 'styles/Timeline/postList';

const PostList = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState('best');
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState<string | null>(null);

  const postList = [
    {
      id: 'as1',
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
      id: 'as2',
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
    }
  ];

  const onClickCategory = useCallback((category: string) => {
    setCategory(category);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  const showCarousel = useCallback((images: string[]) => {
    setModalImages(images);
    setIsModalVisible(true);
  }, []);

  const handleTooltip = useCallback(
    (postId: string) => {
      setIsTooltipVisible(isTooltipVisible === postId ? null : postId);
    },
    [isTooltipVisible]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const tooltipElement = document.getElementById(`tooltip-${isTooltipVisible}`);
      if (tooltipElement && !tooltipElement.contains(e.target as HTMLElement)) {
        setIsTooltipVisible(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isTooltipVisible]);

  return (
    <PostContainer ref={scrollContainerRef}>
      <PostCategory>
        <CategoryItem onClick={() => onClickCategory('best')} $selected={category === 'best'}>
          Best
        </CategoryItem>
        <CategoryItem onClick={() => onClickCategory('recent')} $selected={category === 'recent'}>
          Recent
        </CategoryItem>
      </PostCategory>

      {postList.map((post, i) => (
        <PostWrapper key={post.id} $firstpost={i === 0}>
          <PostHeader>
            <div>
              <img src={post.profile} alt="author profile image" />

              <div>
                <h1>{post.user}</h1>
                <p>{post.createdAt}</p>
              </div>
            </div>

            <PostTooltip id={`tooltip-${post.id}`}>
              <EllipsisOutlined onClick={() => handleTooltip(post.id)} />

              <PostTooltipBtn $visible={isTooltipVisible === post.id}>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </PostTooltipBtn>
            </PostTooltip>
          </PostHeader>

          <PostContents>
            <div>
              <img src={post.img[0]} alt="post image" onClick={() => showCarousel(post.img)} />

              <div>
                {post.img.map((_, i) => (
                  <div key={i}></div>
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
