import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';
import { CardShadowStyle } from 'styles/Common/shadow';

export const PostSearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 0 auto;

  @media (max-width: 1270px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PostImageWrapper = styled.div`
  width: 100%;
  position: relative;

  & > img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px 10px 0 0;
  }

  & > span {
    position: absolute;
    top: 5px;
    right: 5px;
    ${({ theme }) => theme.flexSet()};
    width: 30px;
    height: 30px;
    font-size: 1.1rem;
    opacity: 0;
    background-color: white;
    border: none;
    border-radius: 45px;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: opacity 200ms ease-in-out;
  }
`;

export const PostCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 10px;
  cursor: pointer;
  ${CardShadowStyle}

  &:hover ${PostImageWrapper} > span {
    opacity: 40%;
    ${ReverseHoverStyle('&')};
  }
`;

export const PostContentWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  background-color: white;
  padding: 0.5em;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5em;
  }

  & > p {
    width: 29%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1;
    font-size: 0.9rem;
    font-weight: 700;
  }

  & > span {
    ${({ theme }) => theme.flexSet()};
    font-size: 0.8rem;
    opacity: 60%;

    & > span:first-child {
      margin-right: 0.2em;
    }
  }

  & > span:nth-child(3) {
    margin-right: 0.5em;
  }
`;
