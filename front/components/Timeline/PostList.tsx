import { CommentOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import React from 'react';

const PostList = () => {
  const bestProduct = {
    user: 'Lorem ipsum dolor',
    profile: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
    img: [
      'https://i.ibb.co/n70QqMG/drawing-series-by.jpg',
      'https://i.ibb.co/BCsx9nZ/image.jpg',
      'https://i.ibb.co/8bqzbyV/1.jpg'
    ],
    createdAt: '25 mins ago',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quia. Iusto molestias perspiciatis incidunt a eveniet ullam porro facere ipsum, ipsam magni magnam exercitationem amet blanditiis eius repellendus aspernatur pariatur?'
  };
  return (
    <article>
      <div>
        <img src={bestProduct.profile} alt="author profile image" />

        <div>
          <h1>{bestProduct.user}</h1>
          <p>{bestProduct.createdAt}</p>
        </div>

        <EllipsisOutlined />
      </div>

      <p>{bestProduct.desc}</p>

      <div>
        <div>
          <LikeOutlined />
          <p>24</p>
        </div>

        <div>
          <CommentOutlined />
          <p>13</p>
        </div>
      </div>
    </article>
  );
};

export default PostList;
