import { ArrowsAltOutlined } from '@ant-design/icons';
import React from 'react';

const BigPostPreview = ({ post }: any) => {
  // {
  //   id: 'as1',
  //   user: 'Lorem ipsum dolor',
  //   profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
  //   img: [
  //     'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
  //     'https://i.ibb.co/BCsx9nZ/image.jpg',
  //     'https://i.ibb.co/8bqzbyV/1.jpg',
  //     'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
  //     'https://i.ibb.co/BCsx9nZ/image.jpg',
  //     'https://i.ibb.co/8bqzbyV/1.jpg',
  //     'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
  //     'https://i.ibb.co/BCsx9nZ/image.jpg',
  //     'https://i.ibb.co/8bqzbyV/1.jpg'
  //   ],
  //   createdAt: '25 mins ago',
  //   desc: '가나다라마바나다사가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하가나다라마바나다사하'
  // },

  return (
    <section>
      <div>
        <img src={post.img[0]} alt={`${post.user}의 게시글 이미지`} />

        <div>
          {post.img.map((_: any, i: any) => (
            <div key={i}></div>
          ))}
        </div>

        <ArrowsAltOutlined />
      </div>

      <div>
        <h1>{post.desc}</h1>
        <p>{post.user}</p>
      </div>
    </section>
  );
};

export default BigPostPreview;
