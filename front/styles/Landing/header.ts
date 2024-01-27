import styled from 'styled-components';
import { MailOutlined } from '@ant-design/icons';
import media from 'styles/media';

export const HeaderWrapper = styled.header`
  ${({ theme }) => theme.flexSet('space-between')};
  padding: 2em;

  & > img {
    width: 10%;
  }

  & > nav > button {
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 40%;
    margin-right: 5em;
    transition: opacity 200ms ease-in-out;
  }

  & > nav > button:last-child {
    margin-right: 0;
  }

  & > nav > button:hover {
    opacity: 100%;
  }

  & > nav > button:active {
    opacity: 40%;
  }

  ${media.tablet} {
    padding: 1.5em;

    & > nav > button {
      margin-right: 4em;
    }

    & > img {
      width: 15%;
    }
  }

  ${media.mobile} {
    padding: 1.5em 1em;

    & > nav > button {
      font-size: 0.7rem;
      margin-right: 3em;
      padding-bottom: 0.5em;
    }
  }
`;

export const ContactIcon = styled(MailOutlined)`
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 40%;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 100%;
  }

  &:active {
    opacity: 40%;
  }

  ${media.tablet} {
    font-size: 1rem;
  }

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;
