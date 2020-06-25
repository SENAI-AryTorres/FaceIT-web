import styled from 'styled-components';

export const Container = styled.div`
  /*height: 500px;*/
  display: flex;
  align-items: center;
  width: 220px;

  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;

  div {
    display: block;
    align-items: center;
    justify-content: center;
    width: 220px;
    background: #fff;

    text-decoration: none;

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
      width: 200px;
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
        width: 200px;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
  }

  & + div {
    border-top: 5px solid #ccc;

    ul {
      text-align: left;
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
`;
