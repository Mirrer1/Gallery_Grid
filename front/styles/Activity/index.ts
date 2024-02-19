import styled from 'styled-components';

export const ActivityWrapper = styled.div`
  height: 100%;
  padding: 0.5em 1em;
`;

export const ActivityHeader = styled.header`
  height: 11%;
  padding: 1.5em 0.5em;

  & > div {
    ${({ theme }) => theme.flexSet('start')};
  }

  & > div > div {
    text-align: center;
    margin-right: 4em;
    border-right: 3px solid #e4e5ec;
    padding-right: 5em;

    &:last-child {
      margin-right: 0;
      border-right: none;
      padding-right: 0;
    }
  }
`;

export const HeaderItem = styled.div`
  & > h1 {
    font-size: 0.8rem;
    opacity: 60%;
    margin-bottom: 0.5em;
  }

  & > p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const FollowWrapper = styled.div`
  height: 8%;
  ${({ theme }) => theme.flexSet('center', 'start')};
`;
