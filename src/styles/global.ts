import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  /* place-content: center; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  max-width: 100%;
`;

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:0;
  }

  body {
    background: #304860;
    color: #FFF;
    -webkit-font-smoothing:antialiased;
  }

  Body, input, button {
    font-family:'Roboto Slab', serif;
    font-size: 16px;

  }

  h1,h2,h3,h4,h5,h6, strong {
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }

`;
