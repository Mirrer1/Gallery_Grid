import React from 'react';

import Introduce from 'components/Landing/Introduce';
import { ContactIcon, HeaderWrapper } from 'styles/Landing/header';

const Landing = () => {
  const bestProduct = [
    { title: 'Product1', img: 'https://i.ibb.co/n70QqMG/drawing-series-by.jpg' },
    { title: 'Product2', img: 'https://i.ibb.co/BCsx9nZ/image.jpg' },
    { title: 'Product3', img: 'https://i.ibb.co/8bqzbyV/1.jpg' }
  ];

  return (
    <>
      <HeaderWrapper>
        <img src="/logo.jpg" alt="Logo Image" />

        <nav>
          <button type="button">Home</button>
          <button type="button">Login</button>
          <button type="button">Signup</button>
        </nav>

        <button>
          <ContactIcon />
        </button>
      </HeaderWrapper>

      <Introduce />
    </>
  );
};

export default Landing;
