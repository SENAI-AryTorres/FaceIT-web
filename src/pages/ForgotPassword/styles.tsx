import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/sign-in-background.jpeg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  width:auto;
  align-items: stretch;
  justify-content:center;
  padding-left:20px;
  padding-right:20px;
`;

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;

`;



export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(#1fadb0, white);
  padding-bottom:5px;
  margin:100px;

  form {
    margin: 80px 0;
    width: 350px;
    height:150px;
    text-align: center;
    padding:20px;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
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

export const Background = styled.div`
  background-size: cover;

`;
