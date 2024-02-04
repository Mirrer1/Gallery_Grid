import styled from 'styled-components';

export const PopularBtn = styled.div<{ $alignleft: string }>`
  opacity: 0;
  position: absolute;
  bottom: 50%;
  ${props => (props.$alignleft === 'true' ? 'left: 0;' : 'right: 0;')}
  ${props => (props.$alignleft === 'true' ? 'transform: translate(10%, -50%);' : 'transform: translate(-20%, -50%);')}  
  font-size: 0.7rem;
  padding: 0.5em;
  color: gray;
  background-color: white;
  border-radius: 50%;
  font-weight: 700;
  transition: opacity 250ms ease-in-out;
`;

export const PopularUserWrapper = styled.div`
  position: relative;
  top: 10px;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px;
  margin-bottom: 1em;

  &:hover ${PopularBtn} {
    opacity: 100%;
  }

  & > div {
    position: relative;
    bottom: 10px;
    right: 10px;
  }

  & > div > img {
    width: 100%;
    height: 250px;
    border-radius: 5px 5px 0 0;
  }
`;

export const PopularUserContents = styled.div`
  background-color: white;
  border-radius: 0 0 5px 5px;
  padding: 1em;

  & > div:first-child {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.7rem;
    font-weight: 500;
    margin-bottom: 0.7em;
  }

  & > h1 {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    line-height: 1.5;
    margin-bottom: 1em;
  }
`;

export const PopularOptions = styled.div`
  ${({ theme }) => theme.flexSet('end')}

  & > div {
    opacity: 60%;
    font-size: 0.7rem;
  }

  & > div:first-child {
    margin-right: 1em;
  }

  & > div > span > svg {
    margin-right: 0.4em;
  }
`;
