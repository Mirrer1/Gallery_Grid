import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};  
  
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    word-break: break-word;
    tab-size: 4;
  }

  html,
  body,
  #__next {
    height: 100%;    
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ::-webkit-scrollbar {
    width: 6px; 
  } 

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #9E9E9E;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #BDBDBD;
  }

  .Toastify__toast {
    font-size: 14px;
  }

  .Toastify__toast-container {
    width: 400px !important;
  }

  .Toastify__toast--success {    
    background-color: white;
    color: #222222;
    position: relative;
    padding-left: 15px;
    border-radius: 0;
  }  

  .Toastify__toast--success::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #07bc0c;
    border-radius: 0;
  }

  .Toastify__toast--warning {    
    background-color: white;
    color: #222222;
    position: relative;
    padding-left: 15px;
    border-radius: 0;
  }  

  .Toastify__toast--warning::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #f1c40f;
    border-radius: 0;
  }

  .Toastify__toast--error {
    background-color: white;
    color: #222222;
    position: relative;
    padding-left: 15px;
    border-radius: 0;
  }  

  .Toastify__toast--error::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #e74c3c;
    border-radius: 0;
  }

  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 400px;
    height: 400px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 400px;
    border-radius: 10px;
    box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .swiper-pagination-bullet,
  .swiper-pagination-bullet-active {
    width: 6px;
    height: 6px;
    background: #6BA2E6;
  }

  .swiper-button-prev, .swiper-button-next {
    display: flex;
    justify-content: center;
    align-items: center;    
    width: 32px;
    height: 32px;
    color: black !important;    
    background-color: rgba(255, 255, 255, 0.35);
    border-radius: 50%;        
    transition: opacity 200ms ease-in-out;    

    &:hover {
      opacity: 40%;
    }

    &:active {
      opacity: 100%;
    }
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background-image: url('/arrow.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 70%;
  }

  .swiper-button-next::after {    
    transform: rotate(270deg);    
  }

  .swiper-button-prev::after {    
    transform: rotate(90deg);
  }
  
  @media screen and (min-width: 1200px) {
    .body {
      max-width: 960px !important;
    }
  }

  @media only screen and (max-width: 992px) {
    .body{
      -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    .swiper-button-prev, .swiper-button-next {       
      transform: scale(0.7);  
    }
  }

  @media only screen and (max-width: 576px) {
    .Toastify__toast-container {
      width: 385px !important;
      top: 1%;
      display: flex;
      flex-direction: column;
      align-items: end;
    }

    .Toastify__toast {          
      font-size: 11px !important;
      width: 305px !important;
      margin-bottom: 0.5em;
    }

    .swiper-button-prev, .swiper-button-next {       
      transform: scale(0.65);  
    }
  }
`;

export default GlobalStyles;
