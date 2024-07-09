import styled from 'styled-components';

import media from 'styles/media';

export const AuthLoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.flexSet()};

  & > span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 5rem;
  }

  ${media.mobile} {
    & > span {
      font-size: 3.5rem;
    }
  }
`;
