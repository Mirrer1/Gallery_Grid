import styled from 'styled-components';

import media from 'styles/media';

export const UserWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  height: 96%;
  background-color: white;
  border-radius: 5px;
  margin: 1em;
  padding: 1em;

  ${media.tablet} {
    ${({ theme }) => theme.flexColumnSet()};
    margin: 0;
  }

  ${media.mobile} {
    padding: 0.75em;
    margin-bottom: 2%;
  }
`;

export const SharedPostWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkBg};
`;
