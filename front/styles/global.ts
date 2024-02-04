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
    font-family: 'Noto Sans KR', sans-serif;
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

  @media screen and (min-width: 1200px) {
    .body {
      max-width: 960px !important;
    }
  }
`;

export default GlobalStyles;
