import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const DeleteModalWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

export const DeleteModalOutsideArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;

export const DeleteModalContent = styled(motion.div)`
  ${({ theme }) => theme.flexColumnSet()};
  width: 430px;
  height: 330px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  z-index: 100;
  background-color: white;
  border-radius: 10px;
  padding: 1em;
  ${DarkShadowStyle};

  & > div:first-child {
    width: fit-content;
    background-color: rgba(238, 107, 110, 0.3);
    padding: 0.6em;
    border-radius: 50%;
    margin-bottom: 1em;

    & > span {
      font-size: 1.7rem;
      color: ${({ theme }) => theme.colors.red};
    }
  }

  & > h1 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 60%;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 2.5em;
  }

  & > div:last-child {
    width: 100%;

    button {
      width: 100%;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 1em 2em;
      border-radius: 5px;
      ${HoverStyle('&')};

      &:first-child {
        color: white;
        background-color: ${({ theme }) => theme.colors.red};
        margin-bottom: 0.5em;
      }

      &:last-child {
        color: black;
        border: 1px solid ${({ theme }) => theme.colors.darkBg};
      }
    }
  }
`;
