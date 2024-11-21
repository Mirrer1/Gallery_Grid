import styled from 'styled-components';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

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
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

export const MobileHeaderContent = styled.div`
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    ${({ theme }) => theme.flexSet()}
    width: 35px;
    height: 35px;
    margin-right: 0.3em;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid rgba(99, 99, 99, 0.2);
    ${HoverStyle('&')}

    &:first-child {
    }

    &:nth-child(2) {
    }

    &:last-child {
      margin-right: 0;
    }
  }

  & > div > img {
    width: 100%;
    height: 100%;
  }

  & > div > span {
    font-size: 0.8rem;
    opacity: 40%;
  }
`;
