import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 90vh;
  display: flex;
  align-items: stretch;

  background-color: #fff;
  padding: 15px;
  margin: 5px;

  border-radius: 5px;
  font-size: 30px;
  font-family: Roboto, sans-serif;
  color: #000;

  strong {
    font-size: 20px;
    font-weight: bold;
  }
  span {
    font-size: 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  form {
    margin: 8px 0;
    width: 70%;
    text-align: center;
    place-content: center;
    flex-direction: column;
    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 110px;
  align-self: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #ff9000;
    right: 0;
    bottom: 0;
    border: 0px;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
