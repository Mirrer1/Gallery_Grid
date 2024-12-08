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
  z-index: 499;

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
  z-index: 499;
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

  ${media.tablet} {
    top: 6px;
    right: 6px;
    font-size: 1.1rem;
  }
`;

export const PostModalContentsWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 75%;
  height: 90%;
  z-index: 500;

  ${media.tablet} {
    width: 100%;
    height: 100%;
    padding-top: 4%;
  }

  ${media.mobile} {
    flex-direction: column;
    justify-content: start;
    overflow-y: auto;
    padding-top: 10%;
  }
`;
