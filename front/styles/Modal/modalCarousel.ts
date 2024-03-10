import styled from 'styled-components';

import media from 'styles/media';

export const ModalCarouselBtn = styled.div<{ $alignleft: string }>`
  opacity: 0;
  position: absolute;
  bottom: 50%;
  ${props => (props.$alignleft === 'true' ? 'left: 0;' : 'right: 0;')}
  ${props => (props.$alignleft === 'true' ? 'transform: translate(10%, -50%);' : 'transform: translate(-20%, -50%);')}  
  font-size: 0.85rem;
  padding: 0.5em;
  color: gray;
  background-color: white;
  border-radius: 50%;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  z-index: 30;

  ${media.mobile} {
    bottom: 45%;
    font-size: 0.8rem;
    padding: 0.4em;
    ${props => (props.$alignleft === 'true' ? 'left: 2px;' : 'right: 0;')}
  }
`;

export const ModalCarouselWrapper = styled.div`
  position: relative;
  width: 30%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px 0 0 5px;
  overflow: hidden;
  z-index: 30;

  & > div {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    transition: transform 400ms ease-in-out;
    height: 100%;

    &:hover ${ModalCarouselBtn} {
      opacity: 100%;
    }

    & > div {
      width: 100%;
      height: 100%;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  ${media.tablet} {
    width: 45%;
    height: 50%;
  }

  ${media.mobile} {
    width: 85%;
    height: 40%;
    border-radius: 5px 5px 0 0;
  }
`;
