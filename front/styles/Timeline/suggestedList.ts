import styled from 'styled-components';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const SuggestedWrapper = styled.div<{ $listvisible: boolean }>`
  ${({ theme }) => theme.flexColumnSet('center', 'start')}
  height: 38%;
  background-color: white;
  padding: 2em 1.5em;
  border-radius: 5px;
  ${ShadowStyle}

  ${media.tablet} {
    display: ${props => (props.$listvisible ? 'block' : 'none')};
    position: fixed;
    bottom: -12%;
    right: -25%;
    transform: translate(-50%, -50%);
    width: 55%;
    height: auto;
    border: 1px solid ${({ theme }) => theme.colors.darkBg};
    z-index: 50;
  }

  ${media.mobile} {
    bottom: -10%;
    right: -37%;
    width: 85%;
  }
`;

export const SuggestedOutsideArea = styled.div<{ $listvisible: boolean }>`
  display: none;

  ${media.tablet} {
    display: ${props => (props.$listvisible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 49;
    cursor: pointer;
  }
`;

export const SuggestedHeader = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2em;

  & > span {
    display: none;
  }

  ${media.tablet} {
    width: 100%;
    ${({ theme }) => theme.flexSet('space-between')};

    & > span {
      display: block;
    }
  }
`;

export const SuggestedInfo = styled.div<{ $islast: boolean }>`
  ${({ theme }) => theme.flexSet('start')}
  margin-bottom: ${props => (props.$islast ? '0' : '1.2em')};

  & > img {
    width: 17%;
    height: 50px;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > div {
    width: 80%;
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

    @media (min-width: 992px) {
      &:hover {
        text-decoration: underline;
        text-underline-offset: 1.5px;
      }
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

  ${media.tablet} {
    & > img {
      height: 60px;
    }

    & > div > div > h2 {
      font-size: 1rem;
    }

    & > div > div > span {
      font-size: 0.9rem;
    }

    & > div > p {
      font-size: 0.9rem;
    }
  }

  ${media.mobile} {
    & > img {
      height: 50px;
    }

    & > div > div > h2 {
      font-size: 0.9rem;
    }

    & > div > div > span {
      font-size: 0.8rem;
    }

    & > div > p {
      font-size: 0.8rem;
    }
  }
`;
