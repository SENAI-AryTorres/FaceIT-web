import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  tamanho: number;
}
export const Container = styled.button<ContainerProps>`
  background: #1fada6;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: ${(props) => props.tamanho}%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#1fada6')};
  }
`;
