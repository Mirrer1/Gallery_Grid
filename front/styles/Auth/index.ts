import styled from 'styled-components';

import media from 'styles/media';

export const AuthLoaderWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.flexSet()};
`;

export const AuthLoader = styled.div`
  ${({ theme }) => theme.flexColumnSet()};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 8px;
  border-radius: 10px;
  padding: 3em 5em;

  & > div {
    ${({ theme }) => theme.flexSet()};
    margin-bottom: 1.2em;

    img {
      width: 54px;
      margin-right: 0.5em;
    }

    div {
      width: 270px;

      h1 {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }

  & > p {
    font-size: 0.8rem;
    opacity: 70%;
    margin-bottom: 2.5em;
  }

  & > span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 5rem;
  }

  ${media.mobile} {
    padding: 3em 2em;

    & > div {
      ${({ theme }) => theme.flexColumnSet()};
      margin-bottom: 0.6em;

      img {
        margin-right: 0;
        margin-bottom: 1em;
      }
    }

    & > p {
      font-size: 0.7rem;
    }

    & > span {
      font-size: 3.5rem;
    }
  }
`;
