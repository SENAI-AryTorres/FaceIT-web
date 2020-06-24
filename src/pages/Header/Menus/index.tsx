import React from 'react';
import { useAuth } from '../../../hooks/Auth';

const MenuLateral: React.FC = () => {
  const { user } = useAuth();
  return user ?<h1>Teste</h1>: null;
};

export default MenuLateral;
