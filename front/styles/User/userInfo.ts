import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const UserInfoWrapper = styled(motion.section)`
  width: 40%;
  height: 100%;
  ${({ theme }) => theme.flexColumnSet('space-between')};
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
  height: 56%;

  & > img:first-child {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  & > img:last-child {
    position: absolute;
    bottom: -10%;
    right: 50%;
    transform: translateX(50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    ${DarkShadowStyle};
  }

  ${media.tablet} {
    height: 410px;
    margin-bottom: 5em;

    & > img:last-child {
      bottom: -15%;
      width: 125px;
      height: 125px;
    }
  }

  ${media.mobile} {
    height: 340px;
    margin-bottom: 4em;

    & > img:last-child {
      width: 110px;
      height: 110px;
    }
  }
`;

export const UserInfoText = styled.div<{ $isFollowing: boolean }>`
  width: 100%;

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    margin-bottom: 0.8em;

    & > h1 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    & > button {
      ${({ theme }) => theme.flexSet()};
      width: 76px;
      height: 28px;
      font-size: 0.8rem;
      font-weight: 500;
      line-height: 1px;
      border-radius: 5px;
      background-color: ${props => (props.$isFollowing ? 'white' : '#6BA2E6')};
      color: ${props => (props.$isFollowing ? '#6BA2E6' : 'white')};
      border: ${props => props.$isFollowing && '1px solid #6BA2E6'};
      ${HoverStyle('&')}
    }

    & > a > span {
      font-size: 1.2rem;
      opacity: 80%;
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

    & > div {
      margin-bottom: 1em;
    }
  }

  ${media.mobile} {
    margin-bottom: 1em;
  }
`;

export const UserActivityWrapper = styled.div`
  ${({ theme }) => theme.flexSet('space-around')};
  width: 100%;
`;

export const UserActivityItem = styled.div<{ $selected: boolean }>`
  width: 30%;
  padding: 12px 0;
  text-align: center;
  transition: box-shadow 200ms ease-in-out;
  box-shadow: ${props => (props.$selected ? 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' : 'none')};

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  & > h2 {
    font-size: 0.8rem;
    opacity: 80%;
    margin-bottom: 0.5em;
  }

  & > p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.3rem;
    font-weight: 700;
  }

  ${media.tablet} {
    margin-bottom: 1.5em;
  }

  ${media.mobile} {
    padding: 1em;
    margin-bottom: 0.5em;

    & > h2 {
      font-size: 0.75rem;
      margin-bottom: 0.4em;
    }

    & > p {
      font-size: 1.2rem;
    }
  }
`;
