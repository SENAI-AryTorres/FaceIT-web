import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tamanho?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  tamanho = 100,
  ...rest
}) => (
  <Container type="button" {...rest} tamanho={tamanho}>
    {children}
  </Container>
);

export default Button;
