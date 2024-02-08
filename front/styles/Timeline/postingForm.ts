import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostingWrapper = styled.form`
  background-color: ${({ theme }) => theme.colors.darkBg};
  height: 20%;
  border-radius: 5px 5px 0 0;

  & > textarea {
    width: 100%;
    height: 70%;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 1.5em;
    border-radius: 5px 5px 0 0;
    border: none;
    outline: none;
    resize: none;
  }

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 0.7em 1em;
  }

  & > div > div > span {
    ${ReverseHoverStyle('&')}
    opacity: 40%;
    margin-right: 1.5em;
    cursor: pointer;
  }

  & > div > div > button {
    ${HoverStyle('&')}
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    font-weight: 500;
    padding: 0.7em 2em;
    border-radius: 5px;
  }
`;
