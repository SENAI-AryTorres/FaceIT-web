import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobaStyle, { Container, Content } from './styles/global';
import AppProvider from './hooks';
import MenuLateral from './pages/Header/Menus';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Container>
        <MenuLateral />
        <Content>
          <Routes />
        </Content>
      </Container>
    </AppProvider>
    <GlobaStyle />
  </Router>
);

export default App;
