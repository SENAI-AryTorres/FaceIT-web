import React from 'react';
import { useAuth } from '../../../hooks/Auth';
import { Container } from './styles';

const MenuLateral: React.FC = () => {
  const { user } = useAuth();
  return user ? (
    <Container>
      <div>
        <img src="https://avatars3.githubusercontent.com/u/271936?s=460&u=8f17648ac23b3b7ceda9d0aafe1f492d937e3648&v=4" />
        <div>
          <strong>Felipe Ayancan</strong>
          <p>Socio Diretor</p>
        </div>
      </div>
      <div>
        <ul>
          <li>Dashboard</li>
          <li>CV</li>
          <li>Vagas</li>
          <li>Minhas Candidaturas</li>
          <li>Meu Perifl</li>
          <li>Suporte</li>
        </ul>
      </div>
    </Container>
  ) : null;
};

export default MenuLateral;
