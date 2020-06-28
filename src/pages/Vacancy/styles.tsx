import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/sign-in-background.jpeg';

export const Container = styled.div`
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
  min-width: 400px;
`;

export const AnimationContainer = styled.div`

align-items: center;
justify-content: center;
margin:150px;
background-color:black;
padding:12px;
text-align:center;
width: 70%;
top: 30%;



form {
align-self:center;

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

  
}
`;

export const Background = styled.div`
  background-size: cover;

`;


export const Text = styled.textarea`
 height:100px;
 max-height:100px;
 width:98%;
 max-width:100%;
 background: #232129;
 border-radius: 10px;
 color:white;
 font-size:16px;
 padding: 16px;
 padding-bottom:10px;

;`

