import styled from 'styled-components';

import { HoverStyle, ReverseHoverStyle } from 'styles/Common/hover';

export const PostingWrapper = styled.form`
  ${({ theme }) => theme.flexColumnSet('start', 'start')}
  padding: 1em;

  & > textarea {
    width: 100%;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.colors.darkBg};
    padding: 1.5em 1em;
    border-radius: 5px 5px 0 0;
    border: none;
    outline: none;
    resize: none;
  }

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkBg};
    border-radius: 0 0 5px 5px;
    padding: 0.7em 1em;
  }

  & > div > div > span {
    ${ReverseHoverStyle('&')}
    opacity: 40%;
    margin-right: 1.5em;
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
