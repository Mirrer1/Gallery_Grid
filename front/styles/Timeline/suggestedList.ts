import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const SuggestedWrapper = styled.div`
  ${({ theme }) => theme.flexColumnSet('center', 'start')}
  height: 38%;
  background-color: white;
  padding: 2em 1.5em;
  border-radius: 5px;
  ${ShadowStyle}

  ${media.tablet} {
    display: none;
  }
`;

export const SuggestedHeader = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2em;
`;

export const SuggestedInfo = styled.div<{ $islast: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  margin-bottom: ${props => (props.$islast ? '0' : '1.2em')};

  & > img {
    width: 14%;
    height: 50px;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > div {
    width: 86%;
  }

  & > div > div {
    ${({ theme }) => theme.flexSet('space-between')}
    padding-right: 0.5em;
    margin-bottom: 0.3em;
  }

  & > div > div > h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 1.5px;
    }
  }

  & > div > div > span {
    ${ReverseHoverStyle('&')}
    opacity: 40%;
    font-size: 0.8rem;
  }

  & > div > p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.5;
  }
`;
