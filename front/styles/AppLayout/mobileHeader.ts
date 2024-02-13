import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const MobileHeaderWrapper = styled.header`
  display: none;

  ${media.mobile} {
    display: block;
    width: 100%;

    & > div {
      width: 100%;
      height: 56px;
      ${({ theme }) => theme.flexSet('space-between')}
      background-color: #fff;
      padding: 0.5em 1em;
      box-shadow: 0px 2px 8px 0px rgba(240, 241, 242, 1);
      cursor: pointer;
    }

    & > div > h1 {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
`;

export const MobileHeaderContent = styled.div`
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    ${({ theme }) => theme.flexSet()}
    height: 35px;
    padding: 0.3em;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid rgba(99, 99, 99, 0.2);
    ${HoverStyle('&')}

    &:first-child {
      width: 37px;
      margin-right: 0.5em;
    }

    &:last-child {
      width: 35px;
    }
  }

  & > div > img {
    width: 100%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid rgba(99, 99, 99, 0.2);
  }

  & > div > span {
    font-size: 1.1rem;
    opacity: 40%;
  }
`;

export const MobileHeaderInput = styled.div`
  position: relative;
  height: 56px;

  & > input {
    width: 100%;
    font-size: 0.9rem;
    background-color: #f5f5f5;
    color: #242424;
    padding: 0.4em 1em;
    min-height: 40px;
    outline: none;
    border: none;
    line-height: 1.15;
    box-shadow: 0px 10px 20px -18px;
    transition: all 200ms;
  }

  & > input:focus {
    border-bottom: 2px solid #e4e5ec;
    border-radius: 4px 4px 2px 2px;
  }

  & > input:hover {
    box-shadow: 0px 5px 15px -13px;
  }

  & > span {
    position: absolute;
    top: 40%;
    right: 7%;
    font-size: 0.8rem;
    opacity: 40%;
    ${ReverseHoverStyle('&')}
  }
`;
