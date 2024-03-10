import styled from 'styled-components';
import { HoverStyle } from 'styles/Common/hover';
import { DarkShadowStyle } from 'styles/Common/shadow';

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & > span:first-child {
    ${HoverStyle('&')}
  }
`;

export const TooltipBtn = styled.div<{ $visible: boolean }>`
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.$visible ? '1' : '0')};
  position: absolute;
  top: -75%;
  right: 100%;
  width: 145px;
  text-align: center;
  border-radius: 6px;
  padding: 7px 0;
  margin-left: -60px;
  transition: opacity 0.3s;
  z-index: 30;
  background-color: #fff;
  ${DarkShadowStyle}

  & > button {
    ${HoverStyle('&')}
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.7em 1em;
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

  & > button > span {
    margin-right: 0.5em;
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
