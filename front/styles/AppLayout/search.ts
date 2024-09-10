import styled from 'styled-components';

import media from 'styles/media';

export const SearchWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')}
  width: 100%;
  padding: 0 2em;
  margin-bottom: 15%;

  & > label > span {
    font-size: 0.9rem;
    opacity: 40%;
  }

  & > input {
    flex-shrink: 1;
    font-size: 0.9rem;
    padding: 0.5em 0 0.5em 0.5em;
    border: none;
    overflow-x: hidden;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  ${media.tablet} {
    padding: 0 1em;
    margin-bottom: 17%;

    & > label > span {
      font-size: 0.8rem;
    }

    & > input {
      width: 100%;
      font-size: 0.8rem;
      border: none;
    }
  }
`;
