import styled from 'styled-components';

import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const FollowTableWrapper = styled.section<{ $type: string }>`
  width: 47%;
  background-color: white;
  ${ShadowStyle}
  margin-right: ${props => (props.$type === 'follower' ? '1em' : '0')};
`;

export const FollowTableInfo = styled.div`
  ${({ theme }) => theme.flexSet('space-between')}
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBg};
  padding: 1em 1.5em;

  & > h1 {
    font-size: 1.1rem;
    font-weight: 700;
    opacity: 80%;
  }

  & > div > span {
    ${HoverStyle('&')}
    font-size: 0.9rem;
    opacity: 80%;

    &:first-child {
      margin-right: 0.3em;
    }
  }
`;

export const FollowTable = styled.table`
  width: 100%;
  text-align: center;
`;

export const FollowTableHeader = styled.thead<{ $visible: boolean }>`
  display: block;
  max-height: ${props => (props.$visible ? '34px' : '0')};
  overflow: hidden;
  transition: max-height 300ms ease-in-out;

  & > tr {
    display: table;
    width: 100%;
  }

  & > tr > td {
    width: 20%;
    font-weight: 500;
    font-size: 0.7rem;
    opacity: 40%;
    padding: 1.5em 1.2em 0.5em 1.2em;
  }
`;

export const FollowTableBody = styled.tbody<{ $visible: boolean }>`
  display: block;
  max-height: ${props => (props.$visible ? '210px' : '0')};
  overflow-y: scroll;
  transition: max-height 300ms ease-in-out;

  & > tr {
    display: table;
    width: 100%;
  }

  & > tr > td {
    vertical-align: middle;
    font-size: 0.8rem;
    padding: 0.7em 1.2em;
    width: 20%;

    &:first-child {
      padding-right: 0;

      & > img {
        margin: 0 auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    &:nth-child(2) {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 700;
      ${HoverStyle('&')}
    }

    &:last-child > button {
      font-size: 0.6rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      ${HoverStyle('&')}
    }
  }
`;
