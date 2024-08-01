import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { HoverStyle } from 'styles/Common/hover';

export const PostModalWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  ${({ theme }) => theme.flexSet()};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 50;

  ${media.mobile} {
    ${({ theme }) => theme.flexColumnSet()};
  }
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
  top: 12px;
  right: 12px;
  color: white;
  font-size: 1.2rem;
  opacity: 85%;
  cursor: pointer;
  ${HoverStyle('&')}

  ${media.mobile} {
    top: 10px;
    right: 10px;
    font-size: 1.1rem;
  }
`;

export const PostModalContentsWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  width: 55%;
  height: 70%;

  ${media.tablet} {
    width: 90%;
    height: 58%;
  }

  ${media.mobile} {
    flex-direction: column;
    height: 40%;
  }
`;
