import styled from 'styled-components';
import { MailOutlined } from '@ant-design/icons';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const HeaderWrapper = styled.header`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 2em 5em;

  & > img {
    width: 8%;
    cursor: pointer;
  }

  & > nav > button:last-child {
    margin-right: 0;
  }

  ${media.tablet} {
    padding: 1.5em 2em;

    & > img {
      display: none;
    }
  }
`;

export const MenuButton = styled.button<{ $selected: boolean }>`
  ${ReverseHoverStyle('&')}
  font-weight: 600;
  margin-right: 5em;
  opacity: ${props => (props.$selected ? '100%' : '40%')};
  text-decoration: ${props => (props.$selected ? 'underline' : 'none')};
  text-decoration-thickness: ${props => (props.$selected ? '2px' : '0')};
  text-underline-offset: ${props => (props.$selected ? '10px' : '0')};

  ${media.tablet} {
    margin-right: 3em;
  }

  ${media.mobile} {
    font-size: 0.8rem;
    margin-right: 2.2em;
    padding-bottom: 0.5em;
  }
`;

export const ContactIcon = styled(MailOutlined)`
  ${ReverseHoverStyle('&')}
  font-size: 1.4rem;
  font-weight: 700;
  opacity: 40%;

  ${media.tablet} {
    font-size: 1.2rem;
  }

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;
