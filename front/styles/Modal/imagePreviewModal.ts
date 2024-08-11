import styled from 'styled-components';
import { motion } from 'framer-motion';

import { HoverStyle } from 'styles/Common/hover';

export const UploadImagePreview = styled.div`
  & > div:first-child {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;

    & > span {
      position: absolute;
      top: 12px;
      right: 12px;
      color: white;
      font-size: 1.2rem;
      opacity: 85%;
      z-index: 100;
      margin-right: 0 !important;
      cursor: pointer;
      ${HoverStyle('&')};
    }
  }
`;

export const UploadImage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  z-index: 100;

  & > img {
    border-radius: 5px;
  }
`;
