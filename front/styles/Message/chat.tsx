import styled from 'styled-components';

export const ChatWrapper = styled.article`
  width: 60%;
  height: 100%;
  padding: 1em 1.5em;
`;

export const ChatHeader = styled.header`
  margin-bottom: 0.7em;
  padding-bottom: 0.7em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkBg};

  & > h1 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.3em;
  }

  & > p {
    font-size: 0.7rem;
    opacity: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ChatItemWrapper = styled.div`
  padding: 0.5em 0;
`;

export const ReceiveChat = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexSet('start')};
  margin-bottom: 1.5em;

  & > div:first-child {
    width: 15%;
    ${({ theme }) => theme.flexColumnSet()};

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 0.3em;
    }

    & > div {
      font-size: 0.75rem;
      opacity: 70%;
    }
  }

  & > div:last-child {
    width: 85%;

    & > p {
      width: fit-content;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 0.9rem;
      line-height: 1.3;
      background-color: ${({ theme }) => theme.colors.darkBg};
      border-radius: 5px;
      padding: 0.7em 1em;
    }
  }
`;

export const SendChat = styled.div`
  ${({ theme }) => theme.flexSet('end')}
  margin-bottom: 1.5em;

  & > p {
    width: fit-content;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 0.9rem;
    line-height: 1.3;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    padding: 0.7em 1em;
  }
`;
