import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  tamanho: number;
  visivel: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;

  padding: 16px;
  ${(props) =>
    props.visivel === false &&
    css`
      display: none !important;
    `}



  ${(props) =>
    props.tamanho > 0 &&
    css`
      width: calc(${props.tamanho}% - 2%);
      float: left;
      margin-right: 4px;
    `}



  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;

  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #1fada6;
      border-color: #1fada6;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #1fada6;
    `}



  input {
     flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    width: ${(props) => props.tamanho}%;
    &::placeholder {
      color: #666360;
    }

  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #ffffff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
