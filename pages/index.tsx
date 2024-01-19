import React from 'react';
import styled from 'styled-components';

import AppLayout from 'components/AppLayout';
import media from 'styles/media';

const HeaderText = styled.div`
  font-weight: 700;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.calcRem(30)};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

const Landing = () => {
  return (
    <AppLayout>
      <div>This is</div>
      <HeaderText>Landing Page!</HeaderText>
    </AppLayout>
  );
};

export default Landing;
