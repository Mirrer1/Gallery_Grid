import styled from 'styled-components';
import { ReverseHoverStyle } from 'styles/Common/hover';

export const SettingWrapper = styled.section`
  position: relative;
  height: 96.2%;
  background: white;
  padding: 1em;
  margin: 1em;
  border-radius: 5px;
`;

export const SettingProfile = styled.div`
  width: 47%;
  position: absolute;
  top: 10%;
  left: 3%;

  & > img {
    width: 100%;
    height: 580px;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  & > div {
    width: 100%;
    position: absolute;
    top: 3%;
    left: 70%;

    & > h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5em;
    }

    & > p {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 1.1rem;
      font-weight: 500;
      opacity: 60%;
    }
  }

  & > label > span {
    position: absolute;
    left: 2%;
    bottom: 1%;
    font-size: 1.7rem;
    opacity: 40%;
    ${ReverseHoverStyle('&')};
  }

  & > input {
    display: none;
  }
`;
