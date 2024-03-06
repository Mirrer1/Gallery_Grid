import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { HoverStyle } from 'styles/Common/hover';

export const PostModalWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  ${({ theme }) => theme.flexSet()};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 25;
`;

export const ModalOutsideArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const PostModalBtn = styled(CloseOutlined)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.1rem;
  opacity: 85%;
  cursor: pointer;
  ${HoverStyle('&')}
`;
