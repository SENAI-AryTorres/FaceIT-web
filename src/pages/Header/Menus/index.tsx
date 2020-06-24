import React from 'react';
import { useAuth } from '../../../hooks/Auth';
import {MenuHeight} from './styles'
const MenuLateral: React.FC = () => {
  const { user } = useAuth();
  return user ? <MenuHeight><h1>Teste</h1></MenuHeight>: null;
};

export default MenuLateral;
