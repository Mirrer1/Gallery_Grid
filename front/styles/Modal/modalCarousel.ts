import styled from 'styled-components';

import media from 'styles/media';

export const ModalCarouselBtn = styled.div<{ $alignleft: string }>`
  opacity: 0;
  position: absolute;
  bottom: 50%;
  ${props => (props.$alignleft === 'true' ? 'left: 2px;' : 'right: 0;')}
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

  ${media.tablet} {
    opacity: 100%;
    bottom: 45%;
    font-size: 0.8rem;
    padding: 0.4em;
  }
`;

export const ModalCarouselWrapper = styled.div`
  position: relative;
  width: 55%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 5px 0 0 5px;
  overflow: hidden;
  z-index: 30;

  & > div:first-child {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    transition: transform 400ms ease-in-out;
    height: 100%;

    @media (min-width: 992px) {
      &:hover ${ModalCarouselBtn} {
        opacity: 100%;
      }
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
    border-radius: 15px 0 0 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 50%;
    border-radius: 15px 15px 0 0;
  }
`;

export const ModalActiveIndicator = styled.div`
  ${({ theme }) => theme.flexSet()};
  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
`;

export const ModalActiveIndicatorItem = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 4px;
  background-color: ${props => (props.$active ? '#6BA2E6' : '#b5b5b5')};

  &:last-child {
    margin-right: 0;
  }
`;
