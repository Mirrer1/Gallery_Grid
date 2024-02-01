import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';
import { ShadowStyle } from 'styles/Common/shadow';

export const AccountWrapper = styled(motion.section)`
  ${({ theme }) => theme.flexColumnSet()};
  flex-grow: 1;
  padding-top: 4em;

  ${media.tablet} {
    padding-top: 3em;
  }

  ${media.mobile} {
    width: 100%;
    padding-top: 0;
  }
`;

export const AccountGoogle = styled.div`
  ${HoverStyle('&')}
  ${ShadowStyle}
  ${({ theme }) => theme.flexSet()};
  cursor: pointer;
  width: 75%;
  background-color: #1890ff;
  border-radius: 2px;
  padding: 0.2em 0em;
  margin-bottom: 1.5em;

  & > .anticon-google {
    font-size: 1.5rem;
    color: white;
    margin-right: 0.6em;
  }

  & > button {
    color: white;
  }

  ${media.tablet} {
    & > .anticon-google {
      font-size: 1.3rem;
      margin-right: 0.3em;
    }

    & > button {
      font-size: 0.9rem;
    }
  }
`;

export const AccountDivider = styled.div`
  width: 78%;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
  margin-bottom: 2em;

  &:before,
  &:after {
    flex: 1;
    content: '';
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    margin: 10px;
  }
`;

export const AccountForm = styled.form`
  width: 75%;
`;

export const AccountInput = styled.div<{ $largemargin: string }>`
  width: 100%;
  position: relative;
  margin-bottom: ${props => (props.$largemargin === 'true' ? '1.8em' : '0.2em')};

  & > input {
    width: 100%;
    font-size: 0.8rem;
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
    font-size: 0.9rem;
    bottom: 8px;
    transition: all 0.2s;
  }

  & > input:focus ~ label,
  & > input:valid ~ label {
    font-size: 0.8rem;
    bottom: 35px;
    color: #666;
    font-weight: bold;
  }

  & > input:focus ~ span,
  & > input:valid ~ span {
    width: 100%;
  }
`;

export const AccountAlert = styled.p<{ $login: string }>`
  font-size: 0.6rem;
  opacity: 50%;
  padding-left: 5px;
  margin-bottom: ${props => (props.$login === 'true' ? '1em' : '3em')};
`;

export const AuthOptionsWrapper = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  margin-bottom: 1em;

  & > div > input {
    cursor: pointer;
    width: 10px;
    height: 8px;
    margin-right: 0.3em;
  }

  & > div > label {
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 700;
  }

  & > button {
    color: #1890ff;
    font-size: 0.7rem;
    font-weight: 700;
  }

  & > button:hover {
    text-decoration: underline;
  }

  ${media.mobile} {
    margin-bottom: 1.5em;

    & > div > label {
      font-size: 0.6rem;
    }

    & > button {
      font-size: 0.6rem;
    }
  }
`;

export const AccountBtn = styled.div`
  ${({ theme }) => theme.flexSet()};
  margin-bottom: 2em;

  & > button {
    ${HoverStyle('&')}
    ${ShadowStyle}
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.5em 2em 0.7em 2em;
    border: 1px solid rgba(217, 217, 217, 1);
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
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.45);
  }

  & > p > span {
    ${HoverStyle('&')}
    color: #1890ff;
    font-weight: 700;
    cursor: pointer;
  }

  /* ${media.tablet} {
    width: 90%;
  } */
`;
