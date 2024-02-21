import styled from 'styled-components';
import media from 'styles/media';

export const ChatListWrapper = styled.div`
  width: 50%;
`;

export const ChatListHeader = styled.header`
  ${({ theme }) => theme.flexSet('space-between')}

  & > div > label > span {
    font-size: 1.1rem;
    opacity: 40%;
  }

  & > div > input {
    padding: 0.5em;
    border: none;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.bg};

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 60%;
    }
  }

  ${media.tablet} {
    & > div > label > span {
      font-size: 0.8rem;
    }

    & > div > input {
      font-size: 0.8rem;
      padding: 0.5em 1em;
      border: none;
    }
  }
`;
