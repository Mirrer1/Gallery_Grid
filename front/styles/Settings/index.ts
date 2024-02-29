import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const SettingWrapper = styled.section`
  position: relative;
  height: 96.2%;
  background: white;
  padding: 1em;
  margin: 1em;
  border-radius: 5px;

  ${media.tablet} {
    height: 100vh;
  }

  ${media.mobile} {
    padding: 0.5em;
    margin: 0 0 0.5em 0;
  }
`;

export const SettingProfile = styled(motion.div)`
  width: 47%;
  height: 74%;
  position: absolute;
  top: 10%;
  left: 3%;

  & > label > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  & > div {
    width: 100%;
    position: absolute;
    top: 3%;
    left: 70%;

    & > h1 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5em;
    }

    & > p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 60%;
      padding-left: 0.5em;
    }
  }

  & > label > span {
    position: absolute;
    left: 2%;
    bottom: 1%;
    font-size: 1.7rem;
    opacity: 40%;
    cursor: pointer;
    ${ReverseHoverStyle('&')};
  }

  & > input {
    display: none;
  }

  ${media.tablet} {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 49%;

    & > label > img {
      width: 70%;
    }

    & > div {
      width: 50%;
      left: 50%;

      & > h1 {
        font-size: 1.6rem;
        margin-bottom: 0.35em;
      }

      & > p {
        font-size: 0.8rem;
        padding-left: 0;
      }
    }

    & > label > span {
      font-size: 1.5rem;
    }
  }

  ${media.mobile} {
    ${({ theme }) => theme.flexSet('start')};
    height: 15%;
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkBg};
    padding: 0.5em 0.5em 1em 0.5em;
    margin-bottom: 0.5em;

    & > label > img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 1em;
    }

    & > div {
      position: relative;
      top: 0;
      left: 0;
      flex-grow: 1;
      margin-right: 1em;

      & > h1 {
        font-size: 0.9rem;
        margin-bottom: 0.3em;
      }

      & > p {
        font-size: 0.65rem;
        -webkit-line-clamp: 3;
      }
    }

    & > label > span {
      display: none;
    }
  }
`;

export const MobileImageBtn = styled.label`
  display: none;

  ${media.mobile} {
    display: block;
    font-size: 0.6rem;
    background-color: #6ba2e6;
    color: white;
    font-weight: 500;
    padding: 0.7em 1.2em;
    border-radius: 5px;
  }
`;
