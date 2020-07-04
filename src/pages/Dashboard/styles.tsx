import styled from 'styled-components';
import { shade } from 'polished';

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
  align-items: start;

`;

export const AnimationContainer = styled.div`

align-items: center;
justify-content: center;
margin-top:70px;
margin-left:10px;


padding:10px;
text-align:start;
top: 30%;



form {
 
  text-align: center;


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

export const Text = styled.div`
  font-size:15;
  font-weight:regular;
  color:#004080
`;

