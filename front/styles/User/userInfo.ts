import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const UserInfoWrapper = styled(motion.section)`
  width: 40%;
  height: 100%;
  ${({ theme }) => theme.flexColumnSet()};
  margin-right: 1em;
  padding: 0 1em;

  ${media.tablet} {
    width: 100%;
    margin-right: 0;
  }

  ${media.mobile} {
    padding: 0;
  }
`;

export const UserInfoImage = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  margin-bottom: 4em;

  & > img:first-child {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${DarkShadowStyle};
  }

  & > img:last-child {
    position: absolute;
    bottom: -10%;
    right: 50%;
    transform: translateX(50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  ${media.tablet} {
    margin-bottom: 3em;
  }
`;

export const UserInfoText = styled.div`
  margin-bottom: 4em;

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    margin-bottom: 0.8em;

    & > h1 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    & > button {
      font-size: 0.7rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 500;
      padding: 0.7em 1.5em;
      border-radius: 5px;
      ${HoverStyle('&')}
    }
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
    line-height: 1.3;
  }

  ${media.tablet} {
    margin-bottom: 2em;
  }

  ${media.mobile} {
    & > div {
      & > h1 {
        font-size: 1.1rem;
      }

      & > button {
        font-size: 0.6rem;
      }
    }

    & > p {
      font-size: 0.7rem;
    }
  }
`;

export const UserInfoActivity = styled.div`
  ${({ theme }) => theme.flexSet()};

  & > div {
    text-align: center;
    margin-right: 1.5em;
    padding-right: 1.5em;
    border-right: 3px solid #e4e5ec;

    & > h2 {
      font-size: 0.8rem;
      opacity: 80%;
      margin-bottom: 0.3em;
    }

    & > p {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.3rem;
      font-weight: 700;
    }
  }

  & > div:last-child {
    margin-right: 0;
    padding-right: 0;
    border-right: none;
  }

  ${media.tablet} {
    margin-bottom: 2.5em;

    & > div {
      margin-right: 3.5em;
      padding-right: 3.5em;
    }
  }

  ${media.mobile} {
    margin-bottom: 1.5em;

    & > div {
      margin-right: 1.5em;
      padding-right: 1.5em;

      & > h2 {
        font-size: 0.7rem;
      }

      & > p {
        font-size: 1.2rem;
      }
    }
  }
`;
