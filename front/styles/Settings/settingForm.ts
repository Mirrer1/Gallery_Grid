import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';

export const SettingFormWrapper = styled(motion.form)`
  position: absolute;
  right: 3%;
  bottom: 3%;
  width: 50%;
  padding: 1.5em;
  border-radius: 5px;
  background-color: white;
  z-index: 10;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  & > h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 2em;
  }
`;

export const SettingNickname = styled.div`
  ${({ theme }) => theme.flexColumnSet('center', 'start')};
  margin-bottom: 1.5em;

  & > label {
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 30%;
    margin-bottom: 0.2em;
  }

  & > input {
    width: 100%;
    font-size: 0.9rem;
    border: none;
    border-bottom: 1.5px solid #e4e5ec;
    overflow-x: hidden;
    padding: 0.5em 0.5em 0.5em 0.2em;
    margin-bottom: 0.3em;
    transition: border-bottom 200ms ease-in-out;

    &:focus {
      outline: none;
      border-bottom: 1.8px solid #bfbfbf;
    }
  }

  & > div {
    width: 100%;
    font-size: 0.7rem;
    font-weight: 500;
    opacity: 40%;
    padding-right: 0.1em;
  }
`;

export const SettingIntro = styled.div`
  ${({ theme }) => theme.flexColumnSet('center', 'start')};
  margin-bottom: 1em;

  & > label {
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 30%;
    margin-bottom: 1em;
  }

  & > textarea {
    width: 100%;
    font-size: 0.9rem;
    line-height: 1.3;
    border: 1.5px solid #e4e5ec;
    resize: none;
    padding: 0.8em;
    margin-bottom: 0.3em;
    transition: border 200ms ease-in-out;

    &:focus {
      outline: none;
      border: 1.8px solid #bfbfbf;
    }
  }

  & > div {
    width: 100%;
    text-align: end;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 40%;
    padding-right: 0.1em;
  }
`;

export const SettingRecommendation = styled.div`
  margin-bottom: 2em;

  & > h3 {
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 30%;
    margin-bottom: 1em;
  }

  & > div {
    ${({ theme }) => theme.flexSet('space-between')};
    font-size: 0.9rem;
    line-height: 1.3;
    border: 1.5px solid #e4e5ec;
    padding: 1em;

    & > p {
      width: 70%;
    }
  }

  [type='checkbox'] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
    transition: opacity 200ms ease-in-out;
  }

  [type='checkbox']::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 250ms linear;
  }

  [type='checkbox']:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  [type='checkbox']:hover {
    opacity: 40%;
  }

  [type='checkbox']:checked::before {
    background-color: white;
    left: 1em;
  }

  [type='checkbox']:disabled {
    border-color: lightgray;
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type='checkbox']:disabled:before {
    background-color: lightgray;
  }

  [type='checkbox']:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid tomato;
  }
`;

export const SettingBtn = styled.div`
  ${({ theme }) => theme.flexSet('end')};

  & > button {
    font-size: 0.9rem;
    background-color: #6ba2e6;
    color: white;
    font-weight: 500;
    padding: 0.7em 1.2em;
    border-radius: 5px;
    ${HoverStyle('&')};
  }
`;
