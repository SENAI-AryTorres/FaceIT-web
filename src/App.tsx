import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobaStyle from './styles/global';
import AppProvider from './hooks';
import MenuLateral from './pages/Header/Menus';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <MenuLateral />
      <Routes />
    </AppProvider>
    <GlobaStyle />
  </Router>
);

export default App;
