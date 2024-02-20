import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const MobileFooterWrapper = styled.footer`
  display: none;

  ${media.mobile} {
    display: block;
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 60px;
    ${({ theme }) => theme.flexSet('space-around')}
    background-color: #fff;

    & > span {
      font-size: 1.1rem;
      ${ReverseHoverStyle('&')}
    }
  }
`;

export const MobileFooterItem = styled.span<{ $selected: boolean }>`
  color: ${props => props.$selected && '#6BA2E6'};
  transform: ${props => props.$selected && 'scale( 1.1 )'};
  opacity: ${props => (props.$selected ? '100%' : '40%')};
`;
