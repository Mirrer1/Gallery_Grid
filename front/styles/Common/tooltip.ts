import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const Tooltip = styled(motion.div)<{ $visible: boolean }>`
  position: relative;
  display: ${props => (props.$visible ? 'inline-block' : 'none')};
  cursor: pointer;

  & > span:first-child {
    ${HoverStyle('&')}
  }
`;

export const TooltipBtn = styled.div`
  position: absolute;
  top: -22px;
  right: 18px;
  width: 145px;
  text-align: center;
  border-radius: 6px;
  padding: 7px 0;
  margin-left: -60px;
  z-index: 30;
  background-color: #fff;
  ${DarkShadowStyle}

  & > button {
    ${HoverStyle('&')}
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.7em 1em;

    & > span {
      margin-right: 0.5em;
    }

    .anticon-loading {
      margin-right: 0;
      width: 37.4px;
    }
  }

  & > button:first-child {
    margin-right: 0.3em;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px ${({ theme }) => theme.colors.primary} solid;
  }

  & > button:last-child {
    color: ${({ theme }) => theme.colors.red};
    border: 1px ${({ theme }) => theme.colors.red} solid;
  }
`;

export const TooltipOutsideArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 29;
`;
