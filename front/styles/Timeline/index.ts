import styled from 'styled-components';

export const TimelineWrapper = styled.section`
  display: flex;
  justify-content: start;
  height: inherit;

  & > article:first-child {
    width: 60%;
    padding: 1em 0.5em 0 1em;
  }

  & > article:last-child {
    width: 40%;
    padding: 1em 1em 1em 0.5em;
  }
`;
