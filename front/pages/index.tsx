import React from 'react';
import { MailOutlined } from '@ant-design/icons';

import BestPost from 'components/Landing/BestPost';

const Landing = () => {
  const bestProduct = [
    { title: 'Product1', img: 'https://i.ibb.co/n70QqMG/drawing-series-by.jpg' },
    { title: 'Product2', img: 'https://i.ibb.co/BCsx9nZ/image.jpg' },
    { title: 'Product3', img: 'https://i.ibb.co/8bqzbyV/1.jpg' }
  ];

  return (
    <>
      <header>
        <img src="/logo.jpg" alt="Logo Image" />

        <nav>
          <button type="button">Home</button>
          <button type="button">Login</button>
          <button type="button">SignUp</button>
        </nav>

        <MailOutlined />
      </header>

      <BestPost />
    </>
  );
};

export default Landing;
