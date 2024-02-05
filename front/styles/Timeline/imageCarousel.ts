import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { HoverStyle } from 'styles/Common/hover';

export const ImageCarouselWrapper = styled.div`
  position: relative;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 5px;
`;

export const BackgroundImageContainer = styled.div<{ $background: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$background});
  background-size: cover;
  background-position: center;
  filter: blur(4px);
  z-index: -1;
`;

export const CarouselOutsideArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

export const HideSwiperBtn = styled(CloseOutlined)`
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  z-index: 12;
  ${HoverStyle('&')}
`;
