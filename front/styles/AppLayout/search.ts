import styled from 'styled-components';

import media from 'styles/media';

export const SearchWrapper = styled.div`
  ${({ theme }) => theme.flexSet('start')}
  width: 100%;
  margin-bottom: 3em;

  & > label > span {
    font-size: 0.9rem;
    opacity: 40%;
  }

  & > input {
    flex-shrink: 1;
    font-size: 0.9rem;
    padding: 0.5em 0 0.5em 1.2em;
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
    & > label > span {
      font-size: 0.8rem;
    }

    & > input {
      font-size: 0.8rem;
      padding: 0.5em 1em;
      border: none;
    }
  }
`;
