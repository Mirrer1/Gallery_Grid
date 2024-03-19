import styled from 'styled-components';

export const UserWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  height: 96%;
  background-color: white;
  border-radius: 5px;
  margin: 1em;
  padding: 1em;
`;
