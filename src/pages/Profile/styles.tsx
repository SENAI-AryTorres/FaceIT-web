import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackground from '../../assets/sign-up-background.jpeg';

export const HeaderTitle = styled.div`
  width: 98%;
  height: 76px;
  background-color: #fff;
  color: #000;
  font-size: 30px;
  font-family: Roboto, sans-serif;
  padding: 15px;
  margin: 5px;
  display: flex;
  align-items: stretch;
  border-radius: 5px;
`;

export const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: stretch;
  background-color: #fff;
  padding: 15px;
  margin: 5px;
  width: 98%;
  border-radius: 5px;
  font-size: 30px;
  font-family: Roboto, sans-serif;
  color: #000;
`;

export const DivRight = styled.div`
  border: 1px solid #ccc;
  width: 250px;
  margin-left: 10px;
  width: 990px;
  padding: 10px;
  strong {
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
    min-height: 56px;
  }
  span {
    font-size: 15px;
  }
`;

export const DivLeft = styled.div`
  border: 1px solid #ccc;
  width: 250px;

  align-items: center;
  transition: transform 0.2s;
  text-align: center;
  img {
    border-radius: 50%;
    width: 100px;
    margin: 16px 16px;
  }
  div {
    text-align: center;
    width: 100%;
    margin: 0 10px;
    flex: 1;

    span {
      font-size: 16px;
      color: #1665d8;
      width: 90px;
      float: left;
      text-align: left;

      & + span {
        flex: 1;
        color: #a8a8b3;
        width: 140px;
        margin-right: 10px;
        text-align: right;
      }
    }
  }
`;

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 950px;
`;

const appearFromRight = keyframes`
  from{
    opacity:0;
    transform: translateX(50px);
  }
  to{
    opacity:1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 8px 0;
    width: 850px;
    text-align: center;
    max-width: 100%;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;

      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
    svg {
      max-width: 100px;
    }
  }

  > a {
    color: #1fada6;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#1fada6')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
