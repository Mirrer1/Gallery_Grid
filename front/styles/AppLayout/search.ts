import styled from 'styled-components';

export const SearchWrapper = styled.div`
  display: table;

  & > input {
    background: none;
    border: none;
    outline: none;
    width: 120px;
    min-width: 0;
    padding: 0;
    z-index: 1;
    position: relative;
    line-height: 18px;
    margin: 5px 0;
    font-size: 14px;
    -webkit-appearance: none;
    transition: all 0.6s ease;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.font};

    &:not(:placeholder-shown),
    &:focus {
      width: 160px;
      padding: 0 4px;
      cursor: text;

      & + div > svg {
        stroke-dasharray: 150 212.908;
        stroke-dashoffset: 300;
      }
    }
  }

  & > div {
    position: relative;
    height: 28px;
    width: 100%;
    margin: -28px 0 0 0;
  }

  & > div > svg {
    display: block;
    position: absolute;
    height: 28px;
    width: 160px;
    right: 0;
    top: 0;
    fill: none;
    stroke: rgba(0, 0, 0, 0.25);
    stroke-width: 2.5px;
    stroke-dashoffset: 271.908;
    stroke-dasharray: 59 212.908;
    transition: all 0.6s ease;
  }

  & > svg {
    display: none;
  }
`;
