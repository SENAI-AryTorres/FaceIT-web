import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
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

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 950px
 
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:white;
  padding: 15px;

  animation: ${appearFromRight} 1s;

  form {
    margin: 8px 0;
    width: 850px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color:black;
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
