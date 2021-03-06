import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: UserObject;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface UserObject {
  name: string;
  tipo: string;
  nome: string;
  cpf: string;
  rg: string;
  idPessoa: string;
  email: string;
  senha: string;
  excluido: string;
  googleID: string;
  celular: string;
  telefone: string;
  role: string;
  cep: string;
  pais: string;
  uf: string;
  municipio: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
}

interface AuthContextData {
  user: UserObject;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('FaceIT:token');
    const user = localStorage.getItem('FaceIT:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('login', { email, senha, googleId: 0 });

    const user = response.data.pessoa;
    const token = response.data.token.value;
    localStorage.setItem('FaceIT:token', token);
    localStorage.setItem('FaceIT:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('FaceIT:token');
    localStorage.removeItem('FaceIT:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, token: data.token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
