import styled from 'styled-components';

import media from 'styles/media';

export const MessageWrapper = styled.section`
  display: flex;
  height: 100%;
  padding: 1% 1% 0 1%;

  ${media.tablet} {
    padding: 0;
  }
`;
