import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle, ShadowStyle } from 'styles/Common/shadow';

export const AccountWrapper = styled(motion.section)`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;
  padding-top: 4em;

  ${media.tablet} {
    width: 100%;
    padding-top: 3em;
  }

  ${media.mobile} {
    padding-top: 0;
  }
`;

export const AccountGoogle = styled.div`
  ${HoverStyle('&')}
  ${DarkShadowStyle}
  ${({ theme }) => theme.flexSet()};
  cursor: pointer;
  width: 75%;
  background-color: #1890ff;
  border-radius: 2px;
  padding: 0.4em 0em;
  margin-bottom: 1.5em;

  & > .anticon-google {
    font-size: 1.6rem;
    color: white;
    margin-right: 0.6em;
  }

  & > button {
    color: white;
    font-size: 1.1rem;

    span {
      font-size: 1.6rem;
    }
  }

  ${media.tablet} {
    & > .anticon-google {
      font-size: 1.3rem;
      margin-right: 0.3em;
    }

    & > button {
      font-size: 0.9rem;

      span {
        font-size: 1.3rem;
      }
    }
  }

  ${media.mobile} {
    width: 85%;
    margin-bottom: 1em;
  }
`;

export const AccountDivider = styled.div`
  width: 77%;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
  margin-bottom: 2.2em;

  &:before,
  &:after {
    flex: 1;
    content: '';
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    margin: 10px;
  }

  ${media.tablet} {
    font-size: 0.7rem;
  }

  ${media.mobile} {
    width: 90%;
  }
`;

export const AccountForm = styled.form`
  width: 75%;

  ${media.mobile} {
    width: 85%;
  }
`;

export const AccountInput = styled(motion.div)<{ $largemargin: string }>`
  width: 100%;
  position: relative;
  margin-bottom: ${props => (props.$largemargin === 'true' ? '1.8em' : '0.2em')};

  & > input {
    width: 100%;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.font};
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 8px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
  }

  & > input::placeholder {
    color: #aaaaaa;
  }

  & > input:focus {
    outline: none;
  }

  & > input[readonly] {
    color: #b3b3b3;
    cursor: not-allowed;
  }

  & > span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0%;
    background-color: #666;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transition: 0.5s;
  }

  & > label {
    position: absolute;
    color: #aaa;
    left: 5px;
    bottom: 8px;
    transition: all 0.2s;
  }

  & > input:focus ~ label,
  & > input:valid ~ label,
  & > input[readonly] ~ label {
    font-size: 0.9rem;
    bottom: 32px;
    color: #666;
    font-weight: bold;
  }

  & > input:focus ~ span,
  & > input:valid ~ span,
  & > input[readonly] ~ span {
    width: 100%;
  }

  & > button {
    position: absolute;
    bottom: 4px;
    right: 0;
    ${({ theme }) => theme.flexSet()};
    width: 80px;
    height: 24px;
    font-size: 0.7rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    z-index: 50;
    ${HoverStyle('&')}
    ${ShadowStyle}

    & > span {
      color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      color: #b3b3b3;
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      cursor: not-allowed;

      &:hover {
        opacity: 100%;
      }
    }
  }

  ${media.tablet} {
    & > input:focus ~ label,
    & > input:valid ~ label {
      bottom: 30px;
    }
  }

  ${media.mobile} {
    & > input {
      font-size: 0.8rem;
    }

    & > label {
      font-size: 0.9rem;
    }

    & > input:focus ~ label,
    & > input:valid ~ label {
      font-size: 0.8rem;
      bottom: 26px;
    }
  }
`;

export const AccountTextarea = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2.5em;

  & > textarea {
    width: 100%;
    height: 250px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.font};
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 8px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
    resize: none;
    overflow-y: scroll;
  }

  & > textarea {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  & > textarea::-webkit-scrollbar {
    display: none;
  }

  & > textarea::placeholder {
    color: #aaaaaa;
  }

  & > textarea:focus {
    outline: none;
  }

  & > span {
    display: block;
    position: absolute;
    bottom: 1%;
    left: 0%;
    background-color: #666;
    width: 0;
    height: 1px;
    border-radius: 2px;
    transition: 0.5s;
  }

  & > label {
    position: absolute;
    color: #aaa;
    left: 5px;
    top: -10%;
    transition: all 0.2s;
  }

  & > textarea:focus ~ label,
  & > textarea:valid ~ label {
    font-size: 0.9rem;
    bottom: 32px;
    color: #666;
    font-weight: bold;
  }

  & > textarea:focus ~ span,
  & > textarea:valid ~ span {
    width: 100%;
  }

  ${media.tablet} {
    & > textarea:focus ~ label,
    & > textarea:valid ~ label {
      bottom: 30px;
    }
  }

  ${media.mobile} {
    & > textarea {
      font-size: 0.8rem;
    }

    & > label {
      font-size: 0.9rem;
    }

    & > textarea:focus ~ label,
    & > textarea:valid ~ label {
      font-size: 0.8rem;
      bottom: 26px;
    }
  }
`;

export const AccountAlert = styled.p<{ $login: string }>`
  font-size: 0.7rem;
  opacity: 50%;
  padding-left: 5px;
  margin-bottom: ${props => (props.$login === 'true' ? '2em' : '2.5em')};

  ${media.tablet} {
    font-size: 0.65rem;
  }

  ${media.tablet} {
    margin-bottom: 2em;
  }
`;

export const TextAlert = styled.p`
  font-size: 0.8rem;
  opacity: 50%;
  text-align: end;
  margin: 0.5em 0 1.8em 0;
`;

export const AuthOptionsWrapper = styled.div<{ $menu: string }>`
  ${({ theme }) => theme.flexSet()};
  justify-content: ${props => (props.$menu === 'login' ? 'space-between' : 'center')};
  margin-bottom: 1em;
  padding: 0 0.3em;

  & > div {
    ${({ theme }) => theme.flexSet()};

    & > input {
      cursor: pointer;
      width: 12px;
      height: 12px;
      margin-right: 0.3em;
      opacity: 70%;
    }

    & > label {
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
    }
  }

  & > button {
    color: #1890ff;
    font-size: 0.8rem;
    font-weight: 500;
  }

  ${media.tablet} {
    & > div > label {
      position: relative;
      top: 1px;
      font-size: 0.7rem;
    }

    & > button {
      font-size: 0.75rem;
    }
  }

  ${media.mobile} {
    margin-bottom: 1.5em;

    & > div > label {
      font-size: 0.65rem;
    }

    & > button {
      font-size: 0.7rem;
    }
  }
`;

export const AccountBtn = styled.div<{ $menu: string }>`
  ${({ theme }) => theme.flexSet()};
  margin-bottom: 2em;

  & > button {
    ${({ theme }) => theme.flexSet()};
    width: 186px;
    height: 28px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid rgba(217, 217, 217, 1);
    ${HoverStyle('&')}
    ${DarkShadowStyle}

    & > span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const AccountFooter = styled.footer`
  width: 75%;

  & > hr {
    border: none;
    height: 1.5px;
    background-color: rgba(0, 0, 0, 0.06);
    margin-bottom: 1em;
  }

  & > p {
    text-align: center;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.45);
  }

  & > p > span {
    ${HoverStyle('&')}
    color: #1890ff;
    font-weight: 600;
    cursor: pointer;
  }

  ${media.tablet} {
    & > p {
      font-size: 0.7rem;
    }
  }

  ${media.mobile} {
    & > p {
      font-size: 0.6rem;
    }
  }
`;
